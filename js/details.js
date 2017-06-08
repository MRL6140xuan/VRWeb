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

    $('#img-icon').css('height', $('#img-icon').width());
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
    var el = $('.col-xs-4');
    $('#img-icon').css('height', $('#img-icon').width());
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
function setInfo(resObj) {
    var html1 = " ";
    var html2 = " ";
    var screenShots = resObj.data.screenShots;
    var indicators = $('#indicators');
    $('#resName').text(resObj.data.name);
    $('#img-icon').attr('src', resObj.data.iconUrl);
    console.log($('#img-icon').attr('src'));
    if (screenShots != null) {
        console.log("not null");
        $.each(screenShots, function (ids, obj) {
            html1 += '<li data-target="#carousel-example-generic" data-slide-to=' + ids + '></li>';
            html2 += `<div class="item "><img class="img-responsive" src=${obj} /><div class="carousel-caption"></div></div>`;
        });
    }
    $('#indicators').append(html1);
    $('#indicators').find('li').eq(0).addClass('active');
    $('#carousel-inner').append(html2);
    $('#carousel-inner').find('div').eq(0).addClass('active');
    var brief = " ";
    var develeper = "Thundersoft";
    if (resObj.data.developer) {
        develeper = resObj.data.developer;
        console.log(develeper);
    }
    brief = '<h4 class="text-responsive-h">' + resObj.data.name + '</h4> <p class="text-responsive-p1" >' + develeper + '</p><p id="size" class="text-responsive-p2" style="margin-top: 30%;">' + resObj.data.size + 'M</p>';
    console.log(brief);
    $('#brief').html(brief);
    $('#mark').click(function () {
        $(this).toggleClass('glyphicon-heart').toggleClass('glyphicon-heart-empty');
    });
    $('#download_btn').attr('href', resObj.data.downloadUrl);
    var html = '<p><span class="glyphicon glyphicon-star-empty"></span>' +
        '<span class="glyphicon glyphicon-star-empty"></span>' +
        '<span class="glyphicon glyphicon-star-empty"></span>' +
        '<span class="glyphicon glyphicon-star-empty"></span>' +
        '<span class="glyphicon glyphicon-star-empty"></span>' +
        '</p>';

    if (resObj.data.resourceType == '2') {
        html1 = '<p>评分</p> <p>舒适度等级</p><p>分辨率</p>';
        var level, resolution;
        level = resObj.data.comfortLevel ? resObj.data.comfortLevel : "&nbsp";
        resolution = resObj.data.resolution ? resObj.data.resolution : "&nbsp";
        html2 = html + '<p>' + level + '</p><p>' + resolution + '</p>';
    } else {
        var level, version, updataDate;
        level = resObj.data.comfortLevel ? resObj.data.comfortLevel : "&nbsp";
        version = resObj.data.versionName ? resObj.data.versionName : "&nbsp";
        updataDate = resObj.data.versionChangedOn ? resObj.data.versionChangedOn : "&nbsp";
        html1 = '<p>评分</p> <p>舒适度等级</p> <p>版本</p> <p>更新时间</p>';
        html2 = html + '<p>' + level + '</p> <p>' + version + '</p> <p>' + updataDate + '</p>'
    }
    $('.comment').eq(0).html(html1);
    $('.comment').eq(1).html(html2);
    $('#desc').html('<p>' + resObj.data.desc + '</p>');

}
function initResInfo() {
    getUrlParam();
    currentRes = getResByRestypeAndId(resTypeId, resId);
    setInfo(currentRes);

}