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