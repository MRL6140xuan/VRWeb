var resId, resTypeId;//获取url的两个参数（id和typeId）
var currentRes;
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
        case "2":
            resType = "picture";
            break;
        case "3":
            resType = "video";
        case "15":
            resType = "video3d";
            break;
        default:
            break;
    }
    url = "http://116.62.45.102:8089/VRStore/api/" + resType + "/find/" + resId;
    return getJson(url);
}
function getUrlParam() {
    var str = window.location.href.split('?')[1];
    resId = str.split('&')[0];
    resTypeId = str.split('&')[1];
}
function setSrc() {
    getUrlParam();
    currentRes = getResByRestypeAndId(resTypeId, resId);
    if (currentRes.data.resourceType == 2) {
        var skyEl = document.querySelector('#sky');
        skyEl.setAttribute('src', currentRes.data.downloadUrl);
    } else if (currentRes.data.resourceType == 3);
    {
        var video = document.querySelector('#videoPlay');
        video.setAttribute('src', currentRes.data.downloadUrl);
    }
}