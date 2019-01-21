/**
 * 领取奖励
 */
milo.addEvent(g("unlogin"), "click", function() {
    need("biz.login-min",function(LoginManager){
        LoginManager.init({
            needReloadPage:true
        });
        LoginManager.login();
    });
    return false;
});
milo.addEvent(g("dologout"), "click", function() {
    need("biz.login-min",function(LoginManager){
        LoginManager.logout();
    });
    return false;
});
milo.ready(function() {
    need("biz.login-min",function(LoginManager){
        LoginManager.checkLogin(function(){
            g("login_qq_span").innerHTML = LoginManager.getUserUin();//获取QQ号
            amsSubmit(177502,524407);   //查询充值积分
        });
    });
});

var iId=0;
var packageInfo=[];
function  showGift(obj){
    need("biz.login-min",function(LoginManager){
    LoginManager.checkLogin(function(){
        var htm = obj.innerHTML;
        packageInfo = htm.split('_');
        var giftactive= {'738716':524408,'738720':524412,'738722':524411,'738732':524410,'738740':524413};
        iId = giftactive[packageInfo[1]];
        TGDialogS('pop1');
    },function(){LoginManager.login();});
    });
}

//验证Num
var isNum = function(num)
{
    if(num.length!=0){
        if (parseInt(num) == num && num >0 && num < 299) {
            return true;
        }
    }

    alert("本次领取份数请输入大于0并且小于299的正整数");
    return false;
};
//日历
need(["biz.selCalendar"], function (sc) {
    sc.init({
        type: 'date', //默认为date, 如为datetime，则会在尾部增加时间输入框
        start: 'now' //时间输入框默认值，该项默认为now，如有特殊情况，请输入值为hh-ii-ss的形式
    });
});
//弹出框验证
need(["biz.roleselector","util.object"],function(RoleSelector){
    RoleSelector.init({
        'gameId' : 'fo',
        'type' : 'html',
        'isQueryRole' : true,
        'systemObject' : 'systemObject',
        'areaContentId' : 'areaContentId',
        'roleContentId' : 'roleContentId',
        'confirmButtonId' : 'confirmButtonIdLingqu',
        'submitEvent' : function(roleObj){
            var giftnum = $('#getpackageNum').val();
            if(giftnum>parseInt(packageInfo[2])){
                alert('领取数量不能大于剩余礼包数量');
                return;
            };

        	if(isNum(giftnum) == false){
			   	return;
		   	}

            eval('amsCfg_'+iId+'.sData={"giftnum":'+giftnum+',"sArea": '+roleObj.submitData.areaid+',"sRoleId": \''+roleObj.submitData.roleid+'\',"sServiceType" : \'fo\',"sRoleName" : \''+roleObj.submitData.rolename+'\',"md5str" : \''+roleObj.submitData.md5str+'\',"ams_checkparam" : \''+roleObj.submitData.checkparam+'\',"checkparam" : \''+roleObj.submitData.checkparam+'\'};');
            amsSubmit(177502,iId);
            closeDialog();
        }
    });
    RoleSelector.show();

});
function initPage() {
    // 初始化玩家的福袋位置信息
}
//查询充值积分
amsCfg_524407 = {
    "iActivityId": 177502, //活动id
    "iFlowId":    524407, //流程id
    "sNeedSubmitPopDiv":  false , // 是否开启loading层
    "fFlowSubmitEnd": function(res){
        $("#caiyu").html("彩玉充值总额："+res.sOutValue2*100);
        $("#czjf").html("充值总积分："+res.sOutValue2);
        $(".p1-lastn").html("您的剩余积分为："+res.sOutValue1);
        $("#cz").html("您的剩余充值积分:"+res.sOutValue1+"<br/>您的充值总积分"+res.sOutValue2);
        // initPage();
        var baoming = res.sOutValue3;
        if(baoming == 1){
            //p3-btn2 sp2 db p3-on1已报名
            $(".p3-btn2").addClass("p3-on1");
            $("#bm").text("您已报名成功");
        }
        return;
    }
};
//<!-------------------------中心领取--------------------------------------------->
// 抽奖领取主功能初始化
amsCfg_524408 = amsCfg_524410 = amsCfg_524411 = amsCfg_524412 = amsCfg_524413 = {
	'iAMSActivityId' : '177502', // AMS活动号
	'activityId' : '237145', // 模块实例号
    '_everyRead' : true,
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        var giftnum = $('#getpackageNum').val();
        if(packageLen && packageLen.length > 1){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }

        LotteryManager.alert(callbackObj.sMsg +' ' + giftnum + '份');
        submitData();
    }
};

//<!------------------------领取记录查询------------------------------------------------->

//验证日期合法性
function dateCheck(dateStr) {
    var date = dateStr;
    var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (result == null){
        return;
    }
    var d = new Date(result[1], result[3] - 1, result[4]);
    return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4]);
}

/**
 * 奖励发放查询
 * @param iPageId：页数
 */
function searchGift(iPageId){
    need("biz.login-min",function(LoginManager){
    if(!LoginManager.isLogin()){
        LoginManager.login();
        return;
    }
    });
    var timeBegin=$("#f_date1").val();
    var timeEnd=$("#f_date2").val();

    if (!dateCheck(timeBegin) || !dateCheck(timeEnd)) {
        alert("请正确输入开始与结束时间，格式为YYYY-MM-dd");
        return;
    }

    if(timeBegin > timeEnd){
        alert("开始时间不能大于结束时间");
        return;
    }
    var _url = "index="+iPageId+"&date1="+timeBegin+'&date2='+timeEnd;
    $.ajax({
        url: 'http://apps.game.qq.com/fo/a20181210newyear/PersonalList.php?'+_url,
        dataType: 'script', //返回的数据类型：object, function
        //dataTypeName: 'Pager', //如果dataTypeName设定成功以后的方法
        //'showLoadingStr': '请稍后，数据正在加载中...',
        success: function(){
            if(CPersonalList.retCode != 0){
                alert(CPersonalList.retInfo);
                return;
            }else{
                var resultInfo= CPersonalList.extraData;
                var len= resultInfo.length;
                var Number= CPersonalList.retInfo; //总页数
                var messages= "";
                var pageHTML= "";
                var areaNames ="";
                if(len == 0){
                    messages = '<td colspan="6">该时间段内没有领取记录</td>';

                    $('#search_giftCenter').html('');
                    $('#getPageList').html(messages);
                    return;
                }
                else{
                    for(var m=0;m<len;m++){
                        areaNames='';
                        for(var k=0;k<FOServerSelect.STD_DATA.length;k++){
                            if(FOServerSelect.STD_DATA[k]['v']==resultInfo[m]["sRoleArea"]){
                                areaNames = FOServerSelect.STD_DATA[k]['t'];
                                break;
                            }
                        }
                        //无乱码直接读取
                        messages += '<tr><td>'+resultInfo[m]["sPackageName"]+'</td><td>'+resultInfo[m]["dtGetPackageTime"]+'</td><td>'+resultInfo[m]["iPackageNum"]+'</td><td>'+areaNames+'</td><td>'+decodeURIComponent(resultInfo[m]["sRoleName"])+'</td><td>成功</td></tr>';
                    }
                    var indexPage = parseInt(iPageId)+1;//首页
                    var endPage = Number-1;//尾页
                    var pageHTML="<span class=\"hx_page_num\">"+indexPage+"/"+Number+"</span>";
                    pageHTML += "<a style=\"margin:0 3px;\" href=\"javascript:searchGift(0);\" title=\"首页\">首页</a>";
                    if(indexPage<=1){ //第一页
                        pageHTML += "<a style=\"margin:0 3px;\" href=\"javascript:void(0)\" title=\"上一页\">上一页</a>";
                    }else{
                        var up =parseInt(iPageId)-1;
                        pageHTML += "<a style=\"margin:0 3px;\" href=\"javascript:searchGift("+up+")\" title=\"上一页\">上一页</a>";

                    }
                    if(indexPage>=Number){//最后一页
                        pageHTML += "<a style=\"margin:0 3px;\" href=\"javascript:void(0)\" title=\"下一页\">下一页</a>";
                    }else{
                        var next =parseInt(iPageId)+1;
                        pageHTML += "<a style=\"margin:0 3px;\" href=\"javascript:searchGift("+next+")\" title=\"下一页\">下一页</a>";
                    }

                    pageHTML += "<a style=\"margin:0 3px;\" href=\"javascript:searchGift("+endPage+")\" title=\"末页\">末页</a>";
                }
                $('#search_giftCenter').html(messages);
                $('#getPageList').html(pageHTML);
            }
        }
    });
}
/**
 * 初始化领取中心
 */
function submitData() {
    LoginManager.checkLogin(function () {
        $.ajax({
            url: 'http://apps.game.qq.com/fo/a20181210newyear/Pager.php?index=0',
            dataType: 'script', //返回的数据类型：object, function
            //dataTypeName: 'Pager', //如果dataTypeName设定成功以后的方法
            //'showLoadingStr': '请稍后，数据正在加载中...',
            success: function(){
                if(Pager.retCode != 0){
                    alert('网络繁忙，请稍后再试~');
                    return;
                }else{
                    var resultInfo= eval(Pager.extraData);
                    var len = resultInfo.length;
                    var message1 = '';
                    message1 += '<tr><th style="width: 144px;height: 38px;">名称</th><th style="width: 203px;">可领数量</th><th style="width: 203px;">已领数量</th><th>领取</th></tr>';
                    for(var m=1;m<=len;m++){
                        var s_package_name = resultInfo[m-1]['sPackageName'];
                        var i_package_count = resultInfo[m-1]['iPackageNum'];
                        var i_package_id =resultInfo[m-1]['iPackageId'];
                        var i_package_used=resultInfo[m-1]['isentNum'];
                        message1 += '<tr><td>'+s_package_name+'</td><td>'+i_package_count+'</td><td>'+i_package_used+'</td><td>';
                        if(i_package_count==0){
                            message1 +=	'<a href="javascript:;" style="display: block;" class="p3-btnlq sp2 db p3-on" title="已领取">已领取</a></td></tr>';
                        }
                        else{
                            message1 +='<a class="p3-btnlq sp2 db" href="javascript:;" onclick="showGift(this)" title="领取">领取_'+ i_package_id +'_' +i_package_count+'_'+ i_package_used +'</a></td></tr>';
                        }
                    }
                    $('#giftCenter').html(message1);
                }

            }

        });
    },function(){LoginManager.login();});
}

window.setTimeout("submitData()",1000);

