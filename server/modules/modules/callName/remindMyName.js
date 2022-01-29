// 导入配置
const config = require('../../../config')
    // 定义 发送的方法


module.exports.remindMyName = (body, res) => {
    const groupId = body['group_id']
    const userId = body['sender']['user_id']
    const card = body['sender']['card'] || body['sender']['nickname']

    const user = {
        user_id: userId,
        group_id: groupId
    }

    res.selectData(user).then(results => {
        if (results.length) {
            let name = results[0]['name']
            if (name == '主人') {
                return res.sendMsg({
                    groupId,
                    msg: `${config.robotName}怎么会忘记呢,你是我的主人呀`
                })
            }
            if (name.length <= 3) {
                name = [...name].join('~') + '~' + '呀'
            }
            const msg = `${config.robotName}的记性可是很好的,你就是${name}吧`
            res.sendMsg({
                groupId,
                msg
            })
        } else {
            const msg = `嗯~~你就是${card}对吧`
            res.sendMsg({ groupId, msg })
        }
    })
}