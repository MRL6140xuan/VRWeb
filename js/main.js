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
/*将秒转换成时分秒*/
function formatTime(seconds) {
    seconds = parseInt(seconds);
    var min = Math.floor(seconds / 60),
        second = seconds % 60,
        hour, newMin;
    if (min > 60) {
        hour = Math.floor(min / 60);
        newMin = min % 60;
    }
    if (second < 10) {
        second = '0' + second;
    }
    if (min < 10) {
        min = '0' + min;
    }

    return hour ? (hour + ':' + newMin + ':' + second) : (min + ':' + second);
}
/*检测是否为中文，true表示是中文，false表示非中文*/
function isChinese(str) {
    if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
        return true;
    } else {
        return false;
    }
}
function formatResName(resName) {
    if (isChinese(resName) && resName.length >= 7) {
        return resName.substr(0, 7) + "..";
    } else if (resName.length > 13) {
        return resName.substr(0, 10) + "..";
    }
    return resName;
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
            var name = formatResName(obj.name);

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
    video3dHtml = video2dHtml = pictureHtml = " ";
    var datas = getJson(url).data;
    var videos = datas.video;
    var pictures = datas.picture;
    var x;
    var count2d, count3d, countp;
    count2d = count3d = countp = 0;
    for (x in videos) {
        $.each(videos[x], function (ids, obj) {
            var name = formatResName(obj.name);
            if (obj.resourceType == 3) {
                if (count3d++ >= 6) {
                    return;
                }
                video3dHtml += '<div class="col-xs-4 col-sm-3 more_closed"> <div class="thumbnail">' +
                    '<a href="./details.html?id=' + obj.id + '&resourceType=' + obj.resourceType + '">' +
                    '<img src=' + obj.iconUrl + '></a>' +
                    '<h4>' + name + '</h4><p><span>' + formatTime(obj.duration) + '</span>' +
                    '<span class="glyphicon glyphicon-star"></span>' +
                    '<span class="pull-right text-primary">免费</span></p></div></div>';
            } else {
                if (count2d++ >= 6) {
                    return;
                }
                video2dHtml += '<div class="col-xs-4 col-sm-3 more_closed"> <div class="thumbnail">' +
                    '<a href="./details.html?id=' + obj.id + '&resourceType=' + obj.resourceType + '">' +
                    '<img src=' + obj.iconUrl + '></a>' +
                    '<h4>' + name + '</h4><p><span>' + formatTime(obj.duration) + '</span>' +
                    '<span class="glyphicon glyphicon-star"></span>' +
                    '<span class="pull-right text-primary">免费</span></p></div></div>';
            }
        });
    }
    for (x in pictures) {
        $.each(pictures[x], function (ids, obj) {
            if (countp++ >= 6) {
                return;
            }
            var name = formatResName(obj.name);
            pictureHtml += '<div class="col-xs-4 col-sm-3 more_closed"> <div class="thumbnail">' +
                '<a href="./details.html?id=' + obj.id + '&resourceType=' + obj.resourceType + '">' +
                '<img src=' + obj.iconUrl + '></a>' +
                '<h4>' + name + '</h4><p><span>5.0</span>' +
                '<span class="glyphicon glyphicon-star"></span>' +
                '<span class="pull-right text-primary">免费</span></p></div></div>';
        });
    }
    $('#picture').append(pictureHtml);
    $('#Video360').append(video3dHtml);
    $('#video2D').append(video2dHtml);

}
var html = " ";
function showAppList(category, offset) {
    var url = "http://116.62.45.102:8089/VRStore/api/main/apps/-1/" + category + "?offset=" + offset;
    var info = getJson(url);
    var lists = info.data;
    $.each(lists, function (ids, obj) {
        html += `<a href="./details.html?id=${obj.id}&resourceType=${ obj.resourceType }" class="list-group-item">
                    <div class="media">
                    <div class="media-left media-middle">
                    <img src=${obj.iconUrl} class="img-rounded" style="width: 64px;height: 64px;">
                    </div>
                    <div class="media-body">
                    <p><strong>${obj.name}</strong></p>
                    <p>${obj.starLevel}<span class="glyphicon glyphicon-star"></span></p>
                    <p class="text-right text-primary">免费</p>
                    </div></div></a>`;
    });
    if (info.end == 1) {
        $('#listGroup').append(html);
        html = " ";
    } else {
        showAppList(category, info.offset);
    }
}
function showMediaList(categoryId, category) {
    var url = "http://116.62.45.102:8089/VRStore/api/main/media/" + categoryId;
    console.log(url);
    var info = getJson(url);
    var lists = info.data[category];
    var x;
    for (x in lists) {
        $.each(lists[x], function (ids, obj) {
            html += `<a href="./details.html?id=${obj.id}&resourceType=${ obj.resourceType }" class="list-group-item">
                    <div class="media">
                    <div class="media-left media-middle">
                    <img src=${obj.iconUrl} class="img-rounded" style="width: 64px;height: 64px;">
                    </div>
                    <div class="media-body">
                    <p><strong>${obj.name}</strong></p>
                    <p>0.0<span class="glyphicon glyphicon-star"></span></p>
                    <p class="text-right text-primary">免费</p>
                    </div></div></a>`;
        });
    }
    $('#listGroup').append(html);
    html = " ";
}
/*为More设置点击事件*/
function showMoreList() {
    $('.title1 a').click(function () {
        $('#homePage').toggleClass('none');
        $('#resList').toggleClass('none');
        $('#categoryListTitle').text(this.dataset.title);
        showAppList(this.dataset.category, 0);

    });
    $('.title2 a').click(function () {
        console.log(this.dataset.categoryid);
        $('#homePage').toggleClass('none');
        $('#resList').toggleClass('none');
        $('#categoryListTitle').text(this.dataset.title);
        showMediaList(this.dataset.categoryid, this.dataset.category);
    });

}

