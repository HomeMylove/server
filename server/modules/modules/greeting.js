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
        msg = msg + randomReply(greetingText['morning']) + '\n' + '[CQ:image,file=chino/morning.jpg]'
    } else if (rawMsg === '下午好') {
        msg = msg + randomReply(greetingText['afternoon']) + '\n' + '[CQ:image,file=chino/afternoon.jpg]'
    } else if (rawMsg === '晚上好') {
        msg = msg + randomReply(greetingText['night']) + '\n' + '[CQ:image,file=chino/night.jpg]'
    }

    sendMsg('group', groupId, msg)

}