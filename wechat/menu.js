module.exports = {
    "button":[
        {	
            "type":"click",
            "name":"今日歌曲",
            "key":"todayMusicClick"
        },
        // {
        //     "name":"菜单",
        //     "sub_button":[
        //         {	
        //             "type":"view",
        //             "name":"搜索",
        //             "url":"http://www.baidu.com/"
        //         },
        //         {
        //             "type":"click",
        //             "name":"赞一下我们",
        //             "key":"enterPriceClick"
        //         }
        //     ]
        // },
        {
            "name": "扫码", 
            "sub_button": [
                {
                    "type": "scancode_waitmsg", 
                    "name": "扫码带提示", 
                    "key": "scan_1", 
                    "sub_button": [ ]
                }, 
                {
                    "type": "scancode_push", 
                    "name": "扫码推事件", 
                    "key": "scan_2", 
                    "sub_button": [ ]
                },
                {
                    "name": "发送位置", 
                    "type": "location_select", 
                    "key": "rselfmenu_2_0"
                },
            ]
        }, 
        {
            "name": "发图", 
            "sub_button": [
                {
                    "type": "pic_sysphoto", 
                    "name": "系统拍照发图", 
                    "key": "rselfmenu_1_0", 
                   "sub_button": []
                 }, 
                {
                    "type": "pic_photo_or_album", 
                    "name": "拍照或者相册发图", 
                    "key": "rselfmenu_1_1", 
                    "sub_button": []
                }, 
                {
                    "type": "pic_weixin", 
                    "name": "微信相册发图", 
                    "key": "rselfmenu_1_2", 
                    "sub_button": []
                }
            ]
        }, 
        // {
        //     "name": "发送位置", 
        //     "type": "location_select", 
        //     "key": "rselfmenu_2_0"
        // },
        // {
        //    "type": "media_id", 
        //    "name": "图片", 
        //    "media_id": "MEDIA_ID1"
        // }, 
        // {
        //    "type": "view_limited", 
        //    "name": "图文消息", 
        //    "media_id": "MEDIA_ID2"
        // }
    ]
}