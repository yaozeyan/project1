/**
 * ��ȡ����
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
            g("login_qq_span").innerHTML = LoginManager.getUserUin();//��ȡQQ��
            amsSubmit(177502,524407);   //��ѯ��ֵ����
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

//��֤Num
var isNum = function(num)
{
    if(num.length!=0){
        if (parseInt(num) == num && num >0 && num < 299) {
            return true;
        }
    }

    alert("������ȡ�������������0����С��299��������");
    return false;
};
//����
need(["biz.selCalendar"], function (sc) {
    sc.init({
        type: 'date', //Ĭ��Ϊdate, ��Ϊdatetime�������β������ʱ�������
        start: 'now' //ʱ�������Ĭ��ֵ������Ĭ��Ϊnow���������������������ֵΪhh-ii-ss����ʽ
    });
});
//��������֤
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
                alert('��ȡ�������ܴ���ʣ���������');
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
    // ��ʼ����ҵĸ���λ����Ϣ
}
//��ѯ��ֵ����
amsCfg_524407 = {
    "iActivityId": 177502, //�id
    "iFlowId":    524407, //����id
    "sNeedSubmitPopDiv":  false , // �Ƿ���loading��
    "fFlowSubmitEnd": function(res){
        $("#caiyu").html("�����ֵ�ܶ"+res.sOutValue2*100);
        $("#czjf").html("��ֵ�ܻ��֣�"+res.sOutValue2);
        $(".p1-lastn").html("����ʣ�����Ϊ��"+res.sOutValue1);
        $("#cz").html("����ʣ���ֵ����:"+res.sOutValue1+"<br/>���ĳ�ֵ�ܻ���"+res.sOutValue2);
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
//<!-------------------------������ȡ--------------------------------------------->
// �齱��ȡ�����ܳ�ʼ��
amsCfg_524408 = amsCfg_524410 = amsCfg_524411 = amsCfg_524412 = amsCfg_524413 = {
	'iAMSActivityId' : '177502', // AMS���
	'activityId' : '237145', // ģ��ʵ����
    '_everyRead' : true,
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
        var packageLen = callbackObj.iPackageId ? callbackObj.iPackageId.split(',') : '';
        var giftnum = $('#getpackageNum').val();
        if(packageLen && packageLen.length > 1){
            LotteryManager.alert(callbackObj.sMsg);
            return;
        }

        LotteryManager.alert(callbackObj.sMsg +' ' + giftnum + '��');
        submitData();
    }
};

//<!------------------------��ȡ��¼��ѯ------------------------------------------------->

//��֤���ںϷ���
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
 * �������Ų�ѯ
 * @param iPageId��ҳ��
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
        alert("����ȷ���뿪ʼ�����ʱ�䣬��ʽΪYYYY-MM-dd");
        return;
    }

    if(timeBegin > timeEnd){
        alert("��ʼʱ�䲻�ܴ��ڽ���ʱ��");
        return;
    }
    var _url = "index="+iPageId+"&date1="+timeBegin+'&date2='+timeEnd;
    $.ajax({
        url: 'http://apps.game.qq.com/fo/a20181210newyear/PersonalList.php?'+_url,
        dataType: 'script', //���ص��������ͣ�object, function
        //dataTypeName: 'Pager', //���dataTypeName�趨�ɹ��Ժ�ķ���
        //'showLoadingStr': '���Ժ��������ڼ�����...',
        success: function(){
            if(CPersonalList.retCode != 0){
                alert(CPersonalList.retInfo);
                return;
            }else{
                var resultInfo= CPersonalList.extraData;
                var len= resultInfo.length;
                var Number= CPersonalList.retInfo; //��ҳ��
                var messages= "";
                var pageHTML= "";
                var areaNames ="";
                if(len == 0){
                    messages = '<td colspan="6">��ʱ�����û����ȡ��¼</td>';

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
                        //������ֱ�Ӷ�ȡ
                        messages += '<tr><td>'+resultInfo[m]["sPackageName"]+'</td><td>'+resultInfo[m]["dtGetPackageTime"]+'</td><td>'+resultInfo[m]["iPackageNum"]+'</td><td>'+areaNames+'</td><td>'+decodeURIComponent(resultInfo[m]["sRoleName"])+'</td><td>�ɹ�</td></tr>';
                    }
                    var indexPage = parseInt(iPageId)+1;//��ҳ
                    var endPage = Number-1;//βҳ
                    var pageHTML="<span class=\"hx_page_num\">"+indexPage+"/"+Number+"</span>";
                    pageHTML += "<a style=\"margin:0 3px;\" href=\"javascript:searchGift(0);\" title=\"��ҳ\">��ҳ</a>";
                    if(indexPage<=1){ //��һҳ
                        pageHTML += "<a style=\"margin:0 3px;\" href=\"javascript:void(0)\" title=\"��һҳ\">��һҳ</a>";
                    }else{
                        var up =parseInt(iPageId)-1;
                        pageHTML += "<a style=\"margin:0 3px;\" href=\"javascript:searchGift("+up+")\" title=\"��һҳ\">��һҳ</a>";

                    }
                    if(indexPage>=Number){//���һҳ
                        pageHTML += "<a style=\"margin:0 3px;\" href=\"javascript:void(0)\" title=\"��һҳ\">��һҳ</a>";
                    }else{
                        var next =parseInt(iPageId)+1;
                        pageHTML += "<a style=\"margin:0 3px;\" href=\"javascript:searchGift("+next+")\" title=\"��һҳ\">��һҳ</a>";
                    }

                    pageHTML += "<a style=\"margin:0 3px;\" href=\"javascript:searchGift("+endPage+")\" title=\"ĩҳ\">ĩҳ</a>";
                }
                $('#search_giftCenter').html(messages);
                $('#getPageList').html(pageHTML);
            }
        }
    });
}
/**
 * ��ʼ����ȡ����
 */
function submitData() {
    LoginManager.checkLogin(function () {
        $.ajax({
            url: 'http://apps.game.qq.com/fo/a20181210newyear/Pager.php?index=0',
            dataType: 'script', //���ص��������ͣ�object, function
            //dataTypeName: 'Pager', //���dataTypeName�趨�ɹ��Ժ�ķ���
            //'showLoadingStr': '���Ժ��������ڼ�����...',
            success: function(){
                if(Pager.retCode != 0){
                    alert('���緱æ�����Ժ�����~');
                    return;
                }else{
                    var resultInfo= eval(Pager.extraData);
                    var len = resultInfo.length;
                    var message1 = '';
                    message1 += '<tr><th style="width: 144px;height: 38px;">����</th><th style="width: 203px;">��������</th><th style="width: 203px;">��������</th><th>��ȡ</th></tr>';
                    for(var m=1;m<=len;m++){
                        var s_package_name = resultInfo[m-1]['sPackageName'];
                        var i_package_count = resultInfo[m-1]['iPackageNum'];
                        var i_package_id =resultInfo[m-1]['iPackageId'];
                        var i_package_used=resultInfo[m-1]['isentNum'];
                        message1 += '<tr><td>'+s_package_name+'</td><td>'+i_package_count+'</td><td>'+i_package_used+'</td><td>';
                        if(i_package_count==0){
                            message1 +=	'<a href="javascript:;" style="display: block;" class="p3-btnlq sp2 db p3-on" title="����ȡ">����ȡ</a></td></tr>';
                        }
                        else{
                            message1 +='<a class="p3-btnlq sp2 db" href="javascript:;" onclick="showGift(this)" title="��ȡ">��ȡ_'+ i_package_id +'_' +i_package_count+'_'+ i_package_used +'</a></td></tr>';
                        }
                    }
                    $('#giftCenter').html(message1);
                }

            }

        });
    },function(){LoginManager.login();});
}

window.setTimeout("submitData()",1000);

