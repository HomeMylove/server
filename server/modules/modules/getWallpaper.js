const axios = require('axios')

const common = require('../common')

const sendMsg = common.sendMsg


/**
 * @function 获取一张壁纸
 * @param {object} body 
 */
module.exports.getWallpaper = (body) => {
    const groupId = body['group_id'] // 群组的id

    axios.get('https://api.ixiaowai.cn/api/api.php?return=json').then(response => {
        const imgurl = response['data']['imgurl']
        const msg = `[CQ:image,file=${imgurl}]` // 发送图片

        sendMsg('group', groupId, msg)
    }).catch(error => {
        sendMsg('group', groupId, '好像出了点儿问题。。。')
        console.error(error);
    })
}