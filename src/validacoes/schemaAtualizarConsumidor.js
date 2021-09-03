const yup = require('./configuracoes');

const schemaAtualizarUsuario = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    telefone: yup.string().required(),
    senha: yup.string()
});


module.exports =  schemaAtualizarUsuario;