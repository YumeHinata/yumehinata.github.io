import { Octokit, App } from "https://cdn.skypack.dev/octokit";
window.onload = function () {
    //引入json文件的函数
    function useJson(url, fun) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                window.json = JSON.parse(this.responseText);
                fun();
                return window.json
            }
        };
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        return window.json
    }
    // 读取cookie中token的函数
    function readToken() {
        let token = "";
        let s = document.cookie;
        for (let i = 0; i < s.length; i++) {
            token += s[i];
            if (token == "token=") {
                token = '';
            }
        }
        return token;
    }
    // 创建或更新文件内容的函数
    function octokitPush(tk, pt, em, sa, ct) {
        var octokit = new Octokit({
            auth: tk
        });
        useJson("./config/config.json", function () {
            let name = window.json.userName;
            octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                owner: name,
                repo: json.userName + '.github.io',
                path: pt,
                message: 'a new commit message',
                committer: {
                    name: json.userName,
                    email: em
                },
                content: ct,
                sha: sa
            })
        });
    }
    // 读取文件信息的函数
    async function octokitGet(tk, pt) {
        // var oGet;
        const octokit = new Octokit({
            auth: tk
        });
        useJson("./config/config.json", function () {
            window.out = octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: json.userName,
                repo: json.userName + ".github.io",
                path: pt
            });
        });
        function res() {
            return window.out.then((rs) => { return rs })
        }
        let result = await res();
        return result.data;
    }
    // 字符串转base64的函数
    function turnBase64(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }
    // 图片上传github
    async function pushImage(pcc) {
        // 获取图片目录
        let imgSearch = useJson("../img/index.json", function () { }).search;
        // 判断新图片的路径
        let d = new Date;
        var Y = "" + (d.getFullYear());
        var M = "" + (d.getMonth() + 1);
        var D = "" + (d.getDate());
        // console.log(M.length)
        if (M.length < 2) {
            M = "" + "0" + M;
        }
        if (D.length < 2) {
            D = "" + "0" + D;
        }
        // console.log(Y)

        // var imgNum;
        let i = 1;
        let fileType = document.getElementById("cover").style.backgroundImage.match(/(image\/(\S*);)/)[2];
        if (fileType == "jpeg") {
            fileType = "jpg";
        }
        while (1) {
            // i++;
            var imgNum = "" + i;
            try {
                let x = imgSearch[Y][M][D][i];
                if (((typeof x) != undefined) && ((typeof x) != "undefined")) {
                    i++
                }else{
                    break
                }
            } catch {
                break
            }
            // console(i);
        }
        var imgPath = "img/" + Y + "/" + M + "/" + D + "/" + imgNum + "." + fileType;
        // 写入indexjson的内容
        if (imgSearch[Y] == undefined) {
            imgSearch[Y] = {
                [M]: {
                    [D]: {
                        [imgNum]: {
                            "path": imgPath,
                            "url": window.location.origin + "/" + imgPath
                        }
                    }
                }
            }
        }
        else if (imgSearch[Y][M] == undefined) {
            imgSearch[Y][M] = {
                [D]: {
                    [imgNum]: {
                        "path": imgPath,
                        "url": window.location.origin + "/" + imgPath
                    }
                }
            }
        } else if (imgSearch[Y][M][D] == undefined) {
            imgSearch[Y][M][D] = {
                [imgNum]: {
                    "path": imgPath,
                    "url": window.location.origin + "/" + imgPath
                }
            }
        } else if (imgSearch[Y][M][D][imgNum] == undefined) {
            imgSearch[Y][M][D][imgNum] = {
                "path": imgPath,
                "url": window.location.origin + "/" + imgPath
            }
        }
        let search = imgSearch;
        let imgJsonContent = {
            search
        }
        let imgIndexContent = JSON.stringify(imgJsonContent);
        let pushImgIndexContent = turnBase64(imgIndexContent);
        // 获取token
        let token = readToken();
        // 获取图片目录sha
        let imgIndexSha = await octokitGet(token, "img/index.json");
        // 上传目录
        octokitPush(token, "img/index.json", "3099729829@qq.com", imgIndexSha.sha, pushImgIndexContent);
        // console.log(imgIndexSha.sha);
        // 上传图片
        octokitPush(token, imgPath, "3099729829@qq.com", "", pcc);
        // console.log(pcc)
        return imgPath
    }
    // 新建博客
    var testEditor;
    var xNewMd = "./config/new.md";
    $(function () {
        $.get(xNewMd, function (md) {
            testEditor = editormd("writing", {
                // width: "90%",
                height: 740,
                path: '../editormd/lib/',
                theme: "dark",
                previewTheme: "dark",
                editorTheme: "pastel-on-dark",
                markdown: md,
                codeFold: true,
                //syncScrolling : false,
                saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
                searchReplace: true,
                //watch : false,                // 关闭实时预览
                htmlDecode: "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启    
                //toolbar  : false,             //关闭工具栏
                //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
                emoji: true,
                taskList: true,
                tocm: true,         // Using [TOCM]
                tex: true,                   // 开启科学公式TeX语言支持，默认关闭
                flowChart: true,             // 开启流程图支持，默认关闭
                sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
                //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
                //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
                //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
                //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
                //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
                imageUpload: false,
                imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                imageUploadURL: "./php/upload.php",
                onload: function () {
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
            var pushE = document.getElementById("push");
            var writingE = document.getElementById("writing");
            writingE.style.height = window.innerHeight - 2 + "px";
            writingE.style.width = main.offsetWidth - 270 + "px";
            pushE.style.height = window.innerHeight + "px";
            // 加载默认摘要内容，摘要默认为文章前30字+省略号
            var writingText = document.getElementsByClassName("editormd-markdown-textarea")[0];
            var summary = document.getElementsByClassName("summary")[0];
            // console.log(writingText);
            var ThereAreText = 0;
            summary.onfocus = function () {
                // console.log(ThereAreText)
                summary.onchange = function () {
                    // 判断人工输入
                    ThereAreText = 1;
                    // console.log(ThereAreText)
                }
            }
            $(".editormd-markdown-textarea").on('DOMNodeInserted', function () {
                let text = writingText.innerHTML;
                // console.log(text);
                if ((summary.value.length < 30) && (ThereAreText == 0)) {
                    summary.value = text;
                }
            });
        });
    });
    // 改变markdown大小
    let main = document.getElementById("main");
    main.style.width = window.innerWidth - 200 + "px";
    main.style.height = window.innerHeight + "px";
    window.onresize = function () {
        let main = document.getElementById("main");
        let writing = document.getElementById("writing");
        var pushE = document.getElementById("push");
        var writingE = document.getElementById("writing");
        main.style.width = window.innerWidth - 200 + "px";
        main.style.height = window.innerHeight + "px";
        writing.style.height = window.innerHeight - 2 + "px";
        pushE.style.height = window.innerHeight + "px"
        writingE.style.width = main.offsetWidth - pushE.offsetWidth + "px"
    }
    // 封面加载功能
    var coverFile = document.getElementById("coverFile");
    var cover = document.getElementById("cover");
    var reader = new FileReader();
    coverFile.onchange = function () {
        var coverImgFile = this.files[0];
        reader.readAsDataURL(coverImgFile);
        reader.onload = function () {
            // console.log(this.result);
            cover.style.backgroundImage = "url(" + this.result + ")";
        }
    }
    // 加载默认作者
    var authorE = document.getElementById("author");
    useJson("../page/config/config.json", function () {
        authorE.value = json.userName;
    });
    // 提交功能的实现
    let commit = document.getElementById("commit");
    commit.onclick = async function () {
        // 判断标题和正文是否为空，为空则禁止上传
        let nweContent = document.getElementsByClassName("editormd-markdown-textarea")[0].innerHTML;
        let NewTitle = document.getElementById("newTitle").value;
        if ((nweContent.length == 0) || (NewTitle.length == 0)) {
            let showConsole = document.getElementById("console");
            showConsole.innerHTML = "标题或正文不得为空";
            setTimeout(function () { showConsole.innerHTML = '' }, "3000");
        } else {
            // console.log(qq);
            // console.log(String.fromCharCode(ascii));
            var gToken = readToken();
            var d = new Date();
            var Year = d.getFullYear();
            if (("" + d.getMonth()).length < 2) {
                Month = d.getMonth() + 1;
                var Month = "" + "0" + Month;
            } else {
                var Month = d.getMonth() + 1;
            }

            if ("" + (d.getDate()).length < 2) {
                var Day = "" + "0" + d.getDate();
            } else {
                var Day = d.getDate();
            }
            let newDate = Year + "/" + Month + "/" + Day;
            // console.log(newDate);
            // 判断第几篇文章
            var indexJson = await useJson("../paper/index.json", function () { });
            var i = 1;
            while (1) {
                // i++;
                var paperNum = "" + i;
                // let x = indexJson.search[Year][Month][Day][paperNum]
                // console.log(x[i])
                try {
                    let x = indexJson.search[Year][Month][Day][paperNum];
                    if (((typeof x) != undefined) && ((typeof x) != "undefined")) {
                        // break
                        i++
                    }else{
                        break
                    }
                    // console.log(x);
                    // break
                } catch {
                    // console.log(i)
                    break
                }
                // if(indexJson.search[Year][Month][Day][paperNum]==undefined){
                //     break
                // }
            }
            // let NewTitle = document.getElementById("newTitle").value;
            // 获取已经添加到封面内容
            var pushCoverContent = "";
            try {
                let CoverContent = cover.style.backgroundImage;
                pushCoverContent = CoverContent.match(/(base64,(\S*)"\))/)[2];
                // console.log(CoverContent +"!!!"+pushCoverContent);
            } catch {
            }
            // 获取摘要
            var summary = document.getElementById("summary");
            var pushSummary = summary.value;
            // 判断上一次提交是否完成
            var newPath = "paper/" + newDate + "/" + paperNum + ".md"
            try {
                // 判断path是否存在，不存在则是一个新的提交，存在则说明上次提交未完成
                // console.log(newPath);
                var oldOctGet = await octokitGet(gToken, newPath);
                // console.log(oldOctGet)
                let showConsole = document.getElementById("console");
                showConsole.innerHTML = "上次提交尚未完成，请稍后再试";
                setTimeout(function () { showConsole.innerHTML = '' }, "3000");
            } catch {
                // console.log("1")
                // 判断封面是否存在，标题和内容是否存在，上一次提交是否完成，决定是否调用上传封面函数
                if (pushCoverContent == "") {
                    var coverUrl = "";
                } else {
                    var coverUrl = "../" + await pushImage(pushCoverContent);
                }
                // 获取作者
                let authorC = document.getElementById("author").value;
                // 读取并写入index.json
                let NewTitle = document.getElementById("newTitle").value;
                let pushObj = { "year": Year, "month": Month, "day": Day, "paper": paperNum, "title": NewTitle, "image": coverUrl ,"summary": pushSummary };
                let indexIndex = indexJson.index;
                indexIndex.push(pushObj);
                let index = indexIndex;
                let indexSearch = indexJson.search;
                if (indexSearch[Year] == undefined) {
                    indexSearch[Year] = {
                        [Month]: {
                            [Day]: {
                                [paperNum]: {
                                    "title": NewTitle,
                                    "image": coverUrl,
                                    "author": authorC
                                }
                            }
                        }
                    }
                } else if (indexSearch[Year][Month] == undefined) {
                    indexSearch[Year][Month] = {
                        [Day]: {
                            [paperNum]: {
                                "title": NewTitle,
                                "image": coverUrl,
                                "author": authorC
                            }
                        }
                    }
                } else if (indexSearch[Year][Month][Day] == undefined) {
                    indexSearch[Year][Month][Day] = {
                        [paperNum]: {
                            "title": NewTitle,
                            "image": coverUrl,
                            "author": authorC
                        }
                    }
                } else if (indexSearch[Year][Month][Day][paperNum] == undefined) {
                    indexSearch[Year][Month][Day][paperNum] = {
                        "title": NewTitle,
                        "image": coverUrl,
                        "author": authorC
                    }
                }
                // 下面是上傳內容
                let search = indexSearch;
                let indexContent = {
                    index,
                    search
                }
                indexContent = JSON.stringify(indexContent);
                // console.log()
                // console.log(indexContent);

                // console.error(err);
                // 获取并修改目录
                let octGet = await octokitGet(gToken, "paper/index.json");
                // console.log(octGet.sha);
                // console.log(indexContent);
                let pushIndexContent = turnBase64(indexContent);
                octokitPush(gToken, "paper/index.json", "3099729829@qq.com", octGet.sha, pushIndexContent);
                // 写入新的文章
                let newPath = "paper/" + newDate + "/" + paperNum + ".md"
                let pushContent = turnBase64(nweContent);
                octokitPush(gToken, newPath, "3099729829@qq.com", "", pushContent);
            }
        }
    }
}