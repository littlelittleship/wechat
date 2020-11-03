/***
 * 处理用户发送的消息类型和内容, 决定返回不同的内容给用户
 */

 module.exports = message => {
     console.log('---msg', message)
    let options = {
        toUserName: message.FromUserName,
        fromUserName: message.ToUserName,
        createTime: Date.now(),
        msgType: 'text'
    }

    let content = '你说什么, 我听不懂'
    if(message.MsgType === 'text') {
        if(message.Content === '1') {
            content = '大吉大利, 今晚吃鸡'
        } else if(message.Content === '2') {
            content = '落地成盒'
        } else if(message.Content.match('呵')) {
            content = '呵你的头~~'
        }
    } else if(message.MsgType === 'image') {
        options.msgType = 'image'
        options.mediaId = message.MediaId
    } else if(message.MsgType === 'voice') {
        options.msgType = 'voice'
        options.mediaId = message.MediaId
    } else if(message.MsgType === 'video') {
        options.msgType = 'video'
        options.mediaId = message.MediaId
        options.title = message.Title
        options.description = message.Description
    } else if(message.MsgType === 'shortvideo') {
        options.msgType = 'shortvideo'
        options.mediaId = message.MediaId
        options.msgId = message.MsgId
        options.mediaId = message.ThumbMediaId
    } else if(message.MsgType === 'location') {
        // message是用户发送消息里面的信息, 需要根据这个信息来判断返回信息, 
        content = `经度: ${message.Location_X}, 纬度: ${message.Location_Y}, 缩放大小: ${message.Scale}, 地理位置信息: ${message.Label}`
    } else if(message.MsgType === 'event'){
        if(message.event === 'subscribe') {
            content  = '感谢您的关注~~~'
            if(message.EventKey) {
                content = '用户通过扫描带参数的二维码关注的'
            }
        } else if(message.event === 'unsubscribe') {
            content = '无情取关!!!'
        } else if(message.event ==='SCAN') {
            content = '用户已经关注,再次扫码关注'
        } else if(message.event === 'LOCATION') {
            content = `经度: ${message.Longitude}, 纬度: ${message.Latitude}, 地理位置信息: ${message.Precision}`
        } else if(message.event === 'CLICK') {
            content = `点击了事件:${message.EventKey}`
        }
    }

    options.content = content
    console.log('optionsoptions', options)
    return options
 }