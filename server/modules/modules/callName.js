const common = require('../common')
    // 导入配置
const config = require('../../config')
    // 定义 发送的方法
const sendMsg = common.sendMsg



module.exports.callName = body => {
    // const rawMsg = body['raw_message']
    const groupId = body['group_id']
    const userId = body['sender']['user_id']

    if (userId == config.SUPERUSER) {
        sendMsg('group', groupId, '怎么了?主...主人', '/images/shy.jpg')
    } else {
        sendMsg('group', groupId, '我们很熟吗??', '/images/aggressive.jpg')
    }

}