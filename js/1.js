var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
})

var paperIndex=1;
var list = new Vue({
    el: "#list",
    data: {
        list: paperIndex,
    }
})

