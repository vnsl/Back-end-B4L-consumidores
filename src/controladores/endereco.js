const knex = require('../conexao');

const cadastrarEndereco = async (req, res) => {
    const { consumidor } = req;
    const { endereco, cep, complemento } = req.body;

    try {

        const usuarioEncontrado = await knex('consumidor').where('id', consumidor.dadosConsumidor.id);

        if(!usuarioEncontrado[0]){
            res.status(404).json('Usuário não encontrado');
        }
        
        const cadastrarEndereco = await knex('endereco').where('consumidor_id', '=', consumidor.dadosConsumidor.id).update({'endereco': endereco, 'cep': cep, 'complemento': complemento}).returning('*');

        if (cadastrarEndereco.length === 0) {
            return res.status(400).json("O endereço não foi cadastrado.");
        }

        return res.status(200).json('');
        
        
    } catch (error) {
        return res.status(400).json(error.message);        
    }
}

module.exports = {
    cadastrarEndereco
}