const express = require('express');
const cors = require('cors');
var fs = require('fs');

var data = fs.readFileSync('./MOCK_DATA.json');
var cards = JSON.parse(data);

const app = express();
app.use(cors());

app.get("/" , (req,res) => {
    res.send("Api is running successfullt");
})

app.get("/cards" , searchCard);

function searchCard(req , res){
    var cardNumber = req.query.number;
    let flag=0;
    for(let i = 0; i < Object.keys(cards).length ; i++){
        if(cards[i].card_number === cardNumber){
            res.send("Hello " + cards[i].first_name +"! Good to see you")
            flag++;
            break;
        }
    }
    if(flag == 0){ 
        res.send("Not found")
    }
}

app.get("/balance" , balance);

function balance(req, res){
    var cardNumber = req.query.number;
    let flag = 0;
    for (let i = 0; i < Object.keys(cards).length; i++) {
      if (cards[i].card_number === cardNumber) {
        res.send("Hello " + cards[i].first_name + "! Your balance is : " + cards[i].balance);
        flag++;
        break;
      }
    }
    if (flag == 0) {
      res.send("Not found");
    }
}

app.get("/withdrawl" , withdrawl);

function withdrawl(req , res){
    var cardNumber = req.query.number;
    var amount = req.query.amount;
    amount = parseInt(amount);
    let flag = 0;
    for (let i = 0; i < Object.keys(cards).length; i++) {
      if (cards[i].card_number === cardNumber) {
        var balance = cards[i].balance;
        balance = balance.slice(1,balance.length);
        balance = parseInt(balance);
        if(amount > balance){
            res.send("Insufficient funds");
        }
        else{
            res.send("Amount withdrawn successfully!! Your balance is : "+(balance-amount));
        }
        flag++;
        break;
      }
    }
    if (flag == 0) {
      res.send("Not found");
    }
}

app.listen(4000 , console.log("Server started successfully at port 4000"));