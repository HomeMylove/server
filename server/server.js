const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
    // 引入中间件
const handler = require('./handler/handler')
app.use(handler.autoSend)


app.post('/', (req, res) => {
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


    res.send('ok')




})

app.listen(5701, () => {
    console.log('express server is running at 127.0.0.1');
})