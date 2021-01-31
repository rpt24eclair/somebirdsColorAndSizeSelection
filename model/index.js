const { Op } = require('sequelize');
const {
  Color, Size, Quantity, Shoecolor, Shoesize, Shoe,
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
          return shoeColors.map((x) => x.dataValues.color_id);
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
    return new Promise((resolve, reject) => {
      Shoesize.findAll({
        where: {
          shoe_id: id,
        },
      })
        .then((shoesizes) => {
          return shoesizes.map((x) => x.dataValues.size_id);
        })
        .then((sizeIDs) => {
          Size.findAll({
            where: {
              id: {
                [Op.or]: sizeIDs,
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
  quantity: (shoeID, colorID) => {
    return new Promise((resolve, reject) => {
      Quantity.findAll({
        where: {
          shoe_id: shoeID,
          color_id: colorID,
        },
      })
        .then((results) => {
          resolve(results.map((x) => ({
            size_id: x.dataValues.size_id, quantity: x.dataValues.quantity,
          })));
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const create = (details) => {
  let id;
  return Shoe.create({
    name: details.name,
    model: details.model,
  })
    .then((shoe) => {
      id = shoe.dataValues.id;
      const bulkColors = [];
      details.color.forEach((item) => {
        bulkColors.push({ shoe_id: shoe.dataValues.id, color_id: item });
      });
      return Shoecolor.bulkCreate(bulkColors);
    })
    .then(() => {
      const bulkSize = [];
      details.size.forEach((item) => {
        bulkSize.push({ shoe_id: id, size_id: item });
      });
      return Shoesize.bulkCreate(bulkSize);
    })
    .then(() => {
      const bulkQuantity = [];
      details.quantity.forEach((item) => {
        bulkQuantity.push({
          shoe_id: id, color_id: item.color, size_id: item.size, quantity: item.quantity,
        });
      });
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
      Shoesize.findOrCreate({
        where: { shoe_id: id, size_id: info.size },
      });
    })
    .then(() => {
      Quantity.update({
        quantity: info.quantity,
      }, {
        where: { shoe_id: id, color_id: info.color, size_id: info.size },
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
      Shoesize.destroy({
        where: {
          shoe_id: number,
        },
      });
    })
    .then(() => {
      Shoe.destroy({
        where: {
          id: number,
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
