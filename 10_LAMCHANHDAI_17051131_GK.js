const express = require('express');
const app = express();
const port = 3000;
var AWS = require('aws-sdk');


app.set("view engine","ejs");
app.set("views","./views");
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
AWS.config.update({
    region: "ap-southeast-1",
    endpoint: "http://dynamodb.ap-southeast-1.amazonaws.com"
});
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();
 

function loadData (res) {
    let params = {
        TableName: "SanPham"
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            console.log(JSON.stringify(err, null, 2));
        } else {
            if(data.Items.length === 0){
                res.end(JSON.stringify({message :'Table rỗng '}));
            }
            res.render('DanhSachSP.ejs',{
                data : data.Items
            });
        }
    });
 
}
app.get("/",(req,res)=>{
    loadData(res);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
