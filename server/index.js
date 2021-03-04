const express = require('express');
const bodyParser = require('body-parser');
const shoes = require('../model');

const app = express();
const PORT = '3001';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/shoes/:shoeId/colors', (req, res) => {
  const shoeId = req.params.shoeId;
  shoes.get.colors(shoeId)
    .then((result) => {
      //console.log(result)
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

app.get('/shoes/:shoeId/sizes', (req, res) => {
  const shoeId = req.params.shoeId;
  const mensSizes = [8, 9, 10, 11, 12, 13];
  const womensSizes = [5, 6, 7, 8, 9, 10];

  if (shoeId % 2 === 0) {
    //console.log(womensSizes)
    //console.log(womensSizes.map(size => {return {size: size}}))
    res.send(womensSizes.map(size => {return {size: size}}));
  } else {
    res.send(mensSizes.map(size => {return {size: size}}));
  }
  // shoes.get.sizes(shoeId)
  //   .then((result) => {
  //     res.send(result);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.end();
  //   });
});

app.get('/shoes/:shoeId/colors/:colorId/quantities', (req, res) => {
  const { shoeId, colorId } = req.params;
  shoes.get.quantity(shoeId, colorId)
    .then((result) => {
      console.log('result', result)
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

app.post('/shoes', (req, res) => {
  shoes.create(req.body)
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });
});

app.patch('/shoes/:shoeId', (req, res) => {
  shoes.update(req.params.shoeId, req.body)
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

app.delete('/shoes/:shoeId', (req, res) => {
  shoes.recycle(req.params.shoeId)
    .then(() => {
      res.end();
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});
