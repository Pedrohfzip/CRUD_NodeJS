const { Sequelize } = require("./bd");
const db = require("./bd");


const Products = db.sequelize.define('gerenciamentos', {
    name: Sequelize.STRING,
    qtd: Sequelize.INTEGER,
    price: Sequelize.INTEGER
})

module.exports = Products