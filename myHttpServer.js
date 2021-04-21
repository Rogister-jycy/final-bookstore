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
        let url123=req.url.split("?");//let只做用于大括号内
        let obQuery=querystring.parse(url123[1])
        if (obQuery.submit1=='Save'){ 
            //2. 创建并写入文件  
            fs.writeFile('./test.txt',obQuery.name1, (err)=>{  
                if(err){  
                    console.log(err)  
                    return  
                }  
                console.log('创建写入文件成功')  
            })
        }
        else if (obQuery.submit1=='AppendSave'){
            //2. 创建并写入文件  
            fs.appendFile('./test.txt',obQuery.name1, (err)=>{  
                if(err){  
                    console.log(err)  
                    return  
                }  
                console.log('创建写入文件成功')  
            })

        }
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
