window.onload = function(){
//引入json文件的函数
function useJson(url,fun){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function()  {
        if (this.readyState == 4 && this.status == 200) {
            json =  JSON.parse(this.responseText);
            fun();
        }
    };
    xmlhttp.open("GET", url , true);
    xmlhttp.send();
}
// 橱窗大小随着窗口变化
window.onresize = function(){
    var showcaseHeight = window.innerHeight;
    document.getElementById("showcase");
    showcase.style.height = showcaseHeight+"px";
}
var showcaseHeight = window.innerHeight;
document.getElementById("showcase");
showcase.style.height = showcaseHeight+"px";
// 获取归档json，以生成归档
useJson("./paper/index.json",function(){
    indexYear=[0];
    indexMonth=[0];
    for(a=0;a < json.index.length;a++){
        index=json.index;
        var x=index[a].year;
        var c=index[a].month;
        var e=index[a].day;
        var t=index[a].title;
        var y=1;
        var m=1;
        for(b=0;b < indexYear.length;b++){
            if(x == indexYear[b]){
                y=0;
            }
        }
        if(y==1){
            indexYear.push(x);
            indexMonth=[0];
            var archive = document.getElementById("archive")
            archive.innerHTML = archive.innerHTML + '<div class="aYear '+x+'">'+x+'年'+'</div>'
        }
        // 有相同的年份则进行判定月份
        for(z=0; z < indexMonth.length;z++){
            if(c==indexMonth[z]){
                m=0;
            }
        }
        if(m==1){
            indexMonth.push(c);
            indexDay=[0];
            var aYear = document.getElementsByClassName(x)[0];
            aYear.innerHTML = aYear.innerHTML + '<div class="aMonth '+c+'">'+c+'月'+'</div>';
        }
        // 日期+标题
        for(q=0; q < indexDay.length;q++){
            var aMonth = document.getElementsByClassName(x)[0].getElementsByClassName(c)[0];
            aMonth.innerHTML = aMonth.innerHTML + '<div class="aDay '+e+'">'+e+'日 · '+t+'</div>';
        }
    }
});
// 加载发现页部分

// 侧边栏功能
// 引入config.json完成部分页面
useJson("./page/config/config.json",function(){
    // 获取头像、昵称、主页
    userName = json.userName
    navS = json.nav
    var navMenu = document.getElementById("nav-menu");
    useJson("https://api.github.com/users/"+userName,function(){
        var sidebarAvatar = document.getElementsByClassName("sidebar-avatar")[0];
        var LoginName = document.getElementsByClassName("login")[0];
        var followGithub = document.getElementsByClassName("follow")[0];
        avatarUrl = json.avatar_url;
        login = json.login;
        // console.log(avatarUrl)
        sidebarAvatar.style.backgroundImage = "url("+avatarUrl+")";
        LoginName.innerHTML = login;
        followGithub.onclick = function(){
            window.open(json.html_url);
        }
    });
    // 导航栏可根据cfg.json文件修改
    for(a=0;a < navS.length;a++){
        navName=navS[a].name;
        navUrl=navS[a].url;
        navMenu.innerHTML += '<li><a href="'+navUrl+'">'+navName+'</a></li>';
    }
});
// 利用cookie存储token

}