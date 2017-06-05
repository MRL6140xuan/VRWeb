/**
 * Created by mrl on 2017/6/5.
 */

var size_el = $('#size');
var download_btn_el = $('#download_btn');
var val;//@val:获取下载按钮父元素的高度来动态的设置margin-top
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
function setHeight() {
    val = download_btn_el.parent().height() - 30;
    console.log(val);
    var el = $('.col-xs-4');
    $('#img-test').css('height', $('#img-test').width());
    $('.same-height').css("height", el.height());
    download_btn_el.css('margin-top', val);
    size_el.css('margin-top', "30%");
}