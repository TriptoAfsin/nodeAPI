const express = require('express');
const fs = require('fs');
const http = require('http');

let productJSON = require("./product.json");

const Joi = require('joi')
const app = express();

app.use(express.json());


const { parse } = require('path');
const { json } = require('express');
const { dir } = require('console');


const rawdata = fs.readFileSync("product.json");
const products = [
        {
            id: 1,
            name: "Slidenoobs 101",
            price: "Free"
        },
        {
            id: 2,
            name: "CP 101",
            price: "Free"
        },
        {
            id: 3,
            name: "WebDev 101",
            price: "5$"
        }
];





//const cors = require('cors');

//app.use(cors( { origin:true}));


app.get('/', (req, res) =>{

    res.status(200).send('<p style="text-align:center; font-size:80px"><b>Welcome to demo api</b><br><a href="/api">API List</a></p>');


});

app.get('/api', (req, res) =>{

    res.status(200).send('<p style="text-align:left; font-size:40px"><b>API Lists</b><br>*<a href="/api/randomNum">Random Number generator</a><br>*<a href="/hello-world">Hello world</a><br>*<a href="/api/pi:5">Pi*Var</a>');


});


app.get('/hello-world', (req, res) => {
    return res.status(200).send('<p style="text-align:center; font-size:80px"><b>Hello World</b></p>')
    });  //get route
  
  
app.get('/api/randomNum', (req, res)=> {
    (async () => {
  
        try{
  
            let myNum = String(Math.floor(Math.random()*100))
            
            return res.status(200).send(parse(myNum));
  
        }catch(error){
            console.log(error);
            return res.status(500).send(error);
            
        }
  
    })();
});

app.get('/api/pi:value', (req, res)=> {
    (async () => {
  
        try{
            let value = req.params.value.replace(":", "");
  
            let output = String(parseFloat(value)*3.1416);
            console.log(output)
            
            return res.status(200).send(parse(output));
  
        }catch(error){
            console.log(error);
            return res.status(500).send(error);
            
        }
  
    })();
});

app.get('/api/blogs/:year/:month', (req, res) => {
    res.send(req.params); //will send a json array 
});

app.get('/api/products', (req, res) => {
    res.send(products); //will send a json array 
});

app.get('/api/products/:id', (req, res) => {
        let myProduct = products.find(c => c.id === parseInt(req.params.id));
        if(!myProduct){
            res.status(404).sendfile("404.html")
        }
        else{
            res.status(200).send(myProduct)
        }  
});

app.post('/api/products', (req, res) => {

    

    
    if(req.body.price == null || req.body.price == ""){
        req.body.price = "Free";
    }
    

    

    const product = {
        id: products.length +1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(product);
    //let jsonData = JSON.stringify(product);
    //console.log(jsonData);
    //productJSON[products.length+1] = jsonData;
    res.send(product);
});

//updating

app.put('/api/products/:id', (req, res) => {

    let myProduct = products.find(c => c.id === parseInt(req.params.id));
        if(!myProduct){
            res.status(404).sendfile("404.html");
            return;
        }
        else{
            //const rslt = productValidator(myProduct);
        
            if(req.body.price == null || req.body.price == ""){
                req.body.price = "Free";
            }
            
            myProduct.name = req.body.name;
            myProduct.price = req.body.price;
            res.send(myProduct);
        }  

});


//delte

app.delete('/api/products/:id', (req, res) => {

    let myProduct = products.find(c => c.id === parseInt(req.params.id));
    if(!myProduct){
        res.status(404).sendfile("404.html");
        return;
    }
    else{
        const index = products.indexOf(myProduct);

        products.splice(index, 1);

        res.send(products);
    }  




});

function productValidator(product){

    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(product, schema);

}







//for hosting env

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log("Listening on port "+ port+"......"));




