const express = require('express')
    // 创建app
const app = express()
    // 解决跨域问题(如果有的话)
const cors = require('cors')
app.use(cors())
    // 提取 post 请求的 body 数据
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// 引入中间件
const { groupHandler, privateHandler } = require('./middlewares/middleware')

app.use(groupHandler)
app.use(privateHandler)
app.use('/images', express.static("./images"))

app.post('/', (req, res) => {
    console.log('这是在最后一部打印的================');
    let body = req.body

    let msgType = body['message_type'] // 私人还是群聊
    let postType = body['post_type'] // 消息类型
    let userId = body['sender']['user_id']
    let rawMsg = body['raw_message']

    console.log(body);
    console.log(msgType);
    console.log(postType);
    console.log(userId);
    console.log(rawMsg);
    console.log('这是在最后一步打印的**************');


    res.send('ok')

})


// 监听5701端口
app.listen(5701, () => {
    console.log('express server is running at 127.0.0.1');
})