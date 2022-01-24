const common = require('../common')
    // 导入配置
const config = require('../../config')
    // 定义 发送的方法
const sendMsg = common.sendMsg
const getGroupMemberInfo = common.getGroupMemberInfo


/**
 * 骰子对决,群成员与 robot 进行对决
 * @param {object} body post请求体
 */
module.exports.diceGame = (body) => {
    // 判断 关键词 出现的次数
    const rawMsg = body['raw_message']

    const groupId = body['group_id'] // 群组的id
    const userId = body['sender']['user_id'] // 对方的id
    const nickname = body['sender']['card'] || body['sender']['nickname'] // 对方的昵称
    const selfId = body['self_id'] // 我自己

    const reg = /\[CQ:at,qq=([0-9]+)\]/

    const str = rawMsg.replace(reg, '').replace('骰子对决', '').trim()
    console.log(str, '^^^^^^^^^^^^^^^^^^^^^^^^^^', str.length);

    const result = rawMsg.match(reg)
    let player

    if (result !== null) player = result[1]

    if (str) {
        let msg = `[CQ:at,qq=${userId}]\n格式不对哦!`
        sendMsg('group', groupId, msg)
    } else if (rawMsg === '骰子对决' || player == selfId) {
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
        let msg = `[CQ:at,qq=${userId}]\n你掷出了${number2}\n${config.robotName}掷出了${number1}\n` + result

        sendMsg('group', groupId, msg)
    } else {
        getGroupMemberInfo(groupId, parseInt(player)).then(
            response => {
                const nickname2 = response['card'] || response['nickname']
                    // 产生随机点数
                const number1 = Math.ceil(Math.random() * 6)
                const number2 = Math.ceil(Math.random() * 6)

                // 判断结果
                let result = null
                if (number1 > number2) {
                    result = `${nickname}获得了胜利`
                } else if (number1 < number2) {
                    result = `${nickname2}获得了胜利`
                } else {
                    result = '平局'
                }
                // 生成 msg @ID result
                let msg = `[CQ:at,qq=${userId}] 你掷出了${number1}\n[CQ:at,qq=${player}]你掷出了${number2}\n` + result

                sendMsg('group', groupId, msg)
            }
        )

    }

}