const knex = require('../conexao');

const listarRestaurantes = async (req, res) => {
    const { usuario } = req;

    try {
        const listaDeRestaurantes = await knex('restaurante');

         if(!listaDeRestaurantes[0]){
            return res.status(404).json('Não foi encontrado nenhum restaurante');
        }

        return res.status(200).json(listaDeRestaurantes);

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    listarRestaurantes
};