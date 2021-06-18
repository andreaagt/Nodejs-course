const express = require('express');
const app = express();
const dotenv = require('dotenv')

dotenv.config();
/* Se usa para pasar los parámetros del body 
y ser leidos por el server, (req.body) */
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos de mongoo
const mongoose = require('mongoose')
const mongodb = process.env.MONGOURI 

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('connected')
  app.listen(3000);
}).catch(err => console.log(err))

// Conectar los modelos
const Item = require('./models/items');

// Configurar view engine con ejs
app.set('view engine', 'ejs');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.redirect('/get-items');
});

app.get('/create-item', (req, res) => {
  const item = new Item({
      name: 'computer',
      price: 2000
  });
  item.save().then(result => res.send(result))
});

app.get('/create-item', (req, res) => {
  const item = new Item({
      name: 'computer',
      price: 2000
  });
  item.save().then(result => res.send(result))
});

app.get('/get-item', (req, res) => {
  Item.findById('60cab31d5bef4a14d9329afb').then(result => res.send(result)).catch(err =>
  console.log(err))
});

app.get('/get-items', (req, res) => {
  Item.find().then(result => {
    //res.send(result)
    res.render('index',{items: result});
  }).catch(err => console.log(err))
});

app.get('/add-item', (req, res) => {
  res.render('add-item');
});

// action para el POST del FORM
app.post('/items', (req, res) => {
  console.log(req.body)
  const item = Item(req.body);
  item.save().then(() => {
    res.redirect('/get-items')
  }).catch(err => console.log(err))
});

// ver un item es especifico
app.get('/items/:id', (req, res) => {
  const id = req.params.id;
  Item.findById(id).then(result => {
    console.log('result', result);
    res.render('item-detail',{ item: result });
  })
});

// Eliminar un item
app.delete('/items/:id', (req, res) => {
  const id = req.params.id;
  Item.findByIdAndDelete(id).then(result => {
    res.json({ redirect: '/get-items' })
  })
})

// updates with modal
app.put('/items/:id', (req, res) => {
  const id = req.params.id;
  Item.findByIdAndUpdate(id, req.body).then(result => {
    res.json({ msg: 'Update Succesfully'})
  })
});

// Para usar por default cuando una página no existe
// Se necesita poner al final, en caso contrario
// se redirige esta pagina directamente
app.use((req, res) => {
  res.render('error');
});

