/**
 * Created by mrl on 2017/6/6.
 */
var recUrl = "http://116.62.45.102:8089/VRStore/api/home/list?imsi=460000830790848&model=MATE8&lang=en&resolution=1920_1080&network=wifi&os_code=22&version_code=960&version_name=1.1.0.2351&channel=default&uid=2399&token=23uy89t23ur092ur9r0u3&uuid=324jhg9043urj29r239i9rf23uy9t23";
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
    var x1 = " ";
    var x2 = " ";
    var tops = getJson(recUrl).data.recommend.top;
    console.log(tops);
    var indicators = $('#indicators');
    if (tops != null) {
        console.log("not null");
        $.each(tops, function (ids, obj) {
            console.log(ids);
            console.log(obj);
            html1 += '<li data-target="#carousel-example-generic" data-slide-to=' + ids + '></li>';
            html2 += `<div class="item "><a href="./details.html?id=${obj.id}&resourceType=${obj.resourceType}"><img class="img-responsive" src=${obj.imageUrl} alt="图片" /><div class="carousel-caption"><h3>${obj.name}</h3></div></a></div>`;
        });
    }
    // console.log(html2);
    $('#indicators').append(html1);
    console.log($('#indicators').find('li').eq(0));
    $('#indicators').find('li').eq(0).addClass('active');

    $('#carousel-inner').append(html2);
    $('#carousel-inner').find('div').eq(0).addClass('active');
}

function setTest() {
    var appName = 'apptest';
    var w1 = '<div class="row">' +
        '<div class="col-xs-4 col-sm-3 more_closed">' +
        '<div class="thumbnail">' +
        '<a href="#" class="">' +
        '<img src="images/1.jpg" alt="图一">' +
        '</a>' +
        '<h4>' + appName + '</h4>' +
        '<p>' +
        '<span>5.0</span><span class="glyphicon glyphicon-star"></span>' +
        '<span class="pull-right text-primary">免费</span>' +
        '</p>' +
        '</div>' +
        '</div>';
    $('#apps_new').html(w1);
}

