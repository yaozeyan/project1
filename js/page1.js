/**
 * 开福袋
 */
// 礼包id；礼包图片；礼包名称
var giftCfg = {
    1105195: ['<img src="//game.gtimg.cn/images/fo/cp/a20181210newyear/page1/fu-1.png" width="37" height="37" alt="缤纷焰火大礼包">', '缤纷焰火大礼包'],
    1105187: ['<img src="//game.gtimg.cn/images/fo/cp/a20181210newyear/page1/fu-2.png" width="37" height="37" alt="给力药水大礼包">', '给力药水大礼包'],
    1105177: ['<img src="//game.gtimg.cn/images/fo/cp/a20181210newyear/page1/fu-3.png" width="37" height="37" alt="海量经验大礼包">', '海量经验大礼包'],
    1105175: ['<img src="//game.gtimg.cn/images/fo/cp/a20181210newyear/page1/fu-4.png" width="37" height="37" alt="热血竞技大礼包">', '热血竞技大礼包'],
    1105171: ['<img src="//game.gtimg.cn/images/fo/cp/a20181210newyear/page1/fu-5.png" width="37" height="37" alt="吾心永恒大礼包">', '吾心永恒大礼包'],
    111111: ['<img src="//game.gtimg.cn/images/fo/cp/a20181210newyear/fd.jpg" alt="未开启">', '未开启'],
    000000: '//game.gtimg.cn/images/fo/cp/a20181210newyear/fd.jpg' // 默认图片
};
var giftCfg_1 = {
    738740 : 1105195,
    738732 : 1105187,
    738722 : 1105177,
    738720 : 1105175,
    738716 : 1105171
}

// 开福袋的剩余积分数,
var ticketJifen = null;
// 玩家抽奖的位置信息
var position = null;

// 包含福袋图片的外面的那层td标签
var $imgsTd = null;
milo.ready(function() {
     initUserPosition();
    // 为每个图片添加点击事件
    $imgsTd = $('table.p1-tab1').find('td').has('img');
    $imgsTd.each(function (index) {
        $(this).on('click', {position: index}, function (ev) {
            var imgStr = $(this).children("img").attr("src");
            if (imgStr == giftCfg[000000]){
                // 打开福袋
                position = ev.data.position;
                amsCfg_524414.sData = {
                    'position': position
                };
                amsSubmit(177502,524414);
                // openOnePackage(ev.data.position);

            }else {
                alert("很抱歉，此福袋已打开，请继续打开其他福袋~");
            }
        });
    });
});

/**
 * 福袋抽奖
 * @type {{iAMSActivityId: string, activityId: string, onBeginGetGiftEvent: amsCfg_421171.onBeginGetGiftEvent, onGetGiftFailureEvent: amsCfg_421171.onGetGiftFailureEvent, onGetGiftSuccessEvent: amsCfg_421171.onGetGiftSuccessEvent}}
 */
// 抽奖领取主功能初始化
amsCfg_524414 = {
    'iAMSActivityId' : '177502', // AMS活动号
    'activityId' : '237155', // 模块实例号
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件

        // 初始化页面积分数量显示
        amsSubmit(177502,524407);

        // 显示
        $imgsTd.eq(position).html(giftCfg[callbackObj.iPackageId][0]); //显示当前抽到的礼包图标
        alert(callbackObj.sMsg);

        //抽到吾心永恒大礼包重置所有图标
        if (callbackObj.iPackageId == 738716) {
            resetAllPackage(true);
        }
    }
};



/**
 * 初始化页面显示
 */
function initPage() {
    // 初始化玩家的福袋位置信息
    initUserPosition();
}

/**
 * 初始化玩家的福袋位置信息
 */
function initUserPosition() {
    need("biz.login-min",function(LoginManager){
    LoginManager.checkLogin(function () {
        $.ajax({
            url: 'http://apps.game.qq.com/fo/a20181210newyear/UserPos.php',
            dataType: 'script', //返回的数据类型：object, function
            success: function () {
                var retCode = CUserPos.retCode;
                if (retCode != 0) {
                    alert(CUserPos.retInfo);
                }
                else {
                    if (CUserPos.retInfo > 0) {
                        var tdArr = CUserPos.extraData.split(',');
                        for (var i = 0; i < tdArr.length; i++) {
                            if (tdArr[i] > 0) {
                                $imgsTd.eq(i).html(giftCfg[giftCfg_1[tdArr[i]]][0]);
                            }
                        }
                    }
                    else {
                        $imgsTd.each(function () {
                            $(this).html(giftCfg[111111][0]);
                        });
                    }
                }
            }
        });
    }, function () {
        LoginManager.login();
    });
    });
}







/**
 * 全部打开 -- 需要2000积分
 */
function openAllPackage() {
    if ( ! confirm('使用该功能，将会扣除2000积分，一次性打开所有福袋。点击确认则一次性打开所有福袋；点击取消，则对话结束。')) {
        return;
    }

    // 满足条件，发送请求
    sendOpenAll();
}

/**
 * 发送打开全部的请求
 */
function sendOpenAll() {
    need("biz.login-min",function(LoginManager){
    LoginManager.checkLogin(function () {
        $.ajax({
            url: 'http://apps.game.qq.com/fo/a20181210newyear/OpenAll_FO.php',
            dataType: 'script', //返回的数据类型：object, function
            success: function () {
                var retCode = COpenAll_FO.retCode;
                if (retCode != 0) {
                    alert(COpenAll_FO.retInfo);
                }
                else {
                    // 初始化页面的积分显示
                    amsSubmit(177502,524407);//查询充值积分

                    // 打开的礼包信息
                    var tdArrAll = COpenAll_FO.retInfo.split(',');
                    // td的jquery对象
                    for (var i = 0; i < tdArrAll.length; i++) {
                        $imgsTd.eq(i).html(giftCfg[giftCfg_1[tdArrAll[i]]][0]);
                    }

                    alert("恭喜您获得：" + giftCfg['1105195'][1] + "*" + COpenAll_FO.extraData['738740'] + "，" + giftCfg['1105187'][1] + "*" + COpenAll_FO.extraData['738732'] + "，" + giftCfg['1105177'][1] + "*" + COpenAll_FO.extraData['738722'] + "，" + giftCfg['1105175'][1] + "*" + COpenAll_FO.extraData['738720'] + "，" + giftCfg['1105171'][1] + "*" + COpenAll_FO.extraData['738716']);
                    // 重置福袋
                    resetAllPackage(true);
                }
            }
        });
    }, function () {
        LoginManager.login();
    });
    });
}

/**
 * 重置福袋
 */
function resetAllPackage(reset) {
    if (reset == true || confirm('是否确定重置福袋？') == true) {
        // 重置福袋
        amsSubmit(177502,524415);
    }
}

/**
 * 福袋重置
 * @type {{iActivityId: number, iFlowId: number, fFlowSubmitEnd: amsCfg_421174.fFlowSubmitEnd, fFlowSubmitFailed: amsCfg_421174.fFlowSubmitFailed}}
 */
amsCfg_524415 = {
    "iActivityId": 177502, //活动id
    "iFlowId":    524415, //流程id
    "fFlowSubmitEnd": function(res){
        if (res.sOutValue1 == 0) {
            alert('福袋重置成功，赶紧去开福袋哟~');
            $imgsTd.each(function () {
                $(this).html(giftCfg[111111][0]);
            });
        } else {
            alert('网络繁忙，重置福袋失败，请稍后再试~');
        }
    },
    "fFlowSubmitFailed":function(res){
        alert(res.sMsg);
    }
};