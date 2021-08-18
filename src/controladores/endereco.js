const knex = require('../conexao');

const cadastrarEndereco = async (req, res) => {
    const { consumidor } = req;
    const { endereco } = req.body;

    try {
        const { dadosConsumidor } = consumidor;        
        const usuarioEncontrado = await knex('consumidor').where('id', consumidor.id);

        if(!usuarioEncontrado[0]){
            res.status(404).json('Usuário não encontrado');
        }

        const cadastrarEndereco = await knex('endereco').insert(endereco).returning('*');

        if (cadastrarEndereco.length === 0) {
            return res.status(400).json("O endereço não foi cadastrado.");
        }

        return res.status(200).json('Endereço cadastrado com sucesso');
        
        
    } catch (error) {
        return res.status(400).json(error.message);        
    }
}

module.exports = {
    cadastrarEndereco
}