/**
 * ������
 */
// ���id�����ͼƬ���������
var giftCfg = {
    1105195: ['<img src="//game.gtimg.cn/images/fo/cp/a20181210newyear/page1/fu-1.png" width="37" height="37" alt="�ͷ��������">', '�ͷ��������'],
    1105187: ['<img src="//game.gtimg.cn/images/fo/cp/a20181210newyear/page1/fu-2.png" width="37" height="37" alt="����ҩˮ�����">', '����ҩˮ�����'],
    1105177: ['<img src="//game.gtimg.cn/images/fo/cp/a20181210newyear/page1/fu-3.png" width="37" height="37" alt="������������">', '������������'],
    1105175: ['<img src="//game.gtimg.cn/images/fo/cp/a20181210newyear/page1/fu-4.png" width="37" height="37" alt="��Ѫ���������">', '��Ѫ���������'],
    1105171: ['<img src="//game.gtimg.cn/images/fo/cp/a20181210newyear/page1/fu-5.png" width="37" height="37" alt="������������">', '������������'],
    111111: ['<img src="//game.gtimg.cn/images/fo/cp/a20181210newyear/fd.jpg" alt="δ����">', 'δ����'],
    000000: '//game.gtimg.cn/images/fo/cp/a20181210newyear/fd.jpg' // Ĭ��ͼƬ
};
var giftCfg_1 = {
    738740 : 1105195,
    738732 : 1105187,
    738722 : 1105177,
    738720 : 1105175,
    738716 : 1105171
}

// ��������ʣ�������,
var ticketJifen = null;
// ��ҳ齱��λ����Ϣ
var position = null;

// ��������ͼƬ��������ǲ�td��ǩ
var $imgsTd = null;
milo.ready(function() {
     initUserPosition();
    // Ϊÿ��ͼƬ��ӵ���¼�
    $imgsTd = $('table.p1-tab1').find('td').has('img');
    $imgsTd.each(function (index) {
        $(this).on('click', {position: index}, function (ev) {
            var imgStr = $(this).children("img").attr("src");
            if (imgStr == giftCfg[000000]){
                // �򿪸���
                position = ev.data.position;
                amsCfg_524414.sData = {
                    'position': position
                };
                amsSubmit(177502,524414);
                // openOnePackage(ev.data.position);

            }else {
                alert("�ܱ�Ǹ���˸����Ѵ򿪣����������������~");
            }
        });
    });
});

/**
 * �����齱
 * @type {{iAMSActivityId: string, activityId: string, onBeginGetGiftEvent: amsCfg_421171.onBeginGetGiftEvent, onGetGiftFailureEvent: amsCfg_421171.onGetGiftFailureEvent, onGetGiftSuccessEvent: amsCfg_421171.onGetGiftSuccessEvent}}
 */
// �齱��ȡ�����ܳ�ʼ��
amsCfg_524414 = {
    'iAMSActivityId' : '177502', // AMS���
    'activityId' : '237155', // ģ��ʵ����
    'onBeginGetGiftEvent' : function(){
        return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
    },
    'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
        alert(callbackObj.sMsg);
    },
    'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�

        // ��ʼ��ҳ�����������ʾ
        amsSubmit(177502,524407);

        // ��ʾ
        $imgsTd.eq(position).html(giftCfg[callbackObj.iPackageId][0]); //��ʾ��ǰ�鵽�����ͼ��
        alert(callbackObj.sMsg);

        //�鵽��������������������ͼ��
        if (callbackObj.iPackageId == 738716) {
            resetAllPackage(true);
        }
    }
};



/**
 * ��ʼ��ҳ����ʾ
 */
function initPage() {
    // ��ʼ����ҵĸ���λ����Ϣ
    initUserPosition();
}

/**
 * ��ʼ����ҵĸ���λ����Ϣ
 */
function initUserPosition() {
    need("biz.login-min",function(LoginManager){
    LoginManager.checkLogin(function () {
        $.ajax({
            url: 'http://apps.game.qq.com/fo/a20181210newyear/UserPos.php',
            dataType: 'script', //���ص��������ͣ�object, function
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
 * ȫ���� -- ��Ҫ2000����
 */
function openAllPackage() {
    if ( ! confirm('ʹ�øù��ܣ�����۳�2000���֣�һ���Դ����и��������ȷ����һ���Դ����и��������ȡ������Ի�������')) {
        return;
    }

    // ������������������
    sendOpenAll();
}

/**
 * ���ʹ�ȫ��������
 */
function sendOpenAll() {
    need("biz.login-min",function(LoginManager){
    LoginManager.checkLogin(function () {
        $.ajax({
            url: 'http://apps.game.qq.com/fo/a20181210newyear/OpenAll_FO.php',
            dataType: 'script', //���ص��������ͣ�object, function
            success: function () {
                var retCode = COpenAll_FO.retCode;
                if (retCode != 0) {
                    alert(COpenAll_FO.retInfo);
                }
                else {
                    // ��ʼ��ҳ��Ļ�����ʾ
                    amsSubmit(177502,524407);//��ѯ��ֵ����

                    // �򿪵������Ϣ
                    var tdArrAll = COpenAll_FO.retInfo.split(',');
                    // td��jquery����
                    for (var i = 0; i < tdArrAll.length; i++) {
                        $imgsTd.eq(i).html(giftCfg[giftCfg_1[tdArrAll[i]]][0]);
                    }

                    alert("��ϲ����ã�" + giftCfg['1105195'][1] + "*" + COpenAll_FO.extraData['738740'] + "��" + giftCfg['1105187'][1] + "*" + COpenAll_FO.extraData['738732'] + "��" + giftCfg['1105177'][1] + "*" + COpenAll_FO.extraData['738722'] + "��" + giftCfg['1105175'][1] + "*" + COpenAll_FO.extraData['738720'] + "��" + giftCfg['1105171'][1] + "*" + COpenAll_FO.extraData['738716']);
                    // ���ø���
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
 * ���ø���
 */
function resetAllPackage(reset) {
    if (reset == true || confirm('�Ƿ�ȷ�����ø�����') == true) {
        // ���ø���
        amsSubmit(177502,524415);
    }
}

/**
 * ��������
 * @type {{iActivityId: number, iFlowId: number, fFlowSubmitEnd: amsCfg_421174.fFlowSubmitEnd, fFlowSubmitFailed: amsCfg_421174.fFlowSubmitFailed}}
 */
amsCfg_524415 = {
    "iActivityId": 177502, //�id
    "iFlowId":    524415, //����id
    "fFlowSubmitEnd": function(res){
        if (res.sOutValue1 == 0) {
            alert('�������óɹ����Ͻ�ȥ������Ӵ~');
            $imgsTd.each(function () {
                $(this).html(giftCfg[111111][0]);
            });
        } else {
            alert('���緱æ�����ø���ʧ�ܣ����Ժ�����~');
        }
    },
    "fFlowSubmitFailed":function(res){
        alert(res.sMsg);
    }
};