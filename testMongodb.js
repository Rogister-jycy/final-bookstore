const insertDB = require('./MongodbLib')
var loginFlag = 0;
insertDB.myinsert('bookstore', 'book', [{ name: "摄影素材" }, { money: 35 }]);
// insertDB.myfind('mydb','login',{3:1},(docs)=>{
//     if(docs.length==0){
//         collection.myinsert([findData], function(err, result) {


//     });
// }
//     else {
//         loginFlag=100
//         console.log("注册失败！")}
// });