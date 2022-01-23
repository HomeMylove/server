const axios = require('axios')
const funs = require('../functions/function')


// 定义中间件
module.exports.autoSend = function(req, res, next) {
    let body = req.body

    let msgType = body['message_type'] // 私人还是群聊
        // let postType = body['post_type'] // 消息类型

    let userId = body['sender']['user_id']
    let nickname = body['sender']['nickname']
    let groupId = body['group_id']
    let rawMsg = body['raw_message']


    if (rawMsg === '骰子对决') {
        funs.diceGame(body)

    } else if (rawMsg === '来份壁纸') {
        funs.getWallpaper(body)

    } else if (rawMsg === '早') {
        let msg = `[CQ:at,qq=${userId}] 早安\n`
        msg = encodeURI(msg)
        sendMsg(msgType, groupId, msg)
    } else if (rawMsg.indexOf('[CQ:at,qq=3102734141]') !== -1) {
        rawMsg = encodeURI(rawMsg)
        console.log('我是中间件', rawMsg);

        axios.get(`http://api.qingyunke.com/api.php?key=free&appid=0&msg=${rawMsg}`).then(response => {
            let msg = response['data']['content']
            msg = msg.replace(/\{br\}/g, '\n')
            if (msgType === 'private') {
                sendMsg(msgType, userId, encodeURI(msg))
            } else {
                sendMsg(msgType, groupId, encodeURI(msg))
            }
        }).catch(error => {
            console.error(error);
        })
    }

    next()
}