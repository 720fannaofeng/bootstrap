// echarts柱状图
function myecharts() {
    var myChart = echarts.init(document.querySelector('.echarts'));
    option = {
        color: ['#5470c6'],
        tooltip: {
            tirgger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            top: '5%',
            left: '2%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['i5ting', 'alsotang', 'atian25', 'leapon', 'jiyinyiyong', 'yakczh', 'im-here', 'DevinXian', 'chapgaga', 'magicdawn'],
        },
        series: [{
            type: 'bar',
            data: [23095, 15840, 10170, 9350, 8782, 8155, 6855, 6150, 5815, 5380],
        }, ]
    };
    ///使用刚指定的配置项和数据显示图表
    myChart.setOption(option);

}
myecharts();

$(function() {
        getData('all');
    })
    //页面加载之后调用函数并传参

function getData(tab, page) {
    $.ajax({
        url: 'https://cnodejs.org/api/v1/topics',
        data: {
            tab: tab,
            page: page
        },
        success: function(res) {
            // console.log(res);
            let html = '';
            let text = {
                'good': '精华',
                'share': '分享',
                'ask': '问答',
                'job': '招聘',
                'dev': ''
            }
            res.data.forEach(function(item) {
                if (item.top == true) {
                    item.top = '置顶';
                } else {
                    if (item.tab != undefined) {
                        item.top = text[item.tab];
                    } else {
                        item.top = '分享';
                    }
                }
                if (item.good == true) {
                    item.top = '精华';
                }
                html += `<div class="cell">
                <a href="" class="user_avatar pull-left">
                    <img src="${item.author.avatar_url}" alt="">
                </a>
                <span class="reply_count pull-left">
                    <span class="count_of_replies" title="回复数">
                       ${item.reply_count}
                      </span>
                <span class="count_seperator">/</span>
                <span class="count_of_visits" title="点击数">
                      ${item.visit_count}
                      </span>
                </span>
                <a href="" class="last_time pull-right">
                    <img class="user_small_avatar" src="${item.author.avatar_url}" alt="">
                    <span class="last_active_time">${getDay(item.last_reply_at)}</span>
                </a>
                <div class="topic_title_wrapper">
                    <span class="put_top">${item.top}</span>
                    <a class="topic_title" title="【望周知，求扩散】淘宝 NPM 镜像站喊你切换新域名啦">
                       ${item.title}
                      </a>
                </div>

            </div> `;
            })
            $('.topic_list').html(html);
            // text() 方法方法设置或返回被选元素的文本内容
            //判断是否为置顶设置样式
            var texts = $('.put_top').text().trim();
            var arr = [];
            for (var i = 0; i < texts.length - 1; i++) {
                if (i % 2 == 0) {
                    arr.push(String(texts[i] + '' + texts[i + 1]))
                }
            }
            // console.log(arr);
            var putTop = document.querySelectorAll('.put_top');
            for (var j = 0; j < arr.length; j++) {
                if (arr[j] == '置顶' || arr[j] == '精华') {
                    putTop[j].className = 'put_top ding'
                } else {
                    putTop[j].className = 'put_top noDing'
                }
            }
        }
    })
}

//回到头部
//1.获取显示的按钮
var goTop = document.querySelector('.goTop');
//2.给页面添加滚动事件
window.onscroll = function() {

        var top = document.documentElement.scrollTop
        console.log(top);
        if (top >= 300) {
            goTop.style.display = 'block'

        } else {
            goTop.style.display = 'none'
        }

    }
    // goTop.onclick = function() {
    //     setInterval(function() {
    //         var h = document.documentElement.scrollTop;
    //         if (h > 0) {
    //             h -= 10
    //             document.documentElement.scrollTop;
    //         }
    //     }, 10)
    //     console.log(123);
    // }
    　


timess = null;

goTop.onclick = function() {
    clearInterval(timess)
    timess = setInterval(function() {
        var h = document.documentElement.scrollTop;
        if (h > 0) {
            h -= 10;
            document.documentElement.scrollTop = h;
        } else {
            clearInterval(timess)
        }
    }, 10)
}

//计算时间
function getDay(timer) {
    var times = null;
    var now = new Date();
    var timeCha = Math.floor((now - new Date(timer)) / 1000); //时间戳

    //分
    var f = parseInt(timeCha / 60);
    //时
    var h = parseInt(timeCha / 60 / 60);
    //天
    var d = parseInt(timeCha / 60 / 60 / 24);
    //月
    var y = parseInt(timeCha / 60 / 60 / 24 / 30);
    //年
    var n = parseInt(timeCha / 60 / 60 / 24 / 30 / 12);

    if (f < 60) {
        times = f + '分钟前';
    } else if (h < 24) {
        times = h + '小时前';
    } else if (d < 30) {
        times = d + '天前'
    } else if (y < 12) {
        times = y + '月前'
    } else if (n > 0) { times = n + '年前' }
    return times;
}

//页头切换数据
$('.topic-tab').click(function() {
    $(this).addClass('current-tab').siblings().removeClass('current-tab')
    $('page li').eq(1).addClass('active1').siblings().removeClass('active1');
    getData($(this).data('tab'))
});

//分页切换
$('.page li').click(function() {
    $(this).addClass('active1').siblings().removeClass('active1');
    getData($('current-tab').data('tab'), $(this).data('page'));
})

//点击下一页显示到最后页数
$('.nextClick').click(function() {
        $('.page2').addClass('cur');
        $('.page1').removeClass('cur');
        $('.next').addClass('disable')
        $('.six').addClass('active1 disable');
        getData($('.current-tab').data('tab'), $('.six').data('page'));
    })
    //点击上一页显示到最前面页数
$('.preClick').click(function() {
    $('.page1').addClass('cur');
    $('.page2').removeClass('cur');
    $('.pre').addClass('disable')
    $('page li').eq(1).addClass('active1').siblings().removeClass('active1');

})