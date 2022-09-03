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
            indexYear.push(x)
            indexMonth=[0];
            var archive = document.getElementById("archive")
            // console.log(archive)
            archive.innerHTML = archive.innerHTML + '<div class="aYear '+x+'">'+x+'年'+'</div>'
        }
        // 有相同的年份则进行判定月份
        for(z=0; z < indexMonth.length;z++){
            if(c==indexMonth[z]){
                m=0;
            }
        }
        if(m==1){
            indexMonth.push(c)
            indexDay=[0];
            var aYear = document.getElementsByClassName(x)[0]
            // console.log(aYear)
            aYear.innerHTML = aYear.innerHTML + '<div class="aMonth '+c+'">'+c+'月'+'</div>'
        }
        // 日期+标题
        for(q=0; q < indexDay.length;q++){
            var aMonth = document.getElementsByClassName(x)[0].getElementsByClassName(c)[0];
            // console.log(aYear)
            aMonth.innerHTML = aMonth.innerHTML + '<div class="aDay '+e+'">'+e+'日·'+t+'</div>'
        }
    }
});

