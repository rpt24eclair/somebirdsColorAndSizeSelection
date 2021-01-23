const express = require('express');
const app = express();
const PORT = '3001';
const shoes = require('../model');
var bodyParser = require('body-parser')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/shoes/:shoeId/colors', (req, res) => {
  let shoeId = req.params.shoeId;
  shoes.get.colors(shoeId)
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.error(err);
    res.end();
  });
});

app.get('/shoes/:shoeId/sizes', (req, res) => {
  let shoeId = req.params.shoeId;
  shoes.get.sizes(shoeId)
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.error(err);
    res.end();
  });
});

app.get('/shoes/:shoeId/colors/:colorId/quantities', (req, res) => {
  let { shoeId, colorId } = req.params;
  shoes.get.quantity(shoeId, colorId)
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.error(err);
    res.end();
  });
});



/////////// CRUD

 // Create a new shoe
app.post('/shoes', (req, res) => {
  shoes.create(req.body)
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
    res.end;
  })
});

 // Retrieve all shoes
 app.get('/shoes', (req, res) => {
   console.log('getall')
   res.end()});

 // Retrieve a single shoe
 app.get('/shoes/:shoeId', (req, res) => {
   console.log('get')
   res.end()});

 // Update a shoe
 app.put('/shoes/:shoeId', (req, res) => {
   console.log('update')
   res.end()});

 // Delete a shoe
app.delete('/shoes/:shoeId', (req, res) => {
  let id = req.params.shoeId;
  shoes.recycle(id)
  .then(() => {
    res.end();
  })
  .catch(err => {
    console.error(err);
    res.end();
  })
});

app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});
