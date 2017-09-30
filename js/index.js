// var swiperIndex = sessionStorage.getItem('swiperIndex') ? sessionStorage.getItem('swiperIndex') : 0,
//             initSwiper = {
//                 direction: 'vertical',
//                 initialSlide: swiperIndex,
//                 mousewheelControl: true,
//                 speed:400,
//                 mode : 'vertical',
//                 resistance:'100%',
//                 loop:false,
//                 grabCursor: true,
//                 pagination: '.pagination',
//                 paginationClickable: true,
//                 // 切换页面成功之前的回调
//                 onSlideChangeStart: function (swiper) {
//                     sessionStorage.setItem('swiperIndex', swiper.activeIndex);
//                 }
//             };
//     var swiperFather = new Swiper('.swiper-container-father', initSwiper);
//     var swiperSon = new Swiper('.swiper-container-son', {
//         autoplay: 2000,
//         loop: true,
//     });
//
//
//
//
//     var mySwiper3 = new Swiper('#swiper-container3',{
//            onSlideChangeStart: function(){
//             updateNavPosition()
//            }
//
// })
//
// function updateNavPosition(){
//         $('#swiper-container2 .active-nav').removeClass('active-nav')
//         var activeNav = $('#swiper-container2 .swiper-slide').eq(mySwiper3.activeIndex).addClass('active-nav');
//
//
//         if (!activeNav.hasClass('swiper-slide-visible')) {
// console.log(1);
//             if (activeNav.index()>mySwiper2.activeIndex) {
// console.log(2);
//                 var thumbsPerNav = Math.floor(mySwiper2.width/activeNav.width())-1
//                 mySwiper2.slideTo(activeNav.index()-thumbsPerNav)
//             }
//             else {
// console.log(3);
//                 mySwiper2.slideTo(activeNav.index())
//             }
//         }
//     }
// var swiperIndex = sessionStorage.getItem('swiperIndex') ? sessionStorage.getItem('swiperIndex') : 0,
//     initSwiper = {
//         direction: 'vertical',
//         initialSlide: swiperIndex,
// //                mousewheelControl: true,
//         speed: 400,
//         mode: 'vertical',
//         resistance: '100%',
//         loop: false,
//         grabCursor: true,
// //                pagination: '.pagination',
// //                paginationClickable: true,
//         watchSlidesVisibility: true,
//         // 切换页面成功之前的回调
//         onSlideChangeStart: function (swiper) {
//             sessionStorage.setItem('swiperIndex', swiper.activeIndex);
//         }
//     };
// var swiperFather = new Swiper('.swiper-container-father', initSwiper);
// var swiperSon = new Swiper('.swiper-container-son', {
//     autoplay: 3000,
//     loop: true,
//     pagination: '.swiper-pagination',
//     paginationClickable: true,
// });
//创建和初始化地图函数：
function initMap() {
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    addMarker();//向地图中添加marker
}

//创建地图函数：
function createMap() {
    var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
    var point = new BMap.Point(116.294011, 39.939353);//定义一个中心点坐标
    map.centerAndZoom(point, 17);//设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent() {
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl() {
    //向地图中添加缩放控件
    var ctrl_nav = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE});
    map.addControl(ctrl_nav);
    //向地图中添加缩略图控件
    var ctrl_ove = new BMap.OverviewMapControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1});
    map.addControl(ctrl_ove);
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
    map.addControl(ctrl_sca);
}

//标注点数组
var markerArr = [{
    title: "我的位置",
    content: "我的备注",
    point: "116.294011|39.939353",
    isOpen: 0,
    icon: {w: 21, h: 21, l: 0, t: 0, x: 6, lb: 5}
}
];
//创建marker
function addMarker() {
    for (var i = 0; i < markerArr.length; i++) {
        var json = markerArr[i];
        var p0 = json.point.split("|")[0];
        var p1 = json.point.split("|")[1];
        var point = new BMap.Point(p0, p1);
        var iconImg = createIcon(json.icon);
        var marker = new BMap.Marker(point, {icon: iconImg});
        var iw = createInfoWindow(i);
        var label = new BMap.Label(json.title, {"offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20)});
        marker.setLabel(label);
        map.addOverlay(marker);
        label.setStyle({
            borderColor: "#808080",
            color: "#333",
            cursor: "pointer"
        });

        (function () {
            var index = i;
            var _iw = createInfoWindow(i);
            var _marker = marker;
            _marker.addEventListener("click", function () {
                this.openInfoWindow(_iw);
            });
            _iw.addEventListener("open", function () {
                _marker.getLabel().hide();
            });
            _iw.addEventListener("close", function () {
                _marker.getLabel().show();
            });
            label.addEventListener("click", function () {
                _marker.openInfoWindow(_iw);
            });
            if (!!json.isOpen) {
                label.hide();
                _marker.openInfoWindow(_iw);
            }
        })()
    }
}
//创建InfoWindow
function createInfoWindow(i) {
    var json = markerArr[i];
    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>" + json.content + "</div>");
    return iw;
}
//创建一个Icon
function createIcon(json) {
    var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w, json.h), {
        imageOffset: new BMap.Size(-json.l, -json.t),
        infoWindowOffset: new BMap.Size(json.lb + 5, 1),
        offset: new BMap.Size(json.x, json.h)
    });
    return icon;
}

initMap();//创建和初始化地图

$(".fater").hover(function () {
    $(".son").css("display", "block");
    $(".xila").css({"border-bottom": " 3px solid rgba(0,184,252,1)", "color": "rgba(0,184,252,1)"})
}, function () {
    $(".son").css("display", "none");
    $(".xila").css({"border-bottom": " none", "color": "white"})
});
var click_a = $(".click_a");
var height = $(".fenye").eq(j).height();

var index;
var key;
var _obj = {};
for (var i = 0; i < click_a.length; i++) {
    var j = i;
    (function (j) {
        click_a[j].onclick = function () {
            index = j;
            var height = $(".fenye").eq(j).height();
            var num = $(".fenye").eq(j).index();
            if (num == Number($(".fenye").eq(j).attr('value'))) {
                $(".home").css({
                    "transform": "translate3d(0px, " + -height * index + "px, 0px)",
                    "transition-duration": "400ms"
                });
                $(".son").css("display", "none");
                return index;
            } else {
                alert("错误的")
            }
        };
        $('.fenye').eq(j).bind('mousewheel', function (event, delta) {
            if (delta == -1) {
                index += 1;
                if (index >= $(".fenye").length - 1) {
                    index = $(".fenye").length - 1;
                }
            } else {
                index -= 1;
                if (index <= 0) {
                    index = 0
                }
            }
            var height = $(".fenye").height();
            $(".home").css({
                "transform": "translate3d(0px, " + -height * index + "px, 0px)",
                "transition-duration": "400ms"
            });
            console.log("key----" + index);
            return false;
        });

    })(i);
}
if (index == undefined) {
    index = 0;
} else {
    index = index;
}