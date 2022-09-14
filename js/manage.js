import { Octokit, App } from "https://cdn.skypack.dev/octokit";
window.onload = function(){
//引入json文件的函数
function useJson(url,fun){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function()  {
        if (this.readyState == 4 && this.status == 200) {
            window.json =  JSON.parse(this.responseText);
            fun();
        }
    };
    xmlhttp.open("GET", url , false);
    xmlhttp.send();
}
// 读取cookie中token的函数
function readToken(){
    let token="";
    let s = document.cookie;
    for(let i=0;i<s.length;i++){
      token += s[i];
      if(token=="token="){
        token='';
      }
    }
    return token;
}
// 创建或更新文件内容的函数
function octokitPush(tk,pt,sa,ct){
    var octokit = new Octokit({
        auth: tk
    });
    useJson("./config/config.json",function(){
        let name = window.json.userName;
        octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: name,
            repo: json.userName + '.github.io',
            path: pt,
            message: 'a new commit message',
            committer: {
                name: json.userName,
                email: ''
            },
            content: ct,
            sha: sa
        })
    });
}
// 读取文件信息的函数
function octokitGet(tk,pt){
    // var oGet;
    const octokit = new Octokit({
        auth: tk
    });
    useJson("./config/config.json",function(){
        window.out = octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: json.userName,
            repo: json.userName+".github.io",
            path: pt
        });
    });
    return window.out
}
// 改变markdown大小
let main = document.getElementById("main");
main.style.width = window.innerWidth - 200 + "px";
main.style.height = window.innerHeight + "px";
window.onresize = function(){
    let main = document.getElementById("main");
    let writing = document.getElementById("writing");
    main.style.width = window.innerWidth - 200 + "px";
    main.style.height = window.innerHeight + "px";
    writing.style.height = window.innerHeight + "px";
}
// 新建博客
var testEditor;
var xNewMd = "./config/new.md";
$(function() {          
    $.get(xNewMd, function(md){
        testEditor = editormd("writing", {
            // width: "90%",
            height: 740,
            path : '../editormd/lib/',
            theme : "dark",
            previewTheme : "dark",
            editorTheme : "pastel-on-dark",
            markdown : md,
            codeFold : true,
            //syncScrolling : false,
            saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
            searchReplace : true,
            //watch : false,                // 关闭实时预览
            htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启    
            //toolbar  : false,             //关闭工具栏
            //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
            emoji : true,
            taskList : true,
            tocm : true,         // Using [TOCM]
            tex : true,                   // 开启科学公式TeX语言支持，默认关闭
            flowChart : true,             // 开启流程图支持，默认关闭
            sequenceDiagram : true,       // 开启时序/序列图支持，默认关闭,
            //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
            //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
            //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
            //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
            //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
            imageUpload : false,
            imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL : "./php/upload.php",
            onload : function() {
                console.log('onload', this);
                //this.fullscreen();
                //this.unwatch();
                //this.watch().fullscreen();
                //this.setMarkdown("#PHP");
                //this.width("100%");
                //this.height(480);
                //this.resize("100%", 640);
            }
        });
    });
});
// 提交功能的实现
let commit = document.getElementById("commit");
commit.onclick = function(){
    let nweContent = document.getElementsByClassName("editormd-markdown-textarea")[0].innerHTML;
    var gToken = readToken();
    var d = new Date();
    let newPath = "paper/" + d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate() + "/" + "1.md";
    // octokitPush(gToken,newPath,"","1111111");
    let qq = octokitGet(gToken,"paper/index.json");
    console.log(gToken+',这是一次提交，'+nweContent+","+newPath);
    console.log(qq);
}
}