const axios = require('axios')

const common = require('../common')
    // 定义 发送的方法
const sendMsg = common.sendMsg


module.exports.autoChat = (body) => {
    let rawMsg = body['raw_message']
    rawMsg = encodeURI(rawMsg)

    axios.get(`http://api.qingyunke.com/api.php?key=free&appid=0&msg=${rawMsg}`).then(response => {
        let msg = response['data']['content']
        msg = msg.replace(/\{br\}/g, '\n')
        msg = encodeURI(msg)

        if (msgType === 'private') {
            sendMsg(msgType, userId, msg)
        } else {
            sendMsg(msgType, groupId, msg)
        }
    }).catch(error => {
        console.error(error);
    })
}