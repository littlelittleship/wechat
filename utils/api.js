/**
 * 用于存放所有的url
 */

const prefix = `https://api.weixin.qq.com/cgi-bin/`

module.exports = {
    accessToken: `${prefix}token?grant_type=client_credential`,
    ticket: `${prefix}ticket/getticket?type=jsapi&`,
    menu: {
        create: `${prefix}menu/create?`,
        destory: `${prefix}menu/delete?`
    }
}