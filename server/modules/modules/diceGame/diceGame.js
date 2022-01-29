// 导入配置
const config = require('../../../config')


/**
 * 骰子对决,群成员与 robot 进行对决
 * @param {object} body post请求体
 */
module.exports.diceGame = (body, res) => {

    const __help =
        `你可以对${config.robotName}说:\n  掷骰子\n  掷骰子@××\n  @×× 掷骰子`

    // 判断 关键词 出现的次数
    const rawMsg = body['raw_message']
    console.log(rawMsg);

    const groupId = body['group_id'] // 群组的id
    const userId = body['sender']['user_id'] // 对方的id
    const nickname = body['sender']['card'] || body['sender']['nickname'] // 对方的昵称
    const selfId = body['self_id'] // 我自己

    const reg = /\[CQ:at,qq=([0-9]+)\]/

    // 是否有多的词
    const str = rawMsg.replace(reg, '').replace('掷骰子', '').trim()

    // 是否有@
    const result = rawMsg.match(reg)
    let player

    if (result !== null) player = result[1]

    // 有多的词
    if (str) {
        if (str == '帮助') { return res.sendMsg({ groupId, msg: `[CQ:at,qq=${userId}]\n` + __help }) }
        let msg = `[CQ:at,qq=${userId}]\n格式不对哦!\n` + __help
        res.sendMsg({
            groupId,
            msg
        })

        // 格式正确
    } else if (rawMsg === '掷骰子' || player == selfId) {
        // 产生随机点数
        let number1 = Math.ceil(Math.random() * 6)
        let number2 = Math.ceil(Math.random() * 6)

        if (userId == config.SUPERUSER) {
            let msg = `[CQ:at,qq=${userId}]\n主人掷出了${666}\n${config.robotName}掷出了${number1}\n主人获得了胜利 [CQ:face,id=21]`
            return res.sendMsg({ groupId, msg })
        }

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

        res.sendMsg({ groupId, msg })

    } else {
        res.getGroupMemberInfo(groupId, parseInt(player)).then(
            response => {
                const nickname2 = response['card'] || response['nickname']
                    // 产生随机点数
                const number1 = Math.ceil(Math.random() * 6)
                const number2 = Math.ceil(Math.random() * 6)

                if (player == config.SUPERUSER) {
                    let msg = `[CQ:at,qq=${userId}]\n你掷出了${number1}\n我的主人掷出了666\n主人获得了胜利 [CQ:face,id=99]`
                    return res.sendMsg({ groupId, msg })
                }

                if (userId == config.SUPERUSER) {
                    let msg = `[CQ:at,qq=${userId}]\n主人你掷出了${666}\n[CQ:at,qq=${player}]你掷出了${number1}\n主人获得了胜利 [CQ:face,id=99]`
                    return res.sendMsg({ groupId, msg })
                }

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

                res.sendMsg({ groupId, msg })
            }
        )

    }

}