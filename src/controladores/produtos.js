const knex = require('../conexao');

const listarProdutos = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const listaDeProdutos = await knex('produto').where('restaurante_id', id);

         /* if(!listaDeProdutos[0]){
            return res.status(404).json('Não foi encontrado nenhum produto neste restaurante');
        }; */

        const cardapio = await knex('produto').where('ativo', true).andWhere('restaurante_id', id);

        
       /*  if(!cardapio[0]){
            return res.status(404).json('Restaurante não possui produtos ativos');
        } */

        const dadosRestaurante = await knex('restaurante').where('id', id);

        const urlCategoria = dadosRestaurante[0].categoria_id;

        const categoria = await knex.select('img_categoria').from('categoria').where('id', urlCategoria);

        // const restaurante = { restaurante: dadosRestaurante[0], cardapio };

        const restaurante = {
            id: dadosRestaurante[0].id,
            nome: dadosRestaurante[0].nome,
            categoria_id: dadosRestaurante[0].categoria_id,
            img_categoria: categoria[0].img_categoria,
            taxa_entrega: dadosRestaurante[0].taxa_entrega,
            tempo_entrega_minutos: dadosRestaurante[0].tempo_entrega_minutos,
            valor_minimo_pedido: dadosRestaurante[0].valor_minimo_pedido,
            imagem: dadosRestaurante[0].imagem,
            descricao: dadosRestaurante[0].descricao,
            cardapio: cardapio
        }

        return res.status(200).json(restaurante);

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    listarProdutos
};