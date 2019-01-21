//login
//登录
var flowId;
var islogin = false;
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
                document.getElementById("login_qq_span").innerText= LoginManager.getUserUin();//获取QQ号
                islogin = true;
	            g("login_qq_span").innerHTML = LoginManager.getUserUin();//获取QQ号
                amsSubmit(177502,524407);   //查询充值积分
                amsSubmit(177502,524419);   //查询按钮状态
			});
        });
});

//查询充值积分
amsCfg_524407 = {
	"iActivityId": 177502, //活动id
	"iFlowId":    524407, //流程id
    "sNeedSubmitPopDiv":  false , // 是否开启loading层
	"fFlowSubmitEnd": function(res){
		$("#caiyu").html("彩玉充值总额："+res.sOutValue2*100);
		$("#czjf").html("充值总积分："+res.sOutValue2);
		$(".p1-lastn").html("您的剩余积分为："+res.sOutValue1);
		$(".p3-det1").html("您的剩余充值积分:"+res.sOutValue1+"<br/>您的充值总积分"+res.sOutValue2);
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

//提交请求至AME，首页领取按钮状态
amsCfg_524419 = {
    "iActivityId": 177502, //活动id
    "iFlowId":    524419, //流程id
    "fFlowSubmitEnd": function(res){
        if (res.sOutValue1 > 0) {
            $('#get0').removeAttr("href").addClass("index-on");
        }

        if (res.sOutValue2 > 0) {
            $('#get1').removeAttr("href").addClass("index-on");
        }

        if (res.sOutValue3 > 0) {
            $('#get2').removeAttr("href").addClass("index-on");
        }

        if (res.sOutValue4 > 0) {
            $('#get3').removeAttr("href").addClass("index-on");
        }

        if (res.sOutValue5 > 0) {
            $('#get4').removeAttr("href").addClass("index-on");
        }

    },
    "fFlowSubmitFailed":function(res){
        alert('网络故障，请稍候再试！');
    }
};
function get(index) {
    if (islogin) {
        flowId = index;
        TGDialogS('pop1');
    }
    else {
        LoginManager.login();
    }
}
//弹出框验证
need(["biz.roleselector","util.object"],function(RoleSelector,page){
    RoleSelector.init({
        'gameId' : 'fo',
        'type' : 'html',
        'isQueryRole' : true,
        'systemObject' : 'systemObject',
        'areaContentId' : 'areaContentId',
        'roleContentId' : 'roleContentId',
        'confirmButtonId' : 'confirmButtonId',
        'submitEvent' : function(roleObj){
            var area = roleObj.submitData.areaid;
            var name = roleObj.submitData.rolename;
            // var platid = roleObj.submitData.platid;
            sData = {
                "area" :area,
                "sArea":area,
                "rolename": name,
                "sRoleName": name
            }
            amsCfg_524399.sData = amsCfg_524401.sData = amsCfg_524402.sData = amsCfg_524403.sData = amsCfg_524404.sData =sData;
            console.log(flowId);
            amsSubmit(177502,flowId);
        }
    });
    RoleSelector.show();
});
//满额领取
amsCfg_524399 = amsCfg_524401 = amsCfg_524402 = amsCfg_524403 = amsCfg_524404 = {
    'iAMSActivityId' : '177502', // AMS活动号
    'activityId' : '236927', // 模块实例号
    'sData' : {},
    '_everyRead' : true, //每次读取amsCfg_421827对象,默认是false
    'onBeginGetGiftEvent' : function(){
        return 0; // 抽奖前事件，返回0表示成功
    },
    'onGetGiftFailureEvent' : function(callbackObj){// 抽奖失败事件
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// 抽奖成功事件
        amsSubmit(177502,524419);   //查询按钮状态
        $(this).removeAttr("href").addClass("index-on");
        $("#pop1").hide();
        LotteryManager.alert(callbackObj.sMsg);
    }
};