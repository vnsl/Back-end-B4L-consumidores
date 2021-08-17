const knex = require('../conexao');

const listarProdutos = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const listaDeProdutos = await knex('produto').where('restaurante_id', id);

         if(!listaDeProdutos[0]){
            return res.status(404).json('Não foi encontrado nenhum produto neste restaurante');
        };

        const listaDeProdutosAtivos = await knex('produto').where('ativo', true);

        if(!listaDeProdutosAtivos[0]){
            return res.status(404).json('Restaurante não possui produtos ativos');
        }

        return res.status(200).json(listaDeProdutosAtivos);

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    listarProdutos
};