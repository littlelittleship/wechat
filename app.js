const express = require('express');
const sha1 = require('sha1')
const auth = require('./wechat/auth.js')
const WechatApi = require('./wechat/wechat')
const {url} = require('./config')

const app = express()
const wechatApi = new WechatApi()
// 配置资源目录
app.set('views', './views')
// 设置模板引擎
app.set('view engine', 'ejs')
app.get('/search', async (req,res) => {
    // res.send('这是一个搜索页面')
    /**
     * 生成jssdk使用的签名
     *  1. 组合参与签名的四个参数: jsapi_ticket(临时票据), noncestr(随机字符串), timestamp(时间戳), url(当前服务器的地址)
     *  2. 将其按字典顺序排列, 并用 & 连接在一起
     *  3. 进行sha1加密, 最终生成signature
     * 
     */
    // 获取随机字符串
    const noncestr = Math.random().split('.')[1]
    // 获取票据
    const {ticket} = await wechatApi.fetchTicket()
    // 时间戳
    const timestamp = Date.now()

    const arr = [
        `noncestr=${noncestr}`,
        `jsapi_ticket=${ticket}`,
        `timestamp=${timestamp}`,
        `url=${url}/search`
    ]

    const str = arr.sort().join('&')
    const signature = sha1(str)
    res.render('search', {
        signature,
        noncestr,
        timestamp
    })

})

app.use(auth())
app.listen(3000, () => console.log('server is running at 127.0.0.1:3000'))