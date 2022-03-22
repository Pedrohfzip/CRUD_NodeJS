const express = require("express")
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const Product = require('./Models/Products')
const app = express()
const PORT = 4000;

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Handlebars config
app.engine('handlebars', engine());
app.set('view engine', 'handlebars')

// { Rotas }

    //Dashboard Page
    app.get('/', (req,res) => {
        Product.findAll({order:[['id', 'DESC']]}).then( (products) => {
            res.render('dashboard', {products: products})
        })
    })


    //Add form page
    app.get('/cadastrar', (req,res) => {
        res.render('cadastrar');
    })

    //Add route Database
    app.post('/add', (req,res) => {
        
        Product.create({
            name: req.body.name,
            qtd: req.body.quantidade,
            price: req.body.price,
        }).then( () => {
            console.log('Cadastro realizado')
            res.redirect('/cadastrar');
        }).catch( (e) =>{
            console.log(`Erro no cadastro ${e} `)
        })
    })

    //Delete route Database
    app.get("/delete/:id", (req,res) => {
        Product.destroy(
            {where: 
                {'id': Number(req.params.id)}
            }
        ).then( () => {
            console.log("Produto Excluido")
            res.redirect('/');
        }).catch( (e) => {
            console.log(`ERRO na exclusão: ${e}`)
        })
    })

    app.get('/edit/:id', (req,res) => {
        Product.findOne(
            {where: {'id': Number(req.params.id)}}
        ).then( (products) => {
            res.render('edit', {products: products})
        })
    })

    //Edit route Database
    app.get('/update/', (req,res) => {
        res.render('update')
    })
    app.post("/update/:id", (req,res) => {
        Product.update(
            {
                name: req.body.name,
                qtd: req.body.quantidade,
                price: req.body.price
            },
            {where: {'id': Number(req.params.id)}}
        ).then( () => {
            console.log("Produto Excluido")
            res.redirect(`/edit/${req.params.id}`);
        }).catch( (e) => {
            console.log(`ERRO na exclusão: ${e}`)
        })
    })


//server express
app.listen(PORT, ()=>{
    console.log("Servidor iniciado");
})
