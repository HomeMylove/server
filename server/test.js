const axios = require('axios')

axios.get('https://api.ixiaowai.cn/api/api.php?return=json').then(response => {
    console.log(response['data']['imgurl']);
}).catch(error => {
    console.error(error);
})