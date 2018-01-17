define([

], function () {
    return ['$scope', function ($scope) {
        var  tBody =document.getElementById("tBody");
        tBody.onclick =function(e){
            e = e || window.event;
            var ele = e.target || e.srcElement;
            if(ele.tagName =="A" && ele.innerHTML =="删除"){
                var id = ele.getAttribute('data-id'); //获取自定义属性值 很重要
                alert(id);
                console.log( ele.parentNode.parentNode.parentNode); //就是 <tbody  id="tBody">
                console.log(ele.parentNode.parentNode); // <tr>
                ele.parentNode.parentNode.parentNode.removeChild(ele.parentNode.parentNode);
            }
        }
    }];
});