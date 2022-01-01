const http = require('http')
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://172.21.2.236:27017/190110910408')//写学号

const Buyschema = {
    bookname: String,
    price:String,
    message:String,
    kind:String
};
const Buy = mongoose.model('buy',Buyschema);
const Userschema = {
    email: String,
    password:String
  };
const User = mongoose.model('user',Userschema);
const Admin = mongoose.model('admin',Userschema);
const Bookschema = {
    name: String,
    money:String,
    message:String,
    kind:String
};
const Book = mongoose.model('book',Bookschema);
const boss = new Admin({email:"boss",password:"123456"});
boss.save();
const querystring = require('querystring')
const express = require('express')
const app = express()
const insertDB = require('./MongodbLib');
app.use(express.static(__dirname + '/longo'));
const ejs = require('ejs')
app.set('view engine', "ejs");
app.set("bookStore", "./bookStore")
app.set("admin", "./admin")
app.set("buy", "./buy")
var email = '';
var password = '';
var submit = '';
doc = {};



app.get('/input', (req, res, next) => {
    console.log(req.query.password)
    console.log(req.query.email)
    email = req.query.email;
    password = req.query.password;
    submit = req.query.submit;
    doc[email] = password;
    console.log(email.length)
    console.log(password.length)

    if (email.length != 0 && password.length != 0) next()
    else res.render(__dirname + "/bookStore/bookstore.ejs", { passage: "用户名和密码都不能为空，请重新输入" })
})
app.get('/input', (req, res, next) => {
    if (submit == "注册") {
        insertDB.myfind('190110910408', 'users', { email: email, password: password }, (docs) => {
            if (docs.length == 0) {
                insertDB.myinsert('190110910408', 'users', [{ email: email, password: password }]);
                res.render(__dirname + "/longo/index.ejs", { passage: "已注册完成，请重新登录" })

            }
            else {
                loginFlag = 100;
                console.log("注册失败")
                res.render(__dirname + "/longo/index.ejs", { passage: "用户名已注册！请重新输入" })
            }
        });
    }
    else if (submit == "登录") {
        insertDB.myfind('190110910408', 'users', { email: email, password: password }, (docs) => {
            if (docs.length == 0) {
                res.render(__dirname + "/longo/index.ejs", { passage: "用户名密码错误，请重新输入" })
            }
            else {
                //代表成功
                res.render(__dirname + "/bookStore/bookstore.ejs")
            }
        });
    }
    else if (submit == "管理员") {
        insertDB.myfind('190110910408', 'admins', { email: email, password: password }, (docs) => {
            if (docs.length == 0) {
                console.log(email, password)
                res.render(__dirname + "/longo/index.ejs", { passage: "这不是管理员账号，请确认你的身份" })
            }
            else {
                res.render(__dirname + "/admin/add.ejs")
            }
        });
    }

})
app.get('/input', (req, res) => {
    res.send("")
})


////////-------------------------------------------------------图书搜索模块-------------------//////
var book = '';

app.get('/search', (req, res, next) => {
    console.log(req.query.search)
    book = req.query.search;

	var wherestr = {'name' : book};
    Book.findOne({"name":book},(err,data)=>{
        if(err) return console.log(err);
        res.render(__dirname + "/bookStore/bookstore4.ejs",{
            searchresult:data,
            searchname:data.name,
            searchmoney:data.money,
            searchmessage:data.message,
            searchkind:data.kind
        })

    })
    // Book.find(wherestr, function(err, res){
    //     if (err) {
    //         console.log("Error:" + err);
    //     }
    //     else {
    //         x = res;
    //         console.log("Res:" + res);
    //         ejs.renderFile(__dirname + "/bookStore/bookstore4.ejs",{searchresult:"哈哈哈"})
    //     }
    // })

    // insertDB.myfind('190110910408', 'books', { name: book }, (docs) => {
    //     if (docs.length == 0) {

    //         res.render(__dirname + "/bookStore/bookstore3.ejs")
    //     }
    //     else {
    //         res.render(__dirname + "/bookStore/bookstore4.ejs")
    //     }
    // })


})


//////////-----------------------图书添加模块-----------------/////////////////////

var bookname = '';
var bookmoney = '';
var bookmessage = '';
var bookkind = '';
app.get('/add', (req, res, next) => {
    console.log(req.query.name)
    console.log(req.query.money)
    console.log(req.query.message)
    console.log(req.query.kind)
    bookname = req.query.name;
    bookmoney = req.query.money;
    bookmessage = req.query.message;
    bookkind = req.query.kind;
    insertDB.myinsert('190110910408', 'books', [{ name: bookname, money: bookmoney, message: bookmessage, kind: bookkind }]);
    res.render(__dirname + "/admin/add.ejs")
})
////////////////----------------图书购买模块------------------------//////////

var buybook = '';
app.get('/book', (req, res, next) => {
    console.log(req.query.book)
    buybook = req.query.book
    insertDB.myinsert('190110910408', 'buys', [{ bookname: buybook,price:"50",message:"Study",kind:"计算机" }]);
    res.render(__dirname + "/bookStore/bookstore.ejs")
})
///////////////////-----------------/////////////////////////////////////
app.get('/back',(req, res, next) => {
    res.render(__dirname + "/bookStore/bookstore.ejs")
})
////////////////----------------购物车查询模块------------------------//////////

app.get('/car', (req, res, next) => {
    Buy.find({},(err,datas)=>{
        if(err) return console.log(err);
        res.render(__dirname + "/bookStore/bookstore3.ejs",{
            searchresult:datas
        })

        
    })
})
///////////////////-----------------/////////////////////////////////////
app.listen(4008)



