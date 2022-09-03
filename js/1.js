// window.onload = function(){
    var app = new Vue({
        el: '#app',
        data: {
          message: 'Hello Vue!'
        }
    })
    // Octokit.js
    // https://github.com/octokit/core.js#readme
    // 
// }


// var btn = document.getElementById("bt");
//     btn.onclick = function(){
//         console.log("hhhhh")
//         const octokit = new Octokit({
//             auth: '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'
//         })
//         octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
//             owner: 'yumehinata',
//             repo: 'yumehinata.github.io',
//                 path: 'paper/index4.json',
//                 message: 'a new commit message',
//                 committer: {
//                     name: 'Yume',
//                     email: '3099729829@qq.com'
//                 },
//             content: 'bXkgdXBkYXRlZCBmaWxlIGNvbnRlbnRz',
//             sha: '95b966ae1c166bd92f8ae7d1c313e738c731dfc3'
//         })
// }
// 读取json文件
// import indexJson from '../paper/index.json';
// var xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = function()  {
//     if (this.readyState == 4 && this.status == 200) {
//         myObj =  JSON.parse(this.responseText);
//         myObj = myObj.index
//         // console.log(myObj);
//         aYearContent = myObj[0].year
//         aMonthContent = myObj[0].month
//         aDayContent = myObj[0].day
//         aTitleContent = myObj[0].title
//         // console.log(aMonthContent)
//         archive = new Vue({
//             el: '.aYear',
//             data: {
//                 aYear: aYearContent,
//                 aMonth: aMonthContent,
//                 aDay: aDayContent + "." + aTitleContent,
//             }
//         })
//     }
// };
// xmlhttp.open("GET", "./paper/index.json", true);
// xmlhttp.send();
// var indexJson = JSON.parse(iJson);
