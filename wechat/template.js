/**
 * 用来加工最终回复消息的模板
 */
module.exports = options => {
    console.log('------op', options)
    let replyMsg = `<xml>
    <ToUserName><![CDATA[${options.toUserName}]]></ToUserName>
    <FromUserName><![CDATA[${options.fromUserName}]]></FromUserName>
    <CreateTime>${Date.now()}</CreateTime>
    <MsgType><![CDATA[${options.msgType}]]></MsgType>`

    if(options.msgType === 'text') {
        replyMsg += `<Content><![CDATA[${options.content}]]></Content>`
    } else if(options.msgType === 'image') {
        replyMsg += `<Image><MediaId><![CDATA[${options.mediaId}]]></MediaId></Image>`
    } else if(options.msgType === 'voice') {
        replyMsg += `<Voice><MediaId><![CDATA[${options.mediaId}]]></MediaId></Voice>`
    } else if(options.msgType === 'video') {
        replyMsg += `<Video><MediaId><![CDATA[${options.mediaId}]]></MediaId><Title><![CDATA[${options.title}]]></Title><Description><![CDATA[${options.description}]]></Description></Video>`
    } else if(options.msgType === 'music') {
        replyMsg += `<Music>
            <Title><![CDATA[${options.title}TITLE]]></Title>
            <Description><![CDATA[${options.description}]]></Description>
            <MusicUrl><![CDATA[${options.musicUrl}]]></MusicUrl>
            <HQMusicUrl><![CDATA[${options.hqMusicUrl}]]></HQMusicUrl>
            <ThumbMediaId><![CDATA[${options.mediaId}]]></ThumbMediaId>
        </Music>`
    } else if(options.msgType === 'news') {
        replyMsg += `<ArticleCount>${options.content.length}</ArticleCount>
            <Articles>`
        options.content.forEach(item => {
            replyMsg += `<item>
                <Title><![CDATA[${item.title}]]></Title>
                <Description><![CDATA[${item.description}]]></Description>
                <PicUrl><![CDATA[${item.picurl}]]></PicUrl>
                <Url><![CDATA[${item.url}]]></Url>
            </item>`
        })
        replyMsg += `</Articles>`
    }
    replyMsg += `</xml>`
    return replyMsg

}

