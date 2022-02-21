/**
 * 功能:产生随机颜色
 * 参数：null
 * return 的返回值的结果：随机出来的一个rgb的颜色
 * */ 
function getColor(){
    return "rgb("+rand(0,255)+","+rand(0,255)+","+rand(0,255)+")";
}

/*
功能：产生随机数
参数：min 最小值，max最大值
返回值：在min和max之间的一个随机数
*/ 
function rand(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
} 

/**
 * 
 * @param obj 获取哪个元素的样式【属性】
 * @param attr  样式的名称【属性】
 * @returns 返回样式的值【属性值】
 */
function getCss(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj)[attr];
    }   
}


/**
 * move 元素移动的方法
 * 参数：obj 移动的元素
 * attr 操作的属性
 * step 移动的间隔距离
 * target 目标位置
 * fun 回调函数
 * 
*/
function move(obj,attr,step,target,fun){
    var num = parseFloat(getCss(obj,attr));
    // 判断 - step的值是正，还是负
    if(num < target){
        step = step
    }else{
        step = -step;
    }
    // obj.myTimer  - 将产生的定时器，放在obj对象里面  
    obj.myTimer = setInterval(function(){
        
        num = num + step;
        
        // 移动的边界值
        if(num > target && step > 0){
            num = target
        }
        if(num < target && step < 0){
            num = target
        }
        obj.style[attr] = num + 'px';
        // 清除定时器
        if(num == target){
            clearInterval(obj.myTimer);
            // 判断fun是否传递，传递调用当前函数
            // if(fun){
            //     fun();
            // }
            fun && fun(); // 简写形式
        }
    },20);
}

// 阻止事件冒泡
function stopPro(event){
    // 兼容event
    var e = event || window.event;
    if(e && e.stopPropagation){ // 非ie
        e.stopPropagation();
    }else{ /// ie
        e.cancelBubble = true
    }
}

// 封装事件触发
function addEvent(obj,EType,fun){
    // onclick / addEventListener / attachEvent
    if(obj.addEventListener){
        obj.addEventListener(EType,fun); // click
    }else if(obj.attachEvent){ // ie
        obj.attachEvent('on'+EType,fun); // onclick
    }else{
        // onclick
        obj['on'+EType] = fun;
    }
}

// 封装取消事件
function removeEvent(EType,element,fun){
    if(element.removeEventListener){
        element.removeEventListener(EType,fun);
    }else if(element.detachEvent){
        element.detachEvent('on'+EType,fun);
    }else{
        element['on'+EType] = null;
    }
}

// 封装 - 取消默认事件
function preventDef(event){
    var ev = event || window.event;
    if(ev.preventDefault){
        ev.preventDefault();
    }else{
        ev.returnValue = false;
    }
}
//阻止浏览器的默认行为 
function stopDefault( e ) { 
    //阻止默认浏览器动作(W3C) 
    if ( e && e.preventDefault ) 
        e.preventDefault(); 
    //IE中阻止函数器默认动作的方式 
    else 
        window.event.returnValue = false; 
    return false; 
}
    /*
分析参数
    请求方式 - get / post
    同步还是异步 - true / false
    请求路径 - url
    请求参数 - parms
    成功的回调 - success
    失败的回调 - error
封装
    get的同步getSync
    get的异步getAsync
    post同步postSync
    post异步postAsync
    */ 
// name=jack&age=18

// 封装调用测试
// getSync('test.php','',suc,err);
// getAsync('test.php','',suc,err);
// function suc(msg){
//     console.log(msg.responseText);
// }

// function err(tip){
//     console.log(tip);
// }
// get的同步
function getSync(url,parms,success,error){
    if(window.XMLHttpRequest){
        var xhr = new XMLHttpRequest();
    }else if(window.ActiveXObject){
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    
    xhr.open('get',url+'?'+parms,false);

    xhr.send();

    
        if(xhr.readyState == 4&&xhr.status==200){
            
                success(xhr);
            }else{
                error('请求失败');
            }
        
   
}
  
// get 的异步
function getAsync(url,parms,success,error){
    if(window.XMLHttpRequest){
        var xhr = new XMLHttpRequest();
    }else if(window.ActiveXObject){
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    
    xhr.open('get',url+'?'+parms,true);

    xhr.send();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status==200){
                success(xhr);
            }else{
                error('请求失败');
            }
        }
    }
}

// post 同步
function postSync(url,parms,success,error){
    if(window.XMLHttpRequest){
        var xhr = new XMLHttpRequest();
    }else if(window.ActiveXObject){
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    
    xhr.open('post',url,false);

    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
    xhr.send(parms);

    
        if(xhr.readyState == 4&&xhr.status==200){
           
                success(xhr);
            }else{
                error('请求失败');
            }
        
    
}
// post异步
function postAsync(url,parms,success,error){
    if(window.XMLHttpRequest){
        var xhr = new XMLHttpRequest();
    }else if(window.ActiveXObject){
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    
    xhr.open('post',url,true);

    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
    xhr.send(parms);

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status==200){
                success(xhr);
            }else{
                error('请求失败');
            }
        }
    }
}