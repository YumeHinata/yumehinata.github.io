window.onload = async function () {
    //引入json文件的函数
    function useJson(url, fun) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                json = JSON.parse(this.responseText);
                fun();
                return json
            }
        };
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        return json
    }
    // 加载config.json文件
    var configJson = useJson("../page/config/config.json", function () { });
    // console.log(configJson);
    configJson = useJson("https://raw.githubusercontent.com/" + configJson["userName"] + "/" + configJson["userName"] + ".github.io/main/page/config/config.json", function () { });
    // 加载index.json文件
    var indexJson = useJson("https://raw.githubusercontent.com/" + configJson["userName"] + "/" + configJson["userName"] + ".github.io/main/paper/index.json", function () { });

    // 读取cookie中token的函数
    function readToken() {
        token = "";
        s = document.cookie;
        for (i = 0; i < s.length; i++) {
            token += s[i];
            if (token == "token=") {
                token = '';
            }
        }
        return token;
    }
    // 获取头像用的函数
    async function getGitUser(fun) {
        var xmlhttp = new XMLHttpRequest();
        userName = configJson.userName;
        lowToken = configJson.lowToken;
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                gitUser = JSON.parse(this.responseText);
                fun();
            }
        }
        xmlhttp.open("GET", "https://api.github.com/users/" + userName, false);
        xmlhttp.setRequestHeader("Authorization", "token ghp_" + lowToken);
        xmlhttp.send();
        // window.gitUser = await window.gitUser;
        // return await gitUser
        // });
        // fun();
        // return gitUser
    }
    // 橱窗大小随着窗口变化
    window.onresize = function () {
        var showcaseHeight = window.innerHeight;
        let showcase = document.getElementById("showcase");
        showcase.style.height = showcaseHeight + "px";
        let sidebar = document.getElementById("sidebar");
        sidebar.style.height = showcaseHeight - 75 + "px"
        let archive = document.getElementById("archive");
        let account = document.getElementById("account");
        archive.style.height = sidebar.offsetHeight - account.offsetHeight + "px";
    }
    $("#archive").on('DOMNodeInserted', function () {
        let sidebar = document.getElementById("sidebar");
        sidebar.style.height = showcaseHeight - 75 + "px"
        let archive = document.getElementById("archive");
        let account = document.getElementById("account");
        archive.style.height = sidebar.offsetHeight - account.offsetHeight + "px";
    });
    var showcaseHeight = window.innerHeight;
    let showcase = document.getElementById("showcase");
    showcase.style.height = showcaseHeight + "px";
    let sidebar = document.getElementById("sidebar");
    sidebar.style.height = showcaseHeight - 75 + "px"
    // document.documentElement.clientWidth=window.innerWidth;
    // 获取归档json，以生成归档
        indexYear = [0];
        indexMonth = [0];
        // console.log(json.search.length)
        for (a = 0; a < json.index.length; a++) {
            let index = indexJson.index;
            // console.log(index);
            var x = index[a].year;
            var c = index[a].month;
            var e = index[a].day;
            var t = index[a].title;
            var y = 1;
            var m = 1;
            for (b = 0; b < indexYear.length; b++) {
                if (x == indexYear[b]) {
                    y = 0;
                }
            }
            if (y == 1) {
                indexYear.push(x);
                indexMonth = [0];
                var archive = document.getElementById("archive")
                archive.innerHTML = archive.innerHTML + '<div class="aYear ' + x + '">' + x + '年' + '</div>'
            }
            // 有相同的年份则进行判定月份
            for (z = 0; z < indexMonth.length; z++) {
                if (c == indexMonth[z]) {
                    m = 0;
                }
            }
            if (m == 1) {
                indexMonth.push(c);
                indexDay = [0];
                var aYear = document.getElementsByClassName(x)[0];
                aYear.innerHTML = aYear.innerHTML + '<div class="aMonth ' + c + '">' + c + '月' + '</div>';
            }
            // 日期+标题
            for (q = 0; q < indexDay.length; q++) {
                var aMonth = document.getElementsByClassName(x)[0].getElementsByClassName(c)[0];
                aMonth.innerHTML = aMonth.innerHTML + '<div class="aDay ' + e + '">' + e + '日 · ' + t + '</div>';
            }
        }
        // 歸檔完成後高度修正
    // 加载发现页部分
        var mainPaper = document.getElementById("main");
        for (i = 0; i < indexJson.index.length; i++) {
            index = indexJson.index[i];
            paperDate = "";
            if (i % 2 != 0) {
                x = "left"
            } else {
                x = "right"
            }
            paperDate = index.year + '-' + index.month + '-' + index.day;
            paperUrl = paperDate + "-" + index.paper;
            paperTitle = index.title;
            let summaryC = index.summary;
            mainPaper.innerHTML += '<div class="post ' + x + " " + paperUrl + '"><div class="post-thumb"></div><div class="post-content-wrap"><div class="post-content"><div class="post-date">' + paperDate + '</div><div class="post-title">' + paperTitle + '</div><div class="post-mate"></div><div class="float-content">' + summaryC + '</div></div><div class="beautify"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div></div>';
            thisPaper = document.getElementsByClassName(paperUrl)[0].getElementsByClassName("post-thumb")[0];
            thisPaper.style.backgroundImage = 'url(' + index.image + ')';
        }
        // 绑定点击事件
        var paperPost = document.getElementsByClassName("post");
        for (i = 0; i < paperPost.length; i++) {
            paperPost[i].onclick = function () {
                var v = "";
                openPaperUrl = this.className.match(/[0-9]|-/ig);
                for (z = 0; z < openPaperUrl.length; z++) {
                    v += openPaperUrl[z];
                    // console.log(v);
                }
                window.open("./page/paper.html?number=" + v);
            }
        }
    // 侧边栏功能
    // 引入config.json完成部分页面
    // 顺便完成网站标题和图标、欢迎词
    document.title = configJson.sideName;
    // 获取头像、昵称、主页
    var userName = configJson.userName
    var navS = configJson.nav
    var navMenu = document.getElementById("nav-menu");
    let welcome = document.getElementById("welcome");
    welcome.innerHTML = configJson.welcome;
    welcome.dataset.text = configJson.welcome;
    // useJson("https://api.github.com/users/"+userName,function(){
    let githubUser = getGitUser(function () {
        var sidebarAvatar = document.getElementsByClassName("sidebar-avatar")[0];
        var LoginName = document.getElementsByClassName("login")[0];
        var followGithub = document.getElementsByClassName("follow")[0];
        avatarUrl = gitUser.avatar_url;
        login = gitUser.login;
        // console.log(avatarUrl)
        sidebarAvatar.style.backgroundImage = "url(" + avatarUrl + ")";
        LoginName.innerHTML = login;
        followGithub.onclick = function () {
            window.open(gitUser.html_url);
        }
    });
    // 导航栏可根据cfg.json文件修改
    for (a = 0; a < navS.length; a++) {
        var navName = navS[a].name;
        var navUrl = navS[a].url;
        navMenu.innerHTML += '<li' + ' data-text=' + navName + '><a href="' + navUrl + '">' + navName + '</a></li>';
    }
    var navli = document.getElementsByTagName("li");
    for (i = 0; i < navli.length; i++) {
        navli[i].onclick = function () {
            // var v = "";
            // openPaperUrl = this.className.match(/[0-9]|-/ig);
            // navName=navS[i].name;
            nUrl = this.getElementsByTagName("a")[0].href;
            // console.log(nUrl);
            // console.log(a);
            window.open(nUrl);
        }
    }

    // 利用cookie存储token
    var userToken = document.getElementsByClassName("token")[0];
    if (document.cookie != null && document.cookie != '' && document.cookie != "token=") {
        userToken.placeholder = "已经接收到token喽(*^▽^*)";
    }
    userToken.onblur = function () {
        if (userToken.value != "") {
            document.cookie = "token=" + userToken.value + ";expires=Mon, 01 Jan 2035 00:00:00 UTC;path=/";
            userToken.placeholder = "已经接收到token喽(*^▽^*)";
            userToken.value = "";
        } else {
            userToken.placeholder = "!!!∑(ﾟДﾟノ)ノ输入的好像不对"
        }
    }
    // input获取焦点如有cookie则value是token
    userToken.onfocus = function () {
        if (document.cookie != null && document.cookie != '' && document.cookie != "token=") {
            userToken.value = readToken();
        }
    }
    // 导航栏显示
    var body = document.body;
    body.onscroll = function (event) {
        if (document.documentElement.scrollTop != 0) {
            document.getElementById("navigate").style.backgroundColor = "#fff";
            document.getElementById("navigate").style.boxShadow = '0 0 25px rgb(137, 137, 137)';
            for (i = 0; i < document.getElementById("nav-menu").getElementsByTagName("a").length; i++) {
                document.getElementById("nav-menu").getElementsByTagName("a")[i].style.color = "rgb(142, 142, 142)";
            }
            document.getElementById("nav-container").style.left = 0;
        } else {
            document.getElementById("navigate").style = "";
            for (i = 0; i < document.getElementById("nav-menu").getElementsByTagName("a").length; i++) {
                document.getElementById("nav-menu").getElementsByTagName("a")[i].style = "";
            }
            document.getElementById("nav-container").style = "";
        }
    }
    // 点击下降到发现页
    var downBtn = document.getElementsByClassName("down")[0];
    downBtn.onclick = function () {
        var pos = document.documentElement.scrollTop + 1;
        var id = setInterval(function () {
            if (pos >= window.innerHeight - 75) {
                clearInterval(id);
            } else {
                pos *= 1.05;
                document.documentElement.scrollTop = pos;
            }
        }, 1);
    }
    // 进入管理页
    let manage = document.getElementsByClassName("enter")[0];
    manage.onclick = function () {
        window.open("./page/manage.html")
    }
}