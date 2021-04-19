const http=require('http')
const fs=require('fs');
const querystring=require('querystring')
var i=0;
const server=http.createServer((req,res) => {
    if(req.url=='/'){
        res.statusCode=200;
        res.setHeader('Content-Type','text/html');
        fs.readFile("form1.html",(err,fsData)=>{
            if(err){
                console.log("Read file error.")
                throw err
            }
            //console.log("1")
            res.write(fsData)
            res.end()
        })
       
    }
    else if(req.url.slice(0,6)=="/input"){
        res.statusCode=200;
        let url1=req.url.split("?");//let只做用于大括号内
        //let urlquery=url1[1].split("&");
        //let firstQuery=urlquery[0].split("=");
        //let secondQuery=urlquery[1].split("=");
        let obQuery=querystring.parse(url1[1])
        res.setHeader('Content-Type','text/html');
        //res.write(firstQuery[1]+"<br>")
        //res.write(secondQuery[1]+"<br>")
        res.write(obQuery.name+"<br>");
        res.write(obQuery.submit1+"<br>");
        res.end("submit success!")
    }
    else if(req.url=="/favicon.ico"){
        res.statusCode=200;
        res.setHeader('Content-Type','text/img');
        fs.readFile("favicon.ico",(err,fsData)=>{
            if(err){
                console.log("Read file error.")
                throw err
            }
            //console.log("1")
            res.write(fsData)
            res.end()
        })
        //console.log("2")
        
    }
    else{
        res.statusCode=200;
        res.setHeader('Content-Type','text/html');
        i++;
        res.write('<h1>This is Yin. You are the '+i+'th visitor</h1>');
   
    res.end();
    //console.log("this is my consolelog");
}
});
server.listen(3000);
