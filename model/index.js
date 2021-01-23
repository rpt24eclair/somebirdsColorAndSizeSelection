const { Color, Size, Quantity, Shoecolor, Shoesize, Shoe } = require('../db/index.js');
const { Op } = require('sequelize');

let randomNumberGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let get = {
  colors: (id) => {
    return new Promise((resolve, reject) => {
      Shoecolor.findAll({
        where: {
          shoe_id: id
        }
      })
      .then (shoeColors => {
        return shoeColors.map(x => x.dataValues.color_id);
      })
      .then(colorIDs => {
        Color.findAll({
          where: {
            id: {
              [Op.or]: colorIDs
            }
          }
        })
        .then(results => {
          resolve(results.map(x => x.dataValues));
        })
      })
      .catch(err => {
        reject(err);
      });
    });
  },
  sizes: (id) => {
    return new Promise((resolve, reject) => {
      Shoesize.findAll({
        where: {
          shoe_id: id
        }
      })
      .then (shoesizes => {
        return shoesizes.map(x => x.dataValues.size_id);
      })
      .then(sizeIDs => {
        Size.findAll({
          where: {
            id: {
              [Op.or]: sizeIDs
            }
          }
        })
        .then(results => {
          resolve(results.map(x => x.dataValues));
        })
      })
      .catch(err => {
        reject(err);
      });
    });
  },
  quantity: (shoeID, colorID) => {
    return new Promise((resolve, reject) => {
      Quantity.findAll({
        where: {
          shoe_id: shoeID,
          color_id: colorID
        }
      })
      .then(results => {
        resolve(results.map(x => ({ size_id: x.dataValues.size_id, quantity: x.dataValues.quantity })));
      })
      .catch(err => {
        reject(err);
      });
    });
  }
}

let create = (details) => {
  let id;
  return Shoe.create({
    name: details.name,
    model: details.model
  })
  .then((shoe) => {
    id = shoe.dataValues.id
    let bulkColors = [];
    details.color.forEach(item => {
      bulkColors.push({ shoe_id: shoe.dataValues.id, color_id: item })
    })
    return Shoecolor.bulkCreate(bulkColors);
  })
  .then((shoe) => {
    let bulkSize = [];
    details.size.forEach(item => {
      bulkSize.push({ shoe_id: id, size_id: item })
    })
    return Shoesize.bulkCreate(bulkSize);
  })
  .then((shoe) => {
    let bulkQuantity = [];
    details.quantity.forEach(item => {
      bulkQuantity.push({ shoe_id: id, color_id: item.color, size_id: item.size, quantity: item.quantity })
    })
    return Quantity.bulkCreate(bulkQuantity);
  })
  .catch(err => {
    console.error(err);
  });
};

let update = () => {

};

let recycle = (number) => {
  return Quantity.destroy({
    where: {
      shoe_id: number
    }
  })
  .then(() => {
    Shoecolor.destroy({
      where: {
        shoe_id: number
      }
    })
  })
  .then(() => {
    Shoesize.destroy({
      where: {
        shoe_id: number
      }
    })
  })
  .then(() => {
    Shoe.destroy({
      where: {
        id: number
      }
    })
  })
  .catch((err) => {
    console.log(err);
  });
}

module.exports = {
  get: get,
  create: create,
  update: update,
  recycle: recycle
}

// colors                                |
// | quantities                            |
// | shoecolors                            |
// | shoes                                 |
// | shoesizes                             |
// | sizes

// select * from quantities;
// +-------+---------+----------+---------+----------+
// | id    | shoe_id | color_id | size_id | quantity |
// +-------+---------+----------+---------+----------+
// |     2 |       1 |        1 |       7 |        0 |
// |     3 |       1 |        1 |       8 |        1 |
// |     4 |       1 |        1 |       9 |        4 |
// |     5 |       1 |        1 |      10 |        3 |
// |     6 |       1 |        1 |      11 |        2 |
// |     7 |       1 |        1 |      12 |        8 |
// |     8 |       1 |        1 |      13 |        6 |
// |     9 |       1 |        1 |      14 |        4 |
