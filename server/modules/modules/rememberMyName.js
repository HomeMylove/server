const common = require('../common')
const sendMsg = common.sendMsg
const config = require('../../config')

const { db } = require('../../db/createDB')
    // console.log(db.query);
module.exports.rememberMyName = body => {
    const rawMsg = body['raw_message']
    const groupId = body['group_id']
    const userId = body['sender']['user_id']

    let name = rawMsg.replace('冰冰以后叫我', '').trim()
    if (name === '主人' && userId != config.SUPERUSER) {
        return sendMsg('group', groupId, '抱歉,我只有一个主人,你再这么说我可要生气了', '/images/angry.jpg')
    }

    const user = {
            user_id: userId,
            group_id: groupId,
            name,
        }
        // 看看有没有 name
    const sqlStr = 'SELECT * FROM qq_robot WHERE user_id=? AND group_id=?'
        // const sqlStr = 'delete from qq_robot'
    db.query(sqlStr, [user.user_id, user.group_id], (err, results) => {
        if (err) return console.log(err.message); // 失败
        // console.log(results);
        // 名称存在
        if (results.length > 0) {
            const sqlStr = 'UPDATE qq_robot SET name=?  WHERE user_id=? AND group_id=?'
            db.query(sqlStr, [user.name, user.user_id, user.group_id], (err, results) => {
                if (err) return console.log(err.message, '修改失败'); // 失败
                // 修改成功
                if (results.affectedRows === 1) {
                    if (name === '主人') {
                        return sendMsg('group', groupId, '好的主人,我...我记住啦', '/images/shy2.jpg')
                    }
                    if (name.length <= 3) {
                        name = [...name].join('~') + '~'
                    }
                    const msg = `${config.robotName}记住了，以后我就叫你${name}啦`
                    sendMsg('group', groupId, msg)
                }

            })
        } else {
            const sqlStr = 'INSERT INTO qq_robot SET ?'

            db.query(sqlStr, user, (err, results) => {
                if (err) return console.log(err.message, '数据添加失败'); // 失败

                if (results.affectedRows === 1) {
                    if (name === '主人') {
                        return sendMsg('group', groupId, '好的主人,我...我记住啦', '/images/shy2.jpg')
                    }
                    if (name.length <= 3) {
                        name = [...name].join('~') + '~'
                    }
                    const msg = `${config.robotName}记住了，以后我就叫你${name}啦`
                    sendMsg('group', groupId, msg)
                }

            })
        }
    })



}
module.exports.remindMyName = body => {
    const groupId = body['group_id']
    const userId = body['sender']['user_id']
    const card = body['sender']['card'] || body['sender']['nickname']

    const user = {
        user_id: userId,
        group_id: groupId
    }

    const sqlStr = 'SELECT * FROM qq_robot WHERE user_id=? AND group_id=?'
        // const sqlStr = 'delete from qq_robot'
    db.query(sqlStr, [user.user_id, user.group_id], (err, results) => {
        if (err) return console.log(err.message); // 失败
        // console.log(results[0]['name']);
        // console.log(results, '1111111111111111');
        if (results.length) {
            let name = results[0]['name']
            if (name == '主人') {
                return sendMsg('group', groupId, `${config.robotName}怎么会忘记呢,你是我的主人呀`, '/images/shy3.jpg')
            }

            if (name.length <= 3) {
                name = [...name].join('~') + '~' + '呀'
            } else if (name.length > 10) {
                name = name.slice(0, name.length - 3) + '...' + name.slice(name.length - 3) + '对吧' + `。你的名字可真长啊,${config.robotName}差点儿就要忘记了`
            }
            const msg = `${config.robotName}的记性可是很好的,你就是${name}`
            sendMsg('group', groupId, msg)
        } else {
            const msg = `嗯~~你就是${card}对吧`
            sendMsg('group', groupId, msg)
        }

    })
}