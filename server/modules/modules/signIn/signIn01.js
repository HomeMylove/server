const { db } = require('../../../db/createDB')
const { createSignInImg } = require('./createSignInImg')
const { processData } = require('./processData')


function signIn(body, res) {
    const groupId = body['group_id'] // 群组的id
    const userId = body['sender']['user_id'] // 对方的id
    const nickname = body['sender']['card'] || body['sender']['nickname'] // 对方的昵称

    // 方便调用sql语句
    const user = {
            user_id: userId,
            group_id: groupId
        }
        // res.insertData()
        // res.selectData()
        // res.updateData()


    const sqlStr = 'SELECT * FROM qq_robot WHERE user_id=? AND group_id=?'
        // const sqlStr = 'DELETE FROM qq_robot'

    db.query(sqlStr, [user.user_id, user.group_id], (err, results) => {
        // 失败
        if (err) { return console.log(err); }

        // 没有数据
        // return
        if (results.length !== 1) {
            const sqlStr = 'INSERT INTO qq_robot SET ?'
            db.query(sqlStr, user, (err, results) => {
                // 失败
                if (err) { return console.log(err); }

                // 插入用户成功
                if (results.affectedRows == 1) {
                    const rawData = {
                        sign_in: 0,
                        exp: 0,
                        days: 0,
                    }

                    /**
                     * data 新数据
                     * flag 签到状态，true -- 已签到
                     *                    -- false 未签到
                     */
                    const { data, flag } = processData(rawData)

                    // 更新
                    const sqlStr = 'UPDATE qq_robot SET ? WHERE user_id=? AND group_id=?'
                    db.query(sqlStr, [data, user.user_id, user.group_id], (err, results) => {
                        // 失败
                        if (err) { return console.log('新增签到并写入失败'); }
                        // 成功
                        if (results.affectedRows == 1) {
                            // console.log('新增签到并写入成功，即将发送图片');
                            createSignInImg({
                                userId,
                                groupId,
                                nickname,
                                data,
                                flag
                            }).then(value => {
                                res.sendMsg({
                                    groupId,
                                    imgUrl: `signIn/${groupId}and${userId}.jpg`
                                })
                            })
                        }
                    })

                } else {
                    console.log('新增签到失败');
                }
            })
        }

        // 有数据
        else if (results.length == 1) {
            // 得到数据
            const result = results[0]
                // 原始数据
            const rawData = {
                sign_in: result['sign_in'],
                exp: result['exp'],
                days: result['days'],
            }

            // rawData['sign_in'] = 0

            const { data, flag } = processData(rawData)

            const sqlStr = 'UPDATE qq_robot SET ? WHERE user_id=? AND group_id=?'
            db.query(sqlStr, [data, user.user_id, user.group_id], (err, results) => {
                // 失败
                if (err) { return console.log('新增签到并写入失败'); }
                // 成功
                if (results.affectedRows == 1) {
                    // console.log('新增签到并写入成功，即将发送图片');
                    createSignInImg({
                        userId,
                        groupId,
                        nickname,
                        data,
                        flag
                    }).then(value => {
                        res.sendMsg({
                            groupId,
                            imgUrl: `signIn/${groupId}and${userId}.jpg`
                        })
                    })
                }
            })

        }
        // 其他情况
        else {
            console.log('签到时遇到其他错误');
        }

    })

}

module.exports.signIn = signIn