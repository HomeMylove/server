const axios = require('axios')

/**
 * @function 获取一张壁纸
 * @param {object} body 
 * @param {object} res 使用res上的方法
 */
module.exports.getWallpaper = (body, res) => {
    const groupId = body['group_id'] // 群组的id

    axios.get('https://api.ixiaowai.cn/api/api.php?return=json').then(response => {
        const imgUrl = response['data']['imgurl']

        res.sendMsg({
            groupId,
            imgUrl
        })
    }).catch(error => {
        sendMsg('group', groupId, '好像出了点儿问题。。。')
        console.error(error);
    })
}