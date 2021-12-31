## 开始项目

创建一个文件夹名为bookstore作为工作目录

在bookstore文件夹下创建mongodata用于存放MongoDB数据库文件

将node_modules拷贝到bookstore文件夹下

输入npm init用来初始化项目

可以看到package.json已经创建起来了

当然你可以修改这个json文件来安装你需要的一些依赖，具体操作就是在json文件里写"

```
{
  "name": "wkgood",
  "version": "1.0.0",
  "description": "",
  "main": "myHttpServer.js",
  "dependencies": {
    "ejs": "^3.1.6",
    "express": "^4.17.1",
    "mongodb": "^3.6.6"
  },
```

## bookstore项目结构

myhttpserver.js：项目的启动文件，通过运行node.js访问本地IP地址对项目网站进行访问

MongoDBLib.js：文件写入了函数包含了数据库的存入和数据库的查找

testmongodb.js：测试文件，由于测试MongoDBLib.js文件是否可行

favicon.ico：网站的图标文件

bookStore文件夹：网站的主体界面，bookstore网站的设计

longo文件夹：注册登录界面，提供了注册登录的功能，初始化的界面

admin文件夹：管理员界面，用于管理员登录后，对于bookstore中的图书进行添加

mongodata文件夹：用于存放MongoDB数据库文件

node_modules文件夹：node,js 的存储文件夹用于提供node.js

view文件夹：测试文件夹，用于检测ejs,express是否成功运行



## 安装jquery

在文件中，我们需要使用到jQuery所以我们需要先对jQuery进行下载

https://jquery.com/download/

## 使用MongoDB

```
show dbs
use bookstore（指定数据库）
show collections
```

MongoDB下创建bookstore文件夹名

建立books（做为存储书本信息的collection）

建立users（做为存储用户信息的collection）

建立admins（做为存储管理员信息的collection）

建立buys（做为存储书本购买信息的collection）

## node链接到MongoDB（使用mongoose）

同上课所说，使用MongoDBLib.js文件（文件内包含了数据库的存入和数据库的查找）

并将其exports出去

使用myhttpserver.js文件作为整个bookstore的运行文件

引入MongoDBLib.js：

const insertDB = require('./MongodbLib');

## 回调函数和res

### Next（）的作用

next函数主要负责将控制权交给下一个中间件，如果当前中间件没有终结请求，并且next没有被调用，那么请求将被挂起，后边定义的中间件将得不到被执行的机会。next()的作用就是通过放行允许程序执行多个中间件。

next函数主要是用来确保所有注册的中间件被一个接一个的执行

当前面的请求被回复之后，没有next的话还是会执行除了回应之外的代码。res.json最后调用的是res.send返回

### ejs渲染

ejs是node的后端与html的前端之间的桥梁

当然使用的时候要用app.set设置一些东西

如：

前端:<%=model  > 

后端:res.render(什么什么什么什么)

注意，render的message那里一定要包涵所有在ejs里面有的字段，如果没有完全包涵所有ejs里有的字段，会报错某某字段没有定义。

res.render和res.send一样会终止代码的运行【不应该说终止代码的运行，因为我没有next了，注意看上面介绍next的博客

```
app.get('/book', (req, res, next) => {
    console.log(req.query.book)
    buybook = req.query.book
    insertDB.myinsert('bookstore', 'bookbuymessage', [{ name: buybook }]);

    res.render(__dirname + "/bookStore/bookstore.ejs")

})
```

### res详录

**Request 对象** - request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。常见属性有：

1. req.app：当callback为外部文件时，用req.app访问express的实例

2. req.baseUrl：获取路由当前安装的URL路径

3. req.body / req.cookies：获得「请求主体」/ Cookies

   ```js
   // POST user[name]=tobi&user[email]=tobi@learnboost.com
   req.body.user.name
   // => "tobi"
   
   req.body.user.email
   // => "tobi@learnboost.com"
   
   // POST { "name": "tobi" }
   req.body.name
   // => "tobi"
   ```

4. req.fresh / req.stale：判断请求是否还「新鲜」

5. req.hostname / req.ip：获取主机名和IP地址

6. req.originalUrl：获取原始请求URL

7. req.params：获取路由的parameters

8. req.path：获取请求路径

9. req.protocol：获取协议类型

10. req.query：获取URL的查询参数串

11. req.route：获取当前匹配的路由

12. req.subdomains：获取子域名

13. req.accepts()：检查可接受的请求的文档类型

14. req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码

15. req.get()：获取指定的HTTP请求头

16. req.is()：判断请求头Content-Type的MIME类型

**Response 对象** - response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：

1. res.app：同req.app一样
2. res.append()：追加指定HTTP头
3. res.set()在res.append()后将重置之前设置的头
4. res.cookie(name，value [，option])：设置Cookie
5. opition: domain / expires / httpOnly / maxAge / path / secure / signed
6. res.clearCookie()：清除Cookie
7. res.download()：传送指定路径的文件
8. res.get()：返回指定的HTTP头
9. res.json()：传送JSON响应
10. res.jsonp()：传送JSONP响应
11. res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
12. res.redirect()：设置响应的Location HTTP头，并且设置状态码302
13. res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
14. res.send()：传送HTTP响应
15. res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
16. res.set()：设置HTTP头，传入object可以一次设置多个头
17. res.status()：设置HTTP状态码
18. res.type()：设置Content-Type的MIME类型

## 



# 开发日志

