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
// 完成导航栏
useJson("/page/config/config.json",function(){
    navS = json.nav;
    navMenu = document.getElementById("nav-menu")
    for(a=0;a < navS.length;a++){
        navName=navS[a].name;
        navUrl=navS[a].url;
        navMenu.innerHTML += '<li><a href="'+navUrl+'">'+navName+'</a></li>';
    }
});
// 加载标题、头图、作者头像
useJson("/paper/index.json",function(){
    var search = json.search;
    var sHref = window.location.search;
    var Year="";
    var Month="";
    var Day="";
    var Paper=""
    if(sHref.search("&")==-1){
        var num = sHref.match(/(number=(\S*))/)[2];
    }else{
        var num = sHref.match(/(number=(\S*)&)/)[2];
    }
    q="";
    w="";
    e="";
    for(i=0;i< num.length;i++){
        q += num[i];
        if(num[i]=="-"){
            Year=q;
            num = num.replace(Year,"")
            // q="";
            for(z=0;z<num.length;z++){
                w += num[z];
                if(num[z]=="-"){
                    Month=w;
                    num = num.replace(Month,"")
                    for(x=0;x<num.length;x++){
                        e += num[x];
                        if(num[x]=="-"){
                            Day=e;
                            num = num.replace(Day,"")
                            Paper=num;
                            Day = Day.replace(/-/g,'');
                            Month = Month.replace(/-/g,'');
                            Year = Year.replace(/-/g,'');
                        }
                    }
                }
            }
        }
    }
    search=search[Year][Month][Day][Paper];
    document.title=search.title;
    document.getElementsByClassName("pattern-title")[0].innerHTML=search.title;
    document.getElementsByClassName("pattern-attachment")[0].style.backgroundImage = "url(" + search.image +")";
    // 通过作者名加载头像
    useJson("https://api.github.com/users/"+search.author,function(){
        var avatar = json.avatar_url;
        document.getElementsByClassName("pattern-avatar")[0].style.backgroundImage="url("+avatar+")";
    });
});
}
// 加载md
var sNumber = window.location.search
if(sNumber.search("&")==-1){
    var sNumber = sNumber.match(/(number=(\S*))/)[2];
}else{
    var sNumber = sNumber.match(/(number=(\S*)&)/)[2];
}
sNumber = sNumber.replace(/-/g,"/");
var sHref = window.location.origin + "/paper/" + sNumber + ".md";
// console.log(sHref);
$(function(){
    var primaryContent;
    $.get(sHref,function(markdown){
        primaryContent = editormd.markdownToHTML("content",{
            markdown        : markdown ,//+ "\r\n" + $("#append-test").text(),
            //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
            htmlDecode      : "style,script,iframe",  // you can filter tags decode
            // toc             : true,
            // tocm            : true,    // Using [TOCM]
            tocContainer    : "#table-content", // 自定义 ToC 容器层
            //gfm             : false,
            // tocDropdown     : true,
            // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
            emoji           : true,
            taskList        : true,
            tex             : true,  // 默认不解析
            flowChart       : true,  // 默认不解析
            sequenceDiagram : true,  // 默认不解析
        });
    });
    // 设置toc高度
    // document.getElementById("table-content").style.height = window.innerHeight - 140 + 'px';
    // window.onresize = function(){
    //     document.getElementById("table-content").style.height = window.innerHeight - 140 + 'px';
    // }

});
