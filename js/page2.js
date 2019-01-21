/**
 * 充值排行榜
 */
//弹出框验证
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
				'actId': '177502', // 活动id
				'flowId': '524405', // 流程id
				'optType' : 'add',
				'formId': 'signSubmitInfoForm_524406',
				'success': function(data){
					alert(data.sMsg);
                    $(".p2-btnc").remove();
                    $("#signSubmitInfoForm_524406 ul").after("<span class='p2-btnc sp2 db p2-on'>点击报名</span>");
                    amsSubmit(177502,524407);
				},
				'loading' : false // 向ame传输数据时的loading层
			});
		}
	});
	RoleSelector.show();
});

/**
 * 初始化页面显示
 */
function initPage() {
    // 初始化玩家的福袋位置信息
}



milo.ready(function(){
    need("biz.login-min",function(LoginManager){
        LoginManager.checkLogin(function () {
            //初始化
            amsInit({
                'actId': '177502', // 活动id
                'flowId': '524406', // 流程id
                'type' : 'query', // 操作类型 必填
                'success': function(data){
                    // ams执行成功(res.iRet = 0)时的处理的回调函数
                    if(data.iRet === 0){
                        if((isObject(data.jData.userData))){
                            //已报名状态不执行
                            $('#areaContentId').attr('disabled', 'disabled').children('option').text(decodeURIComponent(data.jData.userData.customField2185));
                            $('#roleContentId').attr('disabled', 'disabled').children('option').text(decodeURIComponent(data.jData.userData.customField2184));
                            $(".p2-btnc").remove();
                            $("#signSubmitInfoForm_524406 ul").after("<span class='p2-btnc sp2 db p2-on'>点击报名</span>");
                            amsSubmit(177502,524407);
                        }else{
                            //未报名修改状态
                            $(".p2-btnc").removeClass().addClass("p2-btnc sp2 db");
                            //$("#sibmitSignInfo_524406").show();
                        }

                    }else{
                        //alert(data.sMsg);
                    }
                },
                'loading' : false // 向ame传输数据时的loading层
            });
        },function() {
            LoginManager.login();
        });
    });
});

//排行榜前30名数据
function foPaihang(){
    $.ajax({
        url: 'http://apps.game.qq.com/fo/a20181210newyear/FO_CZpaihang.php?opTag=foRank',
        dataType: 'script', //返回的数据类型：object, function
        //dataTypeName: 'Pager', //如果dataTypeName设定成功以后的方法
        //'showLoadingStr': '请稍后，数据正在加载中...',
        success: function(){
            if(FO_CZpaihang.retCode != 0){
                alert('网络繁忙，请稍后再试~');
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
