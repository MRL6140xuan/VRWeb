/**
 * Created by mrl on 2017/6/5.
 */

var size_el = $('#size');
var download_btn_el = $('#download_btn');
var val;//@val:获取下载按钮父元素的高度来动态的设置margin-top
var currentRes;//当前资源对象
var resId, resTypeId;//获取url的两个参数（id和typeId）
/*
 * 初始化页面布局*/
function init() {
    var el = $('.col-xs-4');

    $('#img-test').css('height', $('#img-test').width());
    $('.same-height').css("height", el.height());
    val = download_btn_el.parent().height() - 30;
    download_btn_el.css('margin-top', val);
    size_el.css('margin-top', "30%");
}
/*
 * 设置div的高度相同
 * 图片的高宽相同*/
function setHeight() {
    val = download_btn_el.parent().height() - 30;
    console.log(val);
    var el = $('.col-xs-4');
    $('#img-test').css('height', $('#img-test').width());
    $('.same-height').css("height", el.height());
    download_btn_el.css('margin-top', val);
    size_el.css('margin-top', "30%");
}
/*获取A标签传递过来的参数*/
function getUrlParam() {
    var str = window.location.href.split('?')[1];
    resId = str.split('&')[0].split('=')[1];
    resTypeId = str.split('&')[1].split('=')[1];
}
function getJson(resourceURL) {
    var jsonObj = null;
    $.ajax({
        async: false,//false代表只有在等待ajax执行完毕后才执行
        type: "post",
        url: resourceURL,
        dataType: "JSON",
        success: function (data) {
            jsonObj = data;
        }
    });
    return jsonObj;
}
function getResByRestypeAndId(resTypeId, resId) {
    var resType, url;
    switch (resTypeId) {
        case "1":
            resType = "app";
            break;
        case "2":
            resType = "picture";
            break;
        case "3":
            resType = "video";
            break;
        case "15":
            resType = "video3d";
            break;
        default:
            break;
    }
    url = "http://116.62.45.102:8089/VRStore/api/" + resType + "/find/" + resId;
    return getJson(url);
}
function initResInfo() {
    getUrlParam();
    currentRes = getResByRestypeAndId(resTypeId, resId);

}