const funs = require('../modules/index')
const config = require('../config')


module.exports.groupHandler = (req, res, next) => {
    let body = req['body']
        // 群消息则进入
    if (body['message_type'] === 'group') {

        let rawMsg = body['raw_message']

        // 骰子对决功能
        if (rawMsg.indexOf('骰子对决') !== -1) {
            funs.diceGame(body)

            // 随机壁纸功能
        } else if (['随机壁纸', '来份壁纸', '来张壁纸'].indexOf(rawMsg) !== -1) {
            funs.getWallpaper(body)

            // 问候
        } else if (['早', '早上好', '下午好', '晚上好'].indexOf(rawMsg) !== -1) {
            funs.greeting(body)

            // 呼唤
        } else if (rawMsg === config.robotName) {
            funs.callName(body)

        } else if (rawMsg.indexOf('冰冰以后叫我') === 0) {
            funs.rememberMyName(body)
        } else if (rawMsg === '冰冰我是谁') {
            funs.remindMyName(body)
        }
    }

    next()
}