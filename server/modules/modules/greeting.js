const common = require('../common')
    // 导入配置
const config = require('../../config')
    // 定义 发送的方法
const sendMsg = common.sendMsg
const randomReply = common.randomReply

const { greetingText } = require('../../resources/txt/greetings')


module.exports.greeting = (body) => {
    const rawMsg = body['raw_message']
    const groupId = body['group_id']
    const userId = body['sender']['user_id']

    let msg = userId == config.SUPERUSER ? '主人~' : ''

    if (rawMsg === '早' || rawMsg === '早上好') {
        if (msg) {
            // msg = msg + randomReply(greetingText['morning']) + '\n' + `[CQ:image,file=${config.host}:${config.port}/images/morning3.jpg]`
            sendMsg('group', groupId, msg + randomReply(greetingText['morning']), '/images/morning3.jpg')
        } else {
            // msg = msg + randomReply(greetingText['morning']) + '\n' + `[CQ:image,file=${config.host}:${config.port}/images/morning2.jpg]`
            sendMsg('group', groupId, msg + randomReply(greetingText['morning']), '/images/morning2.jpg')
        }
        // sendMsg('group', groupId, msg)
    } else if (rawMsg === '下午好') {
        sendMsg('group', groupId, msg + randomReply(greetingText['afternoon']))
    } else if (rawMsg === '晚上好') {
        sendMsg('group', groupId, msg + randomReply(greetingText['night']))
    }

}