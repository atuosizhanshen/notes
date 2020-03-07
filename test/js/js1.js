var str = 'aaa';
 var lastTime = performance.now();
 var now = performance.now();

 console.time(str)
console.timeEnd(str)
var frame = 0;
var lastFameTime = performance.now();
var loop = function(time) {
    var now =  performance.now();
    console.log(now)
    console.log(lastFameTime)
    var fs = (now - lastFameTime);
    lastFameTime = now;
    var fps = Math.round(1000/fs);
    frame++;
    if (now > 1000 + lastTime) {
        var fps = Math.round( ( frame * 1000 ) / ( now - lastTime ) );
        frame = 0;
        lastTime = now;
        console.log('fps大于1s时的:'+fps)
    };
    console.log('fps:'+fps)
    console.log('frame:'+frame)
    //window.requestAnimationFrame(loop);
}

loop()
console.log('同步结束')