const mongoose =  require('mongoose');

mongoose.set('strictQuery', false);


mongoose.Promise = global.Promise
exports.connect = () => {
    var response = ''
    try{
        mongoose.connect(`mongodb+srv://olaph:bytejr.X8@olaphdb.y5nhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then(() => {
        }).catch((err) => {
            response = '❌ Erro encontrado ao se conectar com o banco de dados: \n'+ err.stack || err.message || err
        })  
        response = '✅ Conectado a database' 
    }catch (err) {
        response = '❌ Erro encontrado ao se conectar com o banco de dados: \n'+ err.stack || err.message || err
    }
    return  console.log(response)
}

