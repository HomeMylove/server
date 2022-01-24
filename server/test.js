// const axios = require('axios')

// axios.get('https://api.ixiaowai.cn/api/api.php?return=json').then(response => {
//     console.log(response['data']['imgurl']);
// }).catch(error => {
//     console.error(error);
// })

// let str = '[CQ:atq=3494721776] 骰子对决 哈哈'

// const reg = /\[CQ:at,(qq=[0-9]+)\]/

// const result = str.match(reg)
// console.log(result);

// str = str.replace(reg, '').replace('骰子对决', '')
// console.log(str, '##########');

// const jsonFile = require('jsonfile')

// new Promise((resove, reject) => {
//     jsonFile.readFile('./text/greetings.json', (err, jsonData) => {
//         if (err) return reject(err)
//         resove(jsonData)
//     })
// }).then(jsonData => {

// })

// const str = '进阶冰冰以后叫我老公'
// console.log(str.indexOf('冰冰以后叫我'));

let name = '漆黑之意'
    // console.log(name.length);
const arr = [...name]
console.log([...name].join('~') + '~');