//login
//��¼
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
                document.getElementById("login_qq_span").innerText= LoginManager.getUserUin();//��ȡQQ��
                islogin = true;
	            g("login_qq_span").innerHTML = LoginManager.getUserUin();//��ȡQQ��
                amsSubmit(177502,524407);   //��ѯ��ֵ����
                amsSubmit(177502,524419);   //��ѯ��ť״̬
			});
        });
});

//��ѯ��ֵ����
amsCfg_524407 = {
	"iActivityId": 177502, //�id
	"iFlowId":    524407, //����id
    "sNeedSubmitPopDiv":  false , // �Ƿ���loading��
	"fFlowSubmitEnd": function(res){
		$("#caiyu").html("�����ֵ�ܶ"+res.sOutValue2*100);
		$("#czjf").html("��ֵ�ܻ��֣�"+res.sOutValue2);
		$(".p1-lastn").html("����ʣ�����Ϊ��"+res.sOutValue1);
		$(".p3-det1").html("����ʣ���ֵ����:"+res.sOutValue1+"<br/>���ĳ�ֵ�ܻ���"+res.sOutValue2);
        // initPage();
		var baoming = res.sOutValue3;
		if(baoming == 1){
		    //p3-btn2 sp2 db p3-on1�ѱ���
			$(".p3-btn2").addClass("p3-on1");
                $("#bm").text("���ѱ����ɹ�");
		}
		return;
	}       
};

//�ύ������AME����ҳ��ȡ��ť״̬
amsCfg_524419 = {
    "iActivityId": 177502, //�id
    "iFlowId":    524419, //����id
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
        alert('������ϣ����Ժ����ԣ�');
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
//��������֤
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
//������ȡ
amsCfg_524399 = amsCfg_524401 = amsCfg_524402 = amsCfg_524403 = amsCfg_524404 = {
    'iAMSActivityId' : '177502', // AMS���
    'activityId' : '236927', // ģ��ʵ����
    'sData' : {},
    '_everyRead' : true, //ÿ�ζ�ȡamsCfg_421827����,Ĭ����false
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        amsSubmit(177502,524419);   //��ѯ��ť״̬
        $(this).removeAttr("href").addClass("index-on");
        $("#pop1").hide();
        LotteryManager.alert(callbackObj.sMsg);
    }
};