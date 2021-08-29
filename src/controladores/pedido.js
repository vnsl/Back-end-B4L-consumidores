const knex = require('../conexao');

const criarPedido = async (req, res) =>  {
    const { consumidor } = req;
    const { custoFinalCarrinho } = req.body;
    const { id } = req.params;

    try {
        const criarPedido = await knex('pedido').insert({'consumidor_id': consumidor.dadosConsumidor.id, 'restaurante_id': id, 'custo_final': Number(custoFinalCarrinho) }).returning('*');
        
        return res.status(200).json(criarPedido[0])

        
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const finalizarPedido = async (req, res) => {
    const { listaEditada } = req.body;
        
    try {                
       
        const finalizarPedido = await knex('detalhepedido').insert([...listaEditada]).returning('*');
        
        return res.status(200).json('');
    
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    criarPedido,
    finalizarPedido
}

