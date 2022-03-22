const Sequelize = require("sequelize");
const sequelize = new Sequelize('gerenciamento', 'root', 'pedro89982442', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then( () => {
    console.log('Conexão estabelecida')
}).catch( (e) => {
    console.log(`Erro na conexão com o banco de dados ERRO : ${e}`)
})

module.exports = {
    Sequelize : Sequelize,
    sequelize : sequelize
}
