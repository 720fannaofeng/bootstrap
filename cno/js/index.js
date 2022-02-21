function fengzhuang(tab, page) {
    getSync("https://cnodejs.org/api/v1/topics", 'tab=' + tab + '&&page=' + page, suc, err)
    function suc(res) {
        var dates = JSON.parse(res.responseText).data
        // console.log(dates);
        var mainpart = document.querySelector('.mainpart');
        // console.log(dates.length
        // );
        mainpart.innerHTML = '';

        for (var i = 0; i < dates.length; i++) {
            //时间
            var nowTime = new Date();
            var lasttime = new Date(dates[i].last_reply_at);
            var cha = nowTime.getTime() - lasttime.getTime();
            var chatime = Math.round(cha / 1000 / 60 / 60)
            if (chatime < 24) {
                var dayOhour = '小时前'
            }
            else {
                var chatime = Math.round(cha / 1000 / 60 / 60 / 24)
                var dayOhour = '天前'
            }
            //置顶设置背景颜色,及对应的文字颜色
            var topbg = (dates[i].top || dates[i].good) ? 'greenbg' : 'greybg'
            //是否为置顶,分享
            var tab = dates[i].top ? '置顶' : dates[i].good ? '精华' : dates[i].tab == "share" ? '分享' : dates[i].tab == "ask" ? '问答' : '';
            //页面传入数据

            mainpart.innerHTML += `<div class="cell">
            
    <img src="`+ dates[i].author.avatar_url + `" alt="" class="img1">
   <span class="pinglunshu"> 
      <span>`+ dates[i].reply_count + `</span>
       <span>/</span>
       <span class="visit">`+ dates[i].visit_count + `</span>
    </span>
    <span class="`+ topbg + `">` + tab + `</span>
    <div class="title"><a href="">`+ dates[i].title + `</a></div>
    <a href="" class="push-right">
       <img src="`+ dates[i].author.avatar_url + `" alt="" class="img2">
       <span class="time">`+ chatime + dayOhour + `</span>
    </a>
    </div>`
        }
    }
    function err(errmsg) {
        console.log(errmsg);
    }
}
//页面加载完毕显示全部的第一页
window.onload = function () {
    fengzhuang('all', 1)
}
//获取所有的.top-tab类
var top_tab = document.querySelectorAll('.top-tab');
for (var i = 0; i < top_tab.length; i++) {
    //对应的按钮做点击事件,进行不同类别的切换
    top_tab[i].onclick = function () {
        for (var j = 0; j < top_tab.length; j++) {
            top_tab[j].className = "top-tab";
        }
        this.className = "top-tab current";
        //获取每一个data-tab的值
        //要用data-属性,必须先getattribute获取它的属性值
        var data_tab = this.getAttribute("data-tab")
        fengzhuang(`` + data_tab + ``, 1)
    }
}
//点击切换分页数据
var ppage = document.querySelectorAll(".ppage");
var top_tab = document.querySelectorAll('.top-tab');
for (let i = 0; i < ppage.length; i++) {
    ppage[i].onclick = function () {
        var current = document.querySelector(".current");
        var data_tab = current.getAttribute("data-tab");
        var data_page = this.getAttribute("data-page");
        fengzhuang(`` + data_tab + ``, `` + data_page + ``)
        console.log(data_tab);
        console.log(i);

    }
}
//回到首页
var back = document.querySelector(".back");
back.onclick = function () {
    var current = document.querySelector(".current");
    var data_tab = current.getAttribute("data-tab");

    fengzhuang(`` + data_tab + ``, 1)
}
var end = document.querySelector('.end')
end.onclick = function () {
    var current = document.querySelector(".current");
    var data_tab = current.getAttribute("data-tab");

    fengzhuang(`` + data_tab + ``, 10)
}
//上一页的切换



//下一页的切换

/* echarts柱状图 */
var chartDom = document.getElementById('nomain');
var myChart = echarts.init(chartDom);
var option;

option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }
    ]
};

option && myChart.setOption(option);

/* 返回顶部 */
let goback = document.querySelector('.goback');

//滚动条垂直方向下滚动的距离
let bdtop =document.documentElement.scrollTop;
//滚动条参照物积分榜
let canzhao = document.querySelector('.canzhao')
//给窗口添加scroll滚动事
    document.addEventListener('scroll',()=>{
              if(window.pageYOffset>canzhao.offsetTop){
                  goback.style.display="block";
              
              }
             else{
                goback.style.display="none";
             }
              
    })
    //返回顶部添加点击事件
    let times='';
    goback.onclick=()=>{
        clearInterval(times)
        times=setInterval(()=>{
            var h=document.documentElement.scrollTop;
            if(h>0){
                h-=20;
                document.documentElement.scrollTop = h;
            }
            else{
                clearInterval(times)
                
            }
        },20)
       
    }
  







