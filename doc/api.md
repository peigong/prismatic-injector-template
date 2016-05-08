# 模板数据服务API #

## 参数存疑 ##

- **website：**原代码由针头脚本组装提供。

**需要确定由哪个系统提供，以及参数传递机制：**

- **firstAccess：**
- **csession：**
- **sresptime：**
- **dayfirstflag：**
- **firstflag：**

## API通用规范 ##

### 基础规范 ###

- **HTTP方法：**GET

- **交互协议：**JSONP

### 通用参数 ###

- **callback：**JSONP的回调函数名。
- **csession：**会话标识。
- **templateId：**模板标识。
- **reqparam：**请求参数。使用JSON.stringify串行化的JSON对象。

### 通用响应 ###

	/**/
	typeof angular.callbacks._0 === 'function' && angular.callbacks._0({
	    "respparam": []
	});

- **respparam：**JSON格式的响应数据。

## uidisplaycdr 接口 ##

用于展示计数？

### reqparam 请求参数 ###

	{
	    "displayResult": "0",
	    "website": "",
	    "displayType": "1",
	    "pageId": "ibuoy",
	    "templateId": "fullscreenbar",
	    "firstAccess": "0",
	    "iseComp": "0",
	    "epageId": "",
	    "taskId": ""
	}
	
- **displayResult：**
- **website：**当前的宿主网站。
- **displayType：**
- **pageId：**当前展示页面标识。
- **templateId：**模板标识。
- **firstAccess：**是否是首次访问。
- **iseComp：**
- **epageId：**
- **taskId：**

### respparam 响应 ###

空对象。

## uitracingcdr 接口 ##

跟踪？

### reqparam 请求参数 ###

	{
	    "pageId": "ibuoy",
	    "componentId": "ibuoy_buoy_btn",
	    "iseComp": "1",
	    "website": "",
	    "templateId": "fullscreenbar",
	    "firstAccess": "0",
	    "epageId": "",
	    "taskId": ""
	}
	
- **pageId：**当前展示页面标识。
- **componentId：**触发跟踪的组件标识。
- **iseComp：**
- **website：**当前的宿主网站。
- **templateId：**模板标识。
- **firstAccess：**是否是首次访问。
- **epageId：**
- **taskId：**

### respparam 响应 ###

空对象。

## uinotiftracingcdr 接口 ##

跟踪？

### reqparam 请求参数 ###

	{
	    "pageId": "summarypage",
	    "componentId": "c60_fbar_p_package",
	    "iseComp": "0",
	    "website": "",
	    "templateId": "fullscreenbar",
	    "firstAccess": "0",
	    "epageId": "",
	    "taskId": "8",
	    "message": "",
	    "sresptime": "",
	    "functionid": ""
	}

- **pageId：**当前展示页面标识。
- **componentId：**触发跟踪的组件标识。
- **iseComp：**
- **website：**当前的宿主网站。
- **templateId：**模板标识。
- **firstAccess：**是否是首次访问。
- **epageId：**
- **taskId：**
- **message：**
- **sresptime：**
- **functionid：**

### respparam 响应 ###

空对象。

## passivetrafficquery 接口 ##

passive流量查询。

### reqparam 请求参数 ###

	{
	    "displayResult": "0",
	    "website": "",
	    "displayType": "1",
	    "pageId": "ibuoy",
	    "templateId": "fullscreenbar",
	    "firstAccess": "0"
	}
	
- **displayResult：**
- **website：**当前的宿主网站。
- **displayType：**
- **pageId：**当前展示页面标识。
- **templateId：**模板标识。
- **firstAccess：**是否是首次访问。

### respparam 响应 ###

	{
        "trafficusage": {
            "unit": "KB",
            "total": 4861952,
            "used": 1156300.8,
            "dateleft": 617656.32,
            "traffics": [{
                "unit": "1",
                "total": 4861952,
                "used": 1156300.8,
                "dateleft": 617656.32,
                "overflow": 0,
                "category": "-200",
                "categoryType": "2",
                "categoryname": "全部",
                "ballcolor": ""
            }],
            "traffictime": "03/26 11:20",
            "usedways": "您还可以看视频603分钟,浏览网页6177个,听歌121首."
        }
    }

- **total：**总流量。
- **used：**已用流量。
- **dateleft：**日均可用流量。
- **overflow：**超出流量。
- **traffictime：**流量查询时间。
- **trafficusage.traffics[].ballcolor：**？

## activetrafficquery 接口 ##

active流量查询。

### reqparam 请求参数 ###

无。

### respparam 响应 ###

	{
        "trafficusage": {
            "unit": "KB",
            "total": 4861952,
            "used": 1156300.8,
            "dateleft": 617656.32,
            "traffics": [{
                "unit": "1",
                "total": 4861952,
                "used": 1156300.8,
                "dateleft": 617656.32,
                "overflow": 0,
                "category": "-200",
                "categoryType": "2",
                "categoryname": "全部",
                "ballcolor": ""
            }],
            "traffictime": "03/26 11:20",
            "usedways": "您还可以看视频603分钟,浏览网页6177个,听歌121首."
        }
    }

- **trafficusage.traffictime：**流量查询时间。
- **trafficusage.traffics[].ballcolor：**？

## trafficquerydetails 接口 ##

查询。

### reqparam 请求参数 ###

无。

### respparam 响应 ###

	{
        "trafficusage": {
            "avgremain": {
                "unit": "KB",
                "value": 617058.9866666667
            },
            "trafficchart": [],
            "details": [{
                "category": "全部",
                "item": [{
                    "total": 1491135,
                    "unit": "KB",
                    "color": "",
                    "categoryType": "2",
                    "packagename": "国内通用流量结转",
                    "used": 1069466
                },
                {
                    "total": 102400,
                    "unit": "KB",
                    "color": "",
                    "categoryType": "2",
                    "packagename": "本地闲时流量结转",
                    "used": 59929
                },
                {
                    "total": 20480,
                    "unit": "KB",
                    "color": "",
                    "categoryType": "2",
                    "packagename": "动感地带11元网聊套餐",
                    "used": 0
                },
                {
                    "total": 102400,
                    "unit": "KB",
                    "color": "",
                    "categoryType": "2",
                    "packagename": "动感地带11元网聊套餐",
                    "used": 0
                },
                {
                    "total": 2097152,
                    "unit": "KB",
                    "color": "",
                    "categoryType": "2",
                    "packagename": "新70元数据流量可选包",
                    "used": 0
                },
                {
                    "total": 1048576,
                    "unit": "KB",
                    "color": "",
                    "categoryType": "2",
                    "packagename": "1GB免费夜间流量包",
                    "used": 30400
                }]
            }],
            "avgused": {
                "unit": "KB",
                "value": 44611.347692307696
            },
            "traffictime": "03/26 12:49",
            "dateleft": "",
            "usedways": "您还可以看视频603分钟,浏览网页6171个,听歌121首."
        }
    }

## notifications 接口 ##

### reqparam 请求参数 ###

	{
	    "sresptime": "20160326112132"
	}
	
- **sresptime：**响应时间？

### respparam 响应 ###

空对象。

## packagerecommandations 接口 ##

推荐套餐。

### reqparam 请求参数 ###

无。

### respparam 响应 ###

	{
        "recommandations": [{
            "inactivecategoryimage": "",
            "categoryid": "3",
            "oid": "2",
            "categoryname": "可选包",
            "activecategoryimage": "",
            "list": [{
                "id": "-89167339A74",
                "iscombo": "0",
                "price": "30 元/月",
                "desc": "含500M国内（不含港澳台）移动数据流量，超过部分0.29元/MB，同时提供60元1GB的流量保障服务，<font style=\"color:red\">无套餐用户订购后立即生效，流量和费用按日折算，变更套餐下月生效。<\/font>",
                "oid": "111002003856",
                "name": "新30元数据流量可选包",
                "comboProperies": [{
                    "value": "500MB",
                    "key": "2"
                }],
                "isMonthPack": "0",
                "effecttype": "4"
            }]
        }],
        "taskId": "8",
        "desc": "推荐套餐"
    }

## packagestore 接口 ##

套餐商店。

### reqparam 请求参数 ###

	{
	    "sresptime": "20160326112132"
	}
	
- **sresptime：**响应时间？

### respparam 响应 ###

	{
        "packages": [{
            "inactivecategoryimage": "",
            "categoryid": "1",
            "oid": "1",
            "categoryname": "和4G",
            "activecategoryimage": "",
            "list": [{
                "id": "-1267442447A61",
                "iscombo": "0",
                "price": "58 元/月",
                "desc": "含国内流量500MB，国内主叫100分钟，国内接听免费。套餐外语音0.19元/分钟，套外流量不足100MB按0.29元/MB计费，100MB-500MB不再收费，相当于每500MB最多收29元。<font style=\"color:red\">下月生效（无月套餐用户立即生效），现有主套餐将被替换成和4G套餐。<\/font>",
                "status": "1",
                "oid": "111001010008",
                "name": "和4G套餐58元档",
                "comboProperies": [{
                    "value": "500MB",
                    "key": "2"
                }],
                "isMonthPack": "0",
                "effecttype": "4"
            }]
        }]
    }

- **packages[].list[].desc：**富文本的描述信息。

## queryMessageStatus 接口 ##

查询消息状态。

### reqparam 请求参数 ###

无。

### respparam 响应 ###

	{
        "unreadmessages": 2
    }

- **unreadmessages：**未读消息的数量。

## contentnotification 接口 ##

天天惠。

### reqparam 请求参数 ###

	{
	    "content": "0"
	}

### respparam 响应 ###

空对象。

## informationcampaign 接口 ##

天天惠。

### reqparam 请求参数 ###

无。

### respparam 响应 ###

	{
        "taskId": "9",
        "advertisement": {
            "minprioritylist": [{
                "title": "精品内容抢先看",
                "weblink": "http://share.migu.cn/h5/api/migu/h5/getSsoNoLogin?type=1&key=dc78304ff97642ac716c30fcf0321f9e&channelId=1380050800000",
                "priority": 3,
                "description": "精品内容全免费，周周不同，月月精彩！",
                "CONTENTID": "330",
                "iconurl": "http://toolbar.url.bi/Public/tb/images/app/_meitu_1_icon_1457425417094.jpg",
                "imageurl": "http://toolbar.url.bi/Public/tb/images/app/_meitu_1_image_1457425411949.jpg",
                "linktype": "0"
            }],
            "maxprioritylist": [{
                "title": "和视界，免费看！",
                "weblink": "http://211.136.93.44/svc/lovev.do?t=1&c=63",
                "priority": 1,
                "description": "会员视频全能看，热剧连播无广告！",
                "CONTENTID": "328",
                "iconurl": "http://toolbar.url.bi/Public/tb/images/app/_icon_1457425243206.jpg",
                "imageurl": "http://toolbar.url.bi/Public/tb/images/app/_image_1457425237035.jpg",
                "linktype": "0"
            }]
        }
    }

## querywochain 接口 ##

### reqparam 请求参数 ###

无。

### respparam 响应 ###

	{
        "session": {
            "jsessionid": "",
            "auth": "TOOLBAR"
        }
    }

## appquerychain 接口 ##

### reqparam 请求参数 ###

无。

### respparam 响应 ###

	{
        "appdownload": {
            "appCategorys": [{
                "categoryName": "最新游戏",
                "appCategoryID": "1",
                "description": "",
                "priority": "1",
                "apps": [{
                    "appName": "逃离黑手党",
                    "logourl": "http://toolbar.url.bi/Public/tb/images/app/12logo_150_logoFile_1457431766171.jpg",
                    "isFree": "1",
                    "priority": "2",
                    "description": "逃离黑手党",
                    "link": "http://m.yihai4g.com/getapp?channel=chinamobile&id=10270",
                    "imageurl": "http://toolbar.url.bi/Public/tb/images/app/12logo_150_imageFile_1457431773965.jpg",
                    "iappID": "2",
                    "size": "",
                    "lastModifyTime": "1457431776196"
                }]
            },
            {
                "categoryName": "默认类别",
                "appCategoryID": "-1",
                "description": "",
                "priority": "9999",
                "apps": []
            }]
        }
    }

## advertismentlocation 接口 ##

获取广告。

### reqparam 请求参数 ###

	{
	    "adlocation": "3"
	}

- **adlocation：**广告位标识。

### respparam 响应 ###

	{
        "id": "3",
        "adlocation": [{
            "title": "4G快人一步",
            "weblink": "http://home.yihai4g.com/activ_list.html?channel=chinamobile",
            "priority": 1,
            "description": "",
            "CONTENTID": "331",
            "iconurl": "http://toolbar.url.bi/Public/tb/images/app/_icon_1457434934753.png",
            "imageurl": "http://toolbar.url.bi/Public/tb/images/app/_image_1457434930333.png",
            "linktype": "0"
        }]
    }

## querysetting 接口 ##

查询个人数据。

### reqparam 请求参数 ###

无。

### respparam 响应 ###

	{
        "avgremain": "0",
        "exceedpercent": "90"
    }

- **avgremain：**个性化设置中的，日均流量低于{avgremain}时，提醒用户。
- **exceedpercent：**个性化设置中的，流量消耗超过百分之{avgremain}时，提醒用户。

## commonpkgsub 接口 ##

套餐商店订购。

### reqparam 请求参数 ###

	{
	    "id": "-1267442447A61",
	    "epageId": "packagerecommedation"
	}

### respparam 响应 ###

待分析

# userfeedback 接口 ##

用户反馈。

### reqparam 请求参数 ###

	{
	    "feedback": "新版焕然一新",
	    "componentId": "cmineset",
	    "pageId": "imineset",
	    "templateId": "fullscreenbar"
	}

### respparam 响应 ###

待分析

directive:buoy:show

流量剩余的计算方法：remain = total - used;