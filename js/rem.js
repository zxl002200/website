
(function(win, doc) {
    //浏览器缩放时
    win.onresize = function() {
        change();
    };
    change();
    function change() {
        var oFs = doc.documentElement.clientWidth / (640 / 20);
        //设置根目录字体大小
        doc.documentElement.style.fontSize = oFs + 'px';
    }
})(window, document);