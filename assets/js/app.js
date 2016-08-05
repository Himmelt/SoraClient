/**
 * Created by Kami on 2016/4/30.
 */
//初始化foundation
$(document).foundation();

//引入相关组件
var config = require('./js/config').config,
    himsql = require('./js/himsql'),
    minemc = require('./js/minemc'),
    cipher = require('./js/cipher'),
//定义DOM节点
    loginbox = $('#loginbox'), username = $('#username'), userlist = $('#userlist'), password = $('#password'),
    mcbutton = $('#mcbutton'), gamemode = document.querySelector('#gamemode'), keeppswd = document.querySelector('#keeppswd'),
//定义DOM事件
    launchmc = function () {
        loginbox.removeClass('expand');
        savelist();
        savemode();
        config.save(function () {
            loadlist();
        });
        loginreq();
    },
    expanded = function () {
        loginbox.addClass('expand');
    },
    collapse = function (event) {
        if (event.type == 'click') {
            var target = $(event.target);
            if (target.is('li')) {
                //设置选择的用户名和密码
                username.val(config.userlist[target.data('user') - 0].username);
                password.val(cipher.decrypt(config.userlist[target.data('user') - 0].password));
                loginbox.removeClass('expand');
            }
            else if (target.is('a') || target.is('i')) {
                for (var i = target.closest('li').data('user') - 0; i < config.userlist.length - 1; i++) {
                    config.userlist[i].username = config.userlist[i + 1].username;
                    config.userlist[i].password = config.userlist[i + 1].password;
                }
                config.userlist.pop();
                loadlist();
                username.focus();
            }
        }
        else {
            loginbox.removeClass('expand');
        }
    },
//定义DOM监听
    listener = function () {
        username.bind('click', expanded);
        username.bind('blur', collapse);
        username.bind('input', collapse);
        userlist.bind('click', collapse);
        mcbutton.bind('click', launchmc);
        userlist.bind('mouseover', function () {
            username.unbind('blur', collapse);
        });
        userlist.bind('mouseout', function () {
            username.bind('blur', collapse);
        });
    },
//定义处理事件
    loadlist = function () {
        userlist.html("");
        if (config.userlist.length) {
            username.val(config.userlist[config.userlist.length - 1].username);
            password.val(cipher.decrypt(config.userlist[config.userlist.length - 1].password));
            for (var i = 0; i < config.userlist.length; i++) {
                userlist.html(userlist.html() + '<li data-user="' + i +
                    '">' + config.userlist[i].username + '<a><i class="fa fa-minus-circle"></i></a></li>');
            }
        }
    },
    loadmode = function () {
        gamemode.checked = config.gamemode;
        keeppswd.checked = config.keeppswd;
    },
    savelist = function () {
        for (var i = 0; i < config.userlist.length; i++) {
            if (config.userlist[i].username == username.val()) {
                for (; i < config.userlist.length - 1; i++) {
                    config.userlist[i].username = config.userlist[i + 1].username;
                    config.userlist[i].password = config.userlist[i + 1].password;
                }
                config.userlist[i].username = username.val();
                config.userlist[i].password = cipher.encrypt(password.val());
                return;
            }
        }
        if (username.val() == "") {
            alert("傻X,连ID都不填还玩个毛线!!");
        } else {
            var current = {username: "", password: ""};
            current.username = username.val();
            current.password = cipher.encrypt(password.val());
            config.userlist.push(current);
        }
    },
    savemode = function () {
        config.gamemode = gamemode.checked;
        config.keeppswd = keeppswd.checked;
    },
    loginreq = function () {
        var options = {
            host: '127.0.0.1',
            port: 8080,
            path: '/?signs=in&mac=123&user=' + username.val() + '&pswd=' +
            cipher.md5(password.val(), username.val())
        };
        himsql.request(options, function (data) {
            var datas = data.split(':');
            switch (datas[0]) {
                case 'S':
                    minemc.launch(username.val(), '1.7.10', '1024', datas[1]);
                    break;
                case 'F':
                    switch (datas[1]) {
                        case 'E0' :
                            alert("啊嘞,服务器娘罢工了,过一会儿再来试试吧!Σ( ° △ °|||)︴");
                            break;
                        case 'E1':
                            alert("这台电脑由于某些原因被封杀了");
                            break;
                        case 'E2':
                            alert("这个ID已经被封了,如果你不明白为什么请联系管理.");
                            break;
                        case 'E3':
                            alert("笨蛋,密码输错了!");
                            break;
                        case 'E4':
                            alert("这个账号还没有注册过呦!");
                            break;
                    }
                    break;
            }
        });
    },
    regitreq = function () {
        var options = {
            host: '127.0.0.1',
            port: 8080,
            path: '/?signs=up&mac=123&user=' + username.val() + '&pswd=' +
            cipher.md5(password.val(), username.val()) + '&email=mmm'
        };
        himsql.request(options, function (data) {
            console.log("callback data", data);
        });
    };
//执行处理事件
config.load(function () {
    loadlist();
    loadmode();
});
//执行DOM监听
listener();