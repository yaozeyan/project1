var flag;
$(function () {
    roleSelector = null;
    //弹出框验证
    need(["biz.roleselector", "util.object"], function (RoleSelector, jo) {
        roleSelector = RoleSelector.init({
            'gameId': 'fo',
            'isQueryRole': true,
            'isShutdownSubmit': false,
            'type': "float",
            'submitEvent': function (roleObj) {
                signUp(roleObj);
            }
        });
        roleSelector = RoleSelector;
    });

    $('#sign_charm').click(function () {
        flag = 1;
        LoginManager.checkLogin(function () {
            roleSelector.show();
        }, function () {
            LoginManager.login();
            return;
        });
    });
    $('#sign_handsome').click(function () {
        flag = 2;
        LoginManager.checkLogin(function () {
            roleSelector.show();
        }, function () {
            LoginManager.login();
            return;
        });
    });
    getCharmInfo();
});

function signUp(roleObject) {
    LoginManager.checkLogin(null, function () {
        LoginManager.login();
        return;
    });
    if (flag != 1 && flag != 2) {
        alert("参数错误！");
        return;
    }
    var areaId = roleObject["submitData"]["areaid"];
    var rolename = encodeURIComponent(roleObject["submitData"]["rolename"]);
    var query_url = "http://apps.game.qq.com/fo/a20171206xcz/MeiLi.php?_a=sign&areaId=" + areaId + "&rolename=" + rolename + "&f=" + flag + "&_t=" + Math.random(1000000);
    jQuery.getScript(query_url, function () {
        alert(SIGN_RES.msg);
    });
}

function initPage() {
    // 初始化玩家的福袋位置信息
}

function getCharmInfo() {
    var query_url = "http://apps.game.qq.com/fo/a20171206xcz/MeiLi.php?_a=bank&f=1" + "&_t=" + Math.random(1000000);
    jQuery.getScript(query_url, function () {
        var str = "";
        var charVal = "";
        var tempIndex = 0;
        if (CHARM_RES.ret_code == 0) {
            $("#rank_charm tr th").empty();
            var index = 1;
            $.each(CHARM_RES.msg.data, function (key, value) {
                charVal = value["iCharmValue"] == "" ? "0" : value["iCharmValue"];
                str = index + ". " + value["sRoleName"] + "(" + charVal + ")";

                tempIndex = parseInt((index - 1) / 6);
                $($($("#rank_charm tr")[tempIndex]).find("th")[(index - 1) % 6]).html(str);
                index++;
            })
        }
    });

    var query_url2 = "http://apps.game.qq.com/fo/a20171206xcz/MeiLi.php?_a=bank&f=2" + "&_t=" + Math.random(1000000);
    jQuery.getScript(query_url2, function () {
        var str2 = "";
        var charVal2 = "";
        var tempIndex = 0;
        if (HANDSOME_RES.ret_code == 0) {
            $("#rank_handsome tr th").empty();
            var index = 1;
            $.each(HANDSOME_RES.msg.data, function (key, value) {
                charVal2 = value["iCharmValue"] == "" ? "0" : value["iCharmValue"];
                str2 = index + ". " + value["sRoleName"] + "(" + charVal2 + ")";

                tempIndex = parseInt((index - 1) / 6);
                $($($("#rank_handsome tr")[tempIndex]).find("th")[(index - 1) % 6]).html(str2);
                index++;
            })
        }
    });
}