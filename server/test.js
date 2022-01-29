// // const axios = require('axios')

const { db } = require("./db/createDB")


// // axios.get('https://api.ixiaowai.cn/api/api.php?return=json').then(response => {
// //     console.log(response['data']['imgurl']);
// // }).catch(error => {
// //     console.error(error);
// // })

// // let str = '[CQ:atq=3494721776] 骰子对决 哈哈'

// // const reg = /\[CQ:at,(qq=[0-9]+)\]/

// // const result = str.match(reg)
// // console.log(result);

// // str = str.replace(reg, '').replace('骰子对决', '')
// // console.log(str, '##########');

// // const jsonFile = require('jsonfile')

// // new Promise((resove, reject) => {
// //     jsonFile.readFile('./text/greetings.json', (err, jsonData) => {
// //         if (err) return reject(err)
// //         resove(jsonData)
// //     })
// // }).then(jsonData => {

// // })

// // const str = '进阶冰冰以后叫我老公'
// // console.log(str.indexOf('冰冰以后叫我'));

// // let name = '漆黑之意'
// //     // console.log(name.length);
// // const arr = [...name]
// // console.log([...name].join('~') + '~');

// // function test({ msg, id, name, age }) {
// //     console.log(msg);
// //     console.log(id);
// //     console.log(name);
// //     console.log(age);
// // }
// // const msg = 'hello'
// // const id = 123


// // test({
// //     msg,
// //     id,
// //     name: 'mike'
// // })

// // module.exports.sendMsg = ({ groupId, userId, msg, imgUrl }) => {

// //     msg = msg || ''
// //     if (imgUrl) msg = msg + `[CQ:image,file=${imgUrl}]`

// //     msg = encodeURI(msg)

// //     let path = null

// //     if (userId) {

// //         path = `http://127.0.0.1:5700/send_private_msg?user_id=${userId}&message=${msg}&auto_escape=false`

// //     } else if (groupId) {

// //         path = `http://127.0.0.1:5700/send_group_msg?group_id=${groupId}&message=${msg}&auto_escape=false`

// //     }
// //     axios.get(path).then(
// //         console.log('==============发送成功:=============\n', msg)
// //     ).catch(error => {
// //         console.error('==============发送失败:===============\n', error);
// //     })
// // }


// // function hello(obj) {
// //     const { a, b, c } = obj
// //     console.log('a', a);
// //     console.log('b', b);
// //     console.log('c', c);
// // }
// // const a = 1
// // const b = 2
// // const c = 3

// // hello({
// //     a,
// //     b,
// //     // c
// // })

// // const reply = {
// //     ['早啊']: [
// //         '你也早',
// //         '你他娘的早上好啊'
// //     ],
// //     ['晚上好']: [
// //         '晚上好啊'
// //     ]
// // }

// // console.log(reply['早啊'][0]);


// const sharp = require('sharp')

// // sharp('/images/red.jpg')
// //     .rotate()
// //     .resize(200)
// //     .toBuffer()
// //     .then(data=>{})
// //     .catch(err=>{})

// //https://www.jianshu.com/p/ed14d381dd65

// async function getMetadata(path) {
//     try {
//         const metadata = await sharp(path).metadata()
//         console.log(metadata);
//     } catch (error) {
//         console.log(`thers is an error ${error}`);
//     }
// }

// // getMetadata('./img/img1.png')

// async function resizeImage() {
//     try {
//         await sharp('./img/img1.png')
//             .resize({
//                 width: 150,
//                 height: 97
//             })
//             .toFormat('jpeg', { mozjpeg: true })
//             .toFile('./img/small-img2.png')
//     } catch (error) {
//         console.log(`ther is an error ${error}`);

//     }
// }

// // resizeImage()

// async function compositeImage() {
//     try {
//         await sharp('./img/img1.png')
//             .composite([{
//                 input: './img/img2.png',
//                 top: 50,
//                 left: 50
//             }, ])
//             .toFile('./img/fish-in-water.png')
//     } catch (error) {
//         console.log('there is an err', error);
//     }
// }

// // compositeImage()
// async function addTextOnImage() {
//     try {
//         const width = 750
//         const height = 483
//         const text = 'hello world'

//         const svgImage = `
//         <svg width="${width}" height="${height}">
//         <style>
//         .title{
//             fill:#001;
//             font-size:70px;
//             font-weight:bold;
//         }
//         </style>
//         <text x="50%" y="50%" text-anchor="middle" class="title">${text}</text>
//         </svg>
//         `

//         const svgBuffer = Buffer.from(svgImage)
//             // const image = await sharp(svgBuffer).toFile('./img/svg-image.png')
//         const image = await sharp('./img/fish-in-water.png')
//             .composite([{
//                 input: svgBuffer,
//                 top: 0,
//                 left: 0
//             }]).toFile('./img/have-text.png')
//     } catch (error) { console.log(error); }
// }
// // addTextOnImage()


// const schedule = require('node-schedule');
// const { db } = require('./db/createDB')


// const resetSignIn = () => {
//     //每分钟的第30秒定时执行一次:
//     `
//     * * * * * *
//     ┬ ┬ ┬ ┬ ┬ ┬
//     │ │ │ │ │ |
//     │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
//     │ │ │ │ └───── month (1 - 12)
//     │ │ │ └────────── day of month (1 - 31)
//     │ │ └─────────────── hour (0 - 23)
//     │ └──────────────────── minute (0 - 59)
//     └───────────────────────── second (0 - 59, OPTIONAL)
//     `
//     schedule.scheduleJob('0 * * * * *', () => {

//         const sqlStr = 'UPDATE qq_robot SET sign_in=0'

//         db.query(sqlStr, (err, results) => {})

//         console.log('签到情况重置' + new Date());
//     });
// }

// // resetSignIn()

// const fs = require('fs')
// const path = require('path')

// const files = fs.readdirSync(path.join(__dirname, './img'))

// // console.log(files);
// // console.log('hello');

// // const { db } = require('./db/createDB')

// // console.log(db);
// const sqlStr1 = 'SELECT * FROM qq_robot WHERE uid=?'


// // db.query(sqlStr1, [28], (err, results) => {
// //     if (err) return console.error(err);
// //     console.log(results);
// // }).then(
// //     db.query(sqlStr2, 27, (err, results) => {
// //         if (err) return console.error(err);
// //         console.log(results);
// //     })
// // )

// function selectData(id) {
//     return new Promise((resove, reject) => {
//         db.query(sqlStr1, id, (err, results) => {
//             if (err) {
//                 reject(err)
//             }
//             resove(results[0])
//         })
//     })
// }

// // selectData(27).then(results => {
// //     // console.log(results['uid']);
// //     console.log(results['uid']);
// //     // return selectData(28)
// //     return 12
// // }).then(results => {
// //     console.log(results);
// //     // console.log(results['uid']);
// // })

// // db.query(selectData(28).then(results => console.log(results)))

// const sqlStr2 = 'UPDATE qq_robot SET ? WHERE uid=?'

// function updateData(obj, uid) {
//     return new Promise((resove, reject) => {
//         db.query(sqlStr2, [obj, uid], (err, results) => {
//             if (err) reject(err)

//             resove('ok')

//         })
//     })
// }

// // updateData({
// //     data_json: JSON.stringify({
// //         name: 'mike'
// //     })
// // }, 28)

// selectData(27)

const userInfo = {
    exp: 18, // 经验
    level: 10, // 等级
    coins: 100, // 硬币
    checkInStatus: false, // 签到状态
    checkInDays: 10, // 连续天数
    notCheckInDays: 0, // 未签到天数
    checkInRecords: 10, // 上次连续记录
    goods: { g1: 0, g2: 0, g3: 0, g4: 0 }, // 我的商品
    double: true, // 是否开启双倍经验
    master: false // 是否是主人
}

// updateData({
//     data_json: JSON.stringify(userInfo)
// }, 27)

// selectData(27).then(results => {
//     // console.log(typeof results);
//     let data = results['data_json']
//     console.log(JSON.parse(data));
// })

function updateTest(obj) {
    obj['exp'] = 19
}

// updateTest(userInfo)

const demo = {...userInfo, name: 'mike', level: 100 }

// console.log(demo);

// const sqlStr3 = 'SELECT * FROM qq_robot WHERE data_json->"$.exp"=1'
// const sqlStr3 = 'SELECT json_extract(data_json,"$.goods") FROM qq_robot WHERE data_json->"$.exp"=1'
// const sqlStr3 = 'UPDATE qq_robot SET'
// const sqlStr3 = "UPDATE qq_robot SET data_json = JSON_SET(data_json, '$.exp', 678, '$.level', 1123)"
const sqlStr10 = 'delete from qq_robot'

const sqlStr4 = 'SELECT data_json FROM qq_robot'
db.query(sqlStr10, [], (err, results) => {
    if (err) console.error(err);
    console.log(results);
})




// `

// mysql> SELECT * FROM db;
//  +----+------------------------------+-----------+
//  | id | category                     | tags      |
//  +----+------------------------------+-----------+
//  |  1 | {"id": 1, "name": "lnmp.cn"} | [1, 2, 3] |
//  +----+------------------------------+-----------+

// `