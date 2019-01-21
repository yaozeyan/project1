/**
 * ��ֵ���а�
 */
//��������֤
need(["biz.roleselector","util.object"],function(RoleSelector,jo){	
	RoleSelector.init({
		'gameId' : 'fo', 
		'type' : 'html',
		'isQueryRole' : true,
		'systemObject' : 'systemObject',
		'areaContentId' : 'areaContentId',
		'roleContentId' : 'roleContentId',
		'confirmButtonId' : 'sibmitSignInfo_524406',
		'submitEvent' : function(roleObj){
			 $('input[name=2183]').val(roleObj.submitData.areaid);
			 $('input[name=2184]').val(encodeURIComponent(roleObj.submitData.rolename));
			 $('input[name=2185]').val(encodeURIComponent(roleObj.submitData.areaname));
			amsSubmit({
				'actId': '177502', // �id
				'flowId': '524405', // ����id
				'optType' : 'add',
				'formId': 'signSubmitInfoForm_524406',
				'success': function(data){
					alert(data.sMsg);
                    $(".p2-btnc").remove();
                    $("#signSubmitInfoForm_524406 ul").after("<span class='p2-btnc sp2 db p2-on'>�������</span>");
                    amsSubmit(177502,524407);
				},
				'loading' : false // ��ame��������ʱ��loading��
			});
		}
	});
	RoleSelector.show();
});

/**
 * ��ʼ��ҳ����ʾ
 */
function initPage() {
    // ��ʼ����ҵĸ���λ����Ϣ
}



milo.ready(function(){
    need("biz.login-min",function(LoginManager){
        LoginManager.checkLogin(function () {
            //��ʼ��
            amsInit({
                'actId': '177502', // �id
                'flowId': '524406', // ����id
                'type' : 'query', // �������� ����
                'success': function(data){
                    // amsִ�гɹ�(res.iRet = 0)ʱ�Ĵ���Ļص�����
                    if(data.iRet === 0){
                        if((isObject(data.jData.userData))){
                            //�ѱ���״̬��ִ��
                            $('#areaContentId').attr('disabled', 'disabled').children('option').text(decodeURIComponent(data.jData.userData.customField2185));
                            $('#roleContentId').attr('disabled', 'disabled').children('option').text(decodeURIComponent(data.jData.userData.customField2184));
                            $(".p2-btnc").remove();
                            $("#signSubmitInfoForm_524406 ul").after("<span class='p2-btnc sp2 db p2-on'>�������</span>");
                            amsSubmit(177502,524407);
                        }else{
                            //δ�����޸�״̬
                            $(".p2-btnc").removeClass().addClass("p2-btnc sp2 db");
                            //$("#sibmitSignInfo_524406").show();
                        }

                    }else{
                        //alert(data.sMsg);
                    }
                },
                'loading' : false // ��ame��������ʱ��loading��
            });
        },function() {
            LoginManager.login();
        });
    });
});

//���а�ǰ30������
function foPaihang(){
    $.ajax({
        url: 'http://apps.game.qq.com/fo/a20181210newyear/FO_CZpaihang.php?opTag=foRank',
        dataType: 'script', //���ص��������ͣ�object, function
        //dataTypeName: 'Pager', //���dataTypeName�趨�ɹ��Ժ�ķ���
        //'showLoadingStr': '���Ժ��������ڼ�����...',
        success: function(){
            if(FO_CZpaihang.retCode != 0){
                alert('���緱æ�����Ժ�����~');
                return;
            }else{
                var resultInfo= eval(FO_CZpaihang.extraData);
                var len = resultInfo.length;
                var message = '';
                for(var m=1;m<=len;m++){
                    var Fuin = resultInfo[m-1]['Fuin'];
                    var FareaName = decodeURIComponent(decodeURIComponent(resultInfo[m-1]['FareaName']));
                    var FroleName = decodeURIComponent(decodeURIComponent(resultInfo[m-1]['FroleName']));
                    var Ftotal_plus=resultInfo[m-1]['Ftotal_plus'];
                    message += '<tr><td class="td_bg">'+m+'</td><td>'+Fuin+'</td><td>'+FareaName+'</td><td>'+FroleName+'</td><td>'+Ftotal_plus+'</td>';

                }
                $('#foPaihang').html(message);
            }
        }
    });
}


window.setTimeout("foPaihang()",1000);
