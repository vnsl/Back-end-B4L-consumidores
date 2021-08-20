const knex = require('../conexao');

const cadastrarEndereco = async (req, res) => {
    const { consumidor } = req;
    const { endereco, cep, complemento } = req.body;

    try {

        const usuarioEncontrado = await knex('consumidor').where('id', consumidor.dadosConsumidor.id);

        if(!usuarioEncontrado[0]){
            res.status(404).json('Usuário não encontrado');
        }

        const cadastrarEndereco = await knex('endereco').insert({'consumidor_id': consumidor.dadosConsumidor.id, 'endereco': endereco, 'cep': cep, 'complemento': complemento}).returning('*');

        if (cadastrarEndereco.length === 0) {
            return res.status(400).json("O endereço não foi cadastrado.");
        }

        return res.status(200).json('Endereço cadastrado com sucesso');
        
        
    } catch (error) {
        return res.status(400).json(error.message);        
    }
}

const obterEndereco = async (req, res) => {
    const { consumidor } = req;

    try {
        const enderecoEncontrado = await knex('endereco').where('consumidor_id', consumidor.dadosConsumidor.id);

        if(!enderecoEncontrado[0]){
            res.status(404).json('Endereço não cadastrado');
        } 

        return res.status(200).json(enderecoEncontrado[0])
        
    } catch (error) {
        return res.status(400).json(error.message);
    }

}


module.exports = {
    cadastrarEndereco,
    obterEndereco
}