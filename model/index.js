const { Op } = require('sequelize');
const {
  Color, Quantity, Shoecolor, Shoe,
} = require('../db/index.js');

const get = {
  colors: (id) => {
    return new Promise((resolve, reject) => {
      Shoecolor.findAll({
        where: {
          shoe_id: id,
        },
      })
        .then((shoeColors) => {
          return shoeColors[0].dataValues.color_id.split(',')
        })
        .then((colorIDs) => {
          Color.findAll({
            where: {
              id: {
                [Op.or]: colorIDs,
              },
            },
          })
            .then((results) => {
              resolve(results.map((x) => x.dataValues));
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  sizes: (id) => {
    const mensSizes = [8, 9, 10, 11, 12, 13];
    const womensSizes = [5, 6, 7, 8, 9, 10];
    if (id % 2 === 0) {
      return womensSizes.map(size => {return {size: size}});
    } else {
      return mensSizes.map(size => {return {size: size}});
    }
  },
  quantity: (shoeID, colorID) => {
    return new Promise((resolve, reject) => {
      Quantity.findAll({
        where: {
          shoe_id: shoeID,
          color_id: colorID,
        },
      })
        .then((results) => {
          let string = results[0].dataValues.quantity;
          let arr = string.split('-')
          let objs = arr.map(quant => {
            let each = quant.split(',');
            let obj = {};
            obj.size_id = each[0].split(':')[1];
            obj.quantity = each[1].split(':')[1];
            return obj;
          })
          resolve(objs)
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const create = (details) => {
  return Shoe.create({
    name: details.name,
    model: details.model,
  })
    .then(() => {
      return Shoecolor.create({ shoe_id: details.model, color_id: details.color.toString() });
    })
    .then(() => {
      const bulkQuantity = [];
      details.color.forEach(color => {
        bulkQuantity.push({shoe_id: details.model, color_id: color, quantity: details.quantity.toString()});
      })

      return Quantity.bulkCreate(bulkQuantity);
    })
    .catch((err) => {
      console.error(err);
    });
};

const update = (id, info) => {
  return Shoe.update({
    name: info.name,
    model: info.model,
  }, {
    where: { id },
    returning: true,
    plain: true,
  })
    .then(() => {
      Shoecolor.findOrCreate({
        where: { color_id: info.color, shoe_id: id },
      });
    })
    .then(() => {
      Quantity.update({
        quantity: info.quantity,
      }, {
        where: { shoe_id: id, color_id: info.color },
        returning: true,
        plain: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const recycle = (number) => {
  return Quantity.destroy({
    where: {
      shoe_id: number,
    },
  })
    .then(() => {
      Shoecolor.destroy({
        where: {
          shoe_id: number,
        },
      });
    })
    .then(() => {
      Shoe.destroy({
        where: {
          model: number,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  get, create, update, recycle,
};
