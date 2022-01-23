const axios = require('axios')

const common = require('./common')
    // 导入配置
const config = require('../config')
    // console.log(common);
const sendMsg = common.sendMsg
    // console.log(config.robotName);


/**
 * 骰子对决,群成员与 robot 进行对决
 * @param {object} body post请求体
 */
module.exports.diceGame = function diceGame(body) {
    const userId = body['sender']['user_id'] // 对方的id
    const nickname = body['sender']['nickname'] // 对方的昵称
    const groupId = body['group_id'] // 群组的id
        // 产生随机点数
    const number1 = Math.ceil(Math.random() * 6)
    const number2 = Math.ceil(Math.random() * 6)

    // 判断结果
    let result = null
    if (number1 > number2) {
        result = `${config.robotName}获得了胜利 [CQ:face,id=13]`
    } else if (number1 < number2) {
        result = `${nickname}获得了胜利 [CQ:face,id=18]`
    } else {
        result = '平局 [CQ:face,id=98]'
    }
    // 生成 msg @ID result
    let msg = `[CQ:at,qq=${userId}]\n你掷出了${number2}\n智障机器人掷出了${number1}\n` + result
    msg = encodeURI(msg)
    sendMsg('group', groupId, msg)
}

/**
 * @function 获取一张壁纸
 * @param {object} body 
 */
module.exports.getWallpaper = function getWallpaper(body) {
    const groupId = body['group_id'] // 群组的id

    axios.get('https://api.ixiaowai.cn/api/api.php?return=json').then(response => {
        const imgurl = response['data']['imgurl']
        const msg = `[CQ:image,file=${imgurl}]` // 发送图片

        sendMsg('group', groupId, msg)
    }).catch(error => {
        console.error(error);
    })
}