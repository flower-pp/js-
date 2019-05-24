//promise是异步编程的一种解决方案，比传统的解决方案--回调函数和事件--更合理和强大。它由社区最早提出和实现，ES6将其写进了语言标准。并设立了Promise对象
//它有两个特点：（1）   对象的状态不受外界的影响.Promise对象代表一个异步操作，有三种状态:pending(进行中),Fulfilled(已成功),rejected(已失败)
//只有异步的结果能决定当前是哪一种状态，任何其他操作都无法改变这个状态
//(2)一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能:从pending变为fullilled和从pending变为rejected.只要这两种情况发生，
//状态就凝固了，不会再改变了，这时称为resolved(已定型)。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。
//缺点：首先，无法取消Promise,一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部会抛出错误，不过不会影响外部。最后，pending状态也无法准确判定目前是进展到哪一个阶段（是刚开始还是即将完成）是、
const promise = new Promise(function(resolve,reject){
    if(/* 异步操作成功*/miao){
        resolve(value)
    }else{
        reject(err)
    }
    });
    //Promise构造函数接受一个函数为参数，该函数的两个参数分别是resolve和reject,他们是两个函数，由js引擎提供，不用自己部署.
    //resolve函数的作用是，将Promise对象的状态从‘未完成’变为‘成功’，（pending -> resolved）,在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从‘未完成’变为‘失败’（即从pending 变为 rejected）,
    //在异步操作失败时调用，并将异步操作时报出的错误，作为参数传递出去。
    //Promise实例生成以后，可以用then方法分别指定resolve状态和rejected状态的回调函数。
    promise.then(function(value){
    
    },function(err){
    
    })
    //then方法可以接受两个回调函数作为参数。
    //第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。
    //其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。
    function timeout(ms){
        return new Promise((resolve,reject) => {
            setTimeout(resolve,ms,'done');
        })
    }
    timeout(100).then((value) => {
        console.log(value);
    } )//done
    let promise = new Promise(function(resolve,reject){
        console.log('Promise');
        resolve();
    })
    promise.then(function(){
        console.log('resolve')
    })
    console.log('Hi!');
    //Promise
    //Hi!
    //resolved
    //上面的代码中，Promise新建后执行，所以先输出的是Promise。然后then方法指定的回调函数，将在当前脚本所有同步任务执行才会执行，所以resolved最后输出resolved
    function loadImageAsync(url){
        return new Promise(function(resolve,reject){
            const image = new Image()
            //第一条执行成功进行图片加载
            image.onload = function(){
                resolve(image)
            }
            //第一条执行失败，进行错误处理
            image.onerror  = function(){
                reject(new Error('Could not load image at'+utl));
            }
            image.src = url//先执行
        })
    }
    //上面的代码显示了使用Promise对象实现图片异步加载的例子，如果图片加载成功则进入onload函数，否则进入onerror函数
    const getJSON = function (url){
        
        const promise = new Promise(function(resolve,reject){
            const handler = function(){
                if(this.readyState !== 4){
                    return;
                }
                //如果正常的话那么返回内容执行resolve函数
                if(this.status == 200){
                    resolve(this.response)
                //如果有问题，执行reject()函数，并返回错误提示
                }else{
                    reject(new Error(this.statusText))
                }
            }
            //先执行下面的部分
            const xhr = new XMLHttpRequest()
            xhr.open("GET",url)
            //开始执行handler函数了
            xhr.onreadystatechange = handler
            xhr.responseType = "json"
            xhr.setRequestHeader("Accept","application/json")
            xhr.send()
        })
        return promise
    }
    //注意上面的resolve()和reject()函数中会有参数，那么他们的参数会被传递给回调函数。reject()函数的参数通常是Error对象的实例，表示抛出的错误
    //resolve()函数的参数除了正常的值以外，还可能是另一个Promise实例
    getJSON("/posts.json").then(function(json){
        //这个json是上面resolve()函数的参数this.response
        console.log('Contents:'+json);
        //这个error是上面reject()函数中的参数一个Error实例，它是一个错误信息
    },function(error){
        console.log('出错了',error);
    })
    //====================Promise中套Promise====================//
    //基础用法
    const p1 = new Promise(function(resolve,reject){
        //....
    });
    const p2 = new Promise(function(resolve,reject){
      resolve(p1);
    })
    //实例用法:
    const p1 = new Promise(function(resolve,reject){
        setTimeout(() => {
            reject(new Error('fail')),3000
        })
        const p2 = new Promise(function(resolve,reject){
            setTimeout(() => resolve(p1),1000);
        })
        p2.then(result => console.log(result)).
        catch(error => console.log(error))
    })
    //一秒之后执行的是p2的resolve,最后再执行p1，3秒之后输出Error: fail
    new Promise((resolve,reject) => {
        resolve(1);
        console.log(2);
    }).then(r => {
        console.log(r);
    })
    //2
    //1
    //resolved总是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务
    new Promise((resolve,reject) => { 
        return resolve(1);
        console.log(2);
    })
    //=========Promise.prototype.then============//
    //=========Promise.prototype.catch===========//
    //Promise.prototype.catch方法是.then(null,rejection)或.then(undefined,rejection)的别名，用于指定发生错误时的回调函数。
    getJSON("/posts.json").then(function(posts){
    }).catch(function(error){
        //处理getJOSN和前一个回调函数运行时发生的错误
        console.log('发生错误',error);
    });
    //上面的代码中，getJSON方法会返回一个Promise对象，如果该对象的状态变为resolved,则会调用then方法指定的回调函数；如果
    //异步操作抛出错误，状态就会变为rejectes,就会调用catch方法捕获错误
    
    
    