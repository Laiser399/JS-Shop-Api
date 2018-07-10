"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let options = { extended: false };
app.use(bodyParser.urlencoded(options));
let arr = [];
let ShopMoney = 0;
let arrSold = [];
app.listen(3000, () => console.log("started"));
app.post('/product', (req, res) => {
    if ((req.body.name === undefined) || (req.body.price === undefined) || (req.body.manufacturer === undefined)
        || (req.body.name === "") || (req.body.price === "") || (req.body.manufacturer === "")) {
        return res.status(400).send({
            "message": "Fields are not filled!"
        });
    }
    else {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === req.body.name) {
                return res.status(400).send({
                    "message": "Item with this name exists!"
                });
            }
        }
        arr.push({
            name: req.body.name,
            price: parseFloat(req.body.price),
            manufacturer: req.body.manufacturer,
            number_sales: 0
        });
        res.send({
            "message": `Added: 'name': ${arr[arr.length - 1].name}, 'price': ${arr[arr.length - 1].price}, 'manufacturer': ${arr[arr.length - 1].manufacturer}`
        });
    }
});
app.get('/product', (req, res) => {
    if ((req.query.name === undefined) || (req.query.name === "")) {
        return res.status(400).send({
            "message": "Field 'name' is not filled!"
        });
    }
    else {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === req.query.name) {
                return res.send({
                    "price": arr[i].price,
                    "manufacturer": arr[i].manufacturer,
                    "number_sales": arr[i].number_sales
                });
            }
        }
        res.status(400).send({
            "message": "Item with this name is not found!"
        });
    }
});
app.delete('/product', (req, res) => {
    if ((req.query.name === undefined) || (req.query.name === "")) {
        return res.status(400).send({
            "message": "Field 'name' is not filled!"
        });
    }
    else {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === req.query.name) {
                arr.splice(i, 1);
                return res.send({
                    "message": `Item was deleted!`
                });
            }
        }
        res.status(400).send({
            "message": "Item with this name was not found!"
        });
    }
});
app.post('/order', (req, res) => {
    if ((req.query.name === undefined) || (req.query.name === "")) {
        return res.status(400).send({
            "message": "Field 'name' is not filled!"
        });
    }
    else {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === req.query.name) {
                ShopMoney += arr[i].price;
                let Data = new Date();
                arrSold.push({
                    name: arr[i].name,
                    date: `${Data.getFullYear()}.${Data.getMonth()}.${Data.getDate()} ${Data.getHours()}:${Data.getMinutes()}`,
                    price: arr[i].price
                });
                return res.send({
                    "message": "Item was sold!"
                });
            }
        }
        return res.status(400).send({
            "message": "Item not found!"
        });
    }
});
app.get('/order', (req, res) => {
    res.send(arrSold);
});
app.get('/goods', (req, res) => {
    let arr_names = [];
    for (let i = 0; i < arr.length; i++) {
        arr_names.push(arr[i].name);
    }
    res.send(arr_names);
});
app.get('/balance', (req, res) => {
    res.send({
        "balance": ShopMoney
    });
});
