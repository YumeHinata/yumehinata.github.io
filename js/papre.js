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
// 加载标题和头图
useJson("/paper/index.json",function(){

});
}
// 加载md
$(function(){
    var primaryContent;
    $.get("test.md",function(markdown){
        primaryContent = editormd.markdownToHTML("content",{
            markdown        : markdown ,//+ "\r\n" + $("#append-test").text(),
            //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
            htmlDecode      : "style,script,iframe",  // you can filter tags decode
            // toc             : true,
            tocm            : true,    // Using [TOCM]
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
    document.getElementById("table-content").style.height = window.innerHeight - 140 + 'px';
    window.onresize = function(){
        document.getElementById("table-content").style.height = window.innerHeight - 140 + 'px';
    }
});
