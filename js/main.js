/**
 * Created by mrl on 2017/6/6.
 */
// var recUrl = "http://116.62.45.102:8089/VRStore/api/home/list?imsi=460000830790848&model=MATE8&lang=en&resolution=1920_1080&network=wifi&os_code=22&version_code=960&version_name=1.1.0.2351&channel=default&uid=2399&token=23uy89t23ur092ur9r0u3&uuid=324jhg9043urj29r239i9rf23uy9t23";
var recUrl = "http://116.62.45.102:8089/VRStore/api/home/list";
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
function setHomeRecom() {
    var html1 = " ";
    var html2 = " ";
    var tops = getJson(recUrl).data.recommend.top;
    var indicators = $('#indicators');
    if (tops != null) {
        $.each(tops, function (ids, obj) {
            html1 += '<li data-target="#carousel-example-generic" data-slide-to=' + ids + '></li>';
            html2 += `<div class="item "><a href="./details.html?id=${obj.id}&resourceType=${obj.resourceType}"><img class="img-responsive" src=${obj.imageUrl} alt="图片" /><div class="carousel-caption"><h3>${obj.name}</h3></div></a></div>`;
        });
    }

    $('#indicators').append(html1);
    $('#indicators').find('li').eq(0).addClass('active');
    $('#carousel-inner').append(html2);
    $('#carousel-inner').find('div').eq(0).addClass('active');
}
function getResByRestypeAndId(resTypeId, resId) {
    var resType, url;
    switch (resTypeId) {
        case 1:
            resType = "app";
            break;
        case 2:
            resType = "picture";
            break;
        case 3:
            resType = "video";
        case 15:
            resType = "video3d";
            break;
        default:
            break;
    }
    url = "http://116.62.45.102:8089/VRStore/api/" + resType + "/find/" + resId;
    return getJson(url);
}
/*获取主页中apps分类下的列表*/
function setHomeAppsList() {
    var url = "http://116.62.45.102:8089/VRStore/api/main/apps/1/all";
    var lists = getJson(url).data;//new,featured,free,popular四个list；
    var x;
    var html = " ";
    var index = 0;
    var categorys = ["#new", "#featured", "#free", "#popular"];
    for (x in lists) {
        $.each(lists[x], function (ids, obj) {
            var name = obj.name;
            if (name.length > 13) {
                name = name.substr(0, 10) + "..";
            }
            html += '<div class="col-xs-4 col-sm-3 more_closed"> <div class="thumbnail">' +
                '<a href="./details.html?id=' + obj.id + '&resourceType=' + obj.resourceType + '">' +
                '<img src=' + obj.iconUrl + '></a>' +
                '<h4>' + name + '</h4><p><span>' + obj.starLevel + '</span>' +
                '<span class="glyphicon glyphicon-star"></span>' +
                '<span class="pull-right text-primary">免费</span></p></div></div>';
        });
        $(categorys[index++]).append(html);
        html = " ";
    }
}
function setHomeMediaList() {
    var url = "http://116.62.45.102:8089/VRStore/api/main/media/-1";
    var video2dHtml, video3dHtml, pictureHtml;
    var datas = getJson(url).data;
    var videos = datas.video;
    var pictures = datas.picture;
    var x;

    for (x in videos) {
        $.each(videos[x], function (ids, obj) {
            var name = obj.name;
            if (name.length > 13) {
                name = name.substr(0, 10) + "..";
            }
            if (obj.resourceType == 3) {
                video3dHtml += '<div class="col-xs-4 col-sm-3 more_closed"> <div class="thumbnail">' +
                    '<a href="./details.html?id=' + obj.id + '&resourceType=' + obj.resourceType + '">' +
                    '<img src=' + obj.iconUrl + '></a>' +
                    '<h4>' + name + '</h4><p><span>' + obj.starLevel + '</span>' +
                    '<span class="glyphicon glyphicon-star"></span>' +
                    '<span class="pull-right text-primary">免费</span></p></div></div>';
            } else {
                video2dHtml += '<div class="col-xs-4 col-sm-3 more_closed"> <div class="thumbnail">' +
                    '<a href="./details.html?id=' + obj.id + '&resourceType=' + obj.resourceType + '">' +
                    '<img src=' + obj.iconUrl + '></a>' +
                    '<h4>' + name + '</h4><p><span>' + obj.starLevel + '</span>' +
                    '<span class="glyphicon glyphicon-star"></span>' +
                    '<span class="pull-right text-primary">免费</span></p></div></div>';
            }
        });
    }
    for (x in pictures) {
        $.each(pictures[x], function (ids, obj) {
            var name = obj.name;
            if (name.length > 13) {
                name = name.substr(0, 10) + "..";
            }
            pictureHtml += '<div class="col-xs-4 col-sm-3 more_closed"> <div class="thumbnail">' +
                '<a href="./details.html?id=' + obj.id + '&resourceType=' + obj.resourceType + '">' +
                '<img src=' + obj.iconUrl + '></a>' +
                '<h4>' + name + '</h4><p><span>' + obj.starLevel + '</span>' +
                '<span class="glyphicon glyphicon-star"></span>' +
                '<span class="pull-right text-primary">免费</span></p></div></div>';
        });
    }
    $('#picture').append(pictureHtml);
    $('#video3D').append(video3dHtml);
    $('#video2D').append(video2dHtml);


}

