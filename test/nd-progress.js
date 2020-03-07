const http = require('http');

const server = http.createServer();
server.listen(3008,()=>{
    process.title='程序员成长指北测试进程';
    console.log(process)
    console.log('进程id',process.pid)
    // document.write('node server 启动成功！！！')
    console.log('启动成功')
})
server.on('request',(req,res)=>{
    console.log(req)
    console.log(res)
})