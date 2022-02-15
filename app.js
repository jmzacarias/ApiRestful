const express = require('express');

const app = express();
const server = app.listen(8080, ()=>console.log('Escuchando en puerto 8080'));

const productos = [
    {title: 'manzana',
    price: 50,
    thumbnail: 'https://img.huffingtonpost.com/asset/5ef9ffab250000a502c28ec2.jpeg?ops=scalefit_720_noupscale',
    id: 1
    },
    {title: 'pera',
    price: 45,
    thumbnail: 'https://perfumesyfragancias.online/wp-content/uploads/2018/10/poire.jpg',
    id: 2
    },
    {title: 'banana',
    price: 60,
    thumbnail: 'https://hdstatic.net/gridfs/holadoctor/55803ef0b93795c1498b4567-1593215415,863.jpg',
    id: 3
    }
]

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/api/productos',(req,res)=>{
    res.send({status: 'succes', payload: productos})
})

app.get('/api/productos/:id',(req,res)=>{
    let id = req.params.id;
    if(isNaN(id)) return res.status(400).send({error: `${id} is not a number`})
    if(id > productos.length|| id <= 0) res.send({error: 'Out of bounds'})
    let productById = productos.find((e)=>{
        return e.id == id
    });
    res.send({status:'succes', payload: productById})
})

app.post('/api/productos',(req,res)=>{
    let clientProduct = req.body;
    if(!clientProduct.title || !clientProduct.price || !clientProduct.thumbnail) return res.status(400).send({error: 'Missing field'});
    if(isNaN(clientProduct.price)) return res.status(400).send({error: 'Price must be a number'})
    let id = productos.length + 1
    clientProduct.id= id;
    productos.push(clientProduct);
    res.send({product: clientProduct});
})

app.put('/api/productos/:id',(req,res)=>{
    let param = req.params.id;
    if(isNaN(param)) return res.status(400).send({error: `${param} is not a number`})
    if(param > productos.length|| param <= 0) res.send({error: 'Out of bounds'})
    let productId = parseInt(param);
    let clientProduct = req.body;
    if(!clientProduct.title || !clientProduct.price || !clientProduct.thumbnail) return res.status(400).send({error: 'Missing field'});
    if(isNaN(clientProduct.price)) return res.status(400).send({error: 'Price must be a number'})
    clientProduct.id = productId;
    let foundProduct = productos.find((e)=>e.id===productId);
    let index = productos.indexOf(foundProduct);
    productos[index] = clientProduct;
    res.send({updatedProduct: productos});    
})

app.delete('/api/productos/:id',(req,res)=>{
    let param = req.params.id;
    if(isNaN(param)) return res.status(400).send({error: `${param} is not a number`})
    if(param > productos.length|| param <= 0) res.send({error: 'Out of bounds'})
    let productId = parseInt(param);
    let foundProduct = productos.find((e)=>e.id===productId);
    let index = productos.indexOf(foundProduct);
    productos.splice(index,1);
    res.send({updatedProducts: productos});    
})