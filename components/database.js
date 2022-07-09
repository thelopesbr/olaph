const mongoose =  require('mongoose');
mongoose.Promise = global.Promise
exports.connect = (client) => {
    var response = ''
    try{
        mongoose.connect(`mongodb+srv://olaph:bytejr.X8@olaphdb.y5nhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then(() => {
        }).catch((err) => {
            response = '❌ Erro encontrado: \n'+ err.stack || err.message || err
        })  
        response = '✅ Conectado a database' 
    }catch (err) {
        response = '❌ Erro encontrado: \n'+ err.stack || err.message || err
    }
    return  console.log(response)
}

