const modelComunicado = require('../models/comunicado');
const crypto = require('crypto');
const email = require('../servicos/email');

async function index(req, res) {
    const cod_comunicado = req.params.cod_comunicado;
    const comunicados = await modelComunicado.listar(cod_comunicado);
    
    var lista_comunicados = {};

    if (comunicados) {
        lista_comunicados.responsavel_comunicado = comunicados.responsavel_comunicado
        lista_comunicados.email_comunicado = comunicados.email_comunicado
        lista_comunicados.hash_comunicado = comunicados.hash_comunicado
        lista_comunicados.respostas = []

        comunicados.forEach(resposta => {
            lista_comunicados.respostas.push({
                author: resposta.autor_resposta,
                conteudo: resposta.conteudo_resposta,
                data: resposta.data_resposta
            })
        });
    }

    res.json({lista_comunicados: lista_comunicados});
}

async function retornarTodosComunicados(req, res){
    const retorno = await modelComunicado.listarTodosComunicado();
    res.json({retorno:retorno});
}

function criarComunicado(req, res) {
    const {
        responsavel_comunicado,
        email_comunicado,
        cod_dpo,
    } = req.body;

    var hash_comunicado = crypto.randomBytes(6).toString('HEX')

    const comunicado = modelComunicado.criar(responsavel_comunicado, email_comunicado, hash_comunicado, cod_dpo)
    email.enviarEmail('Recebemos sua mensagem.', 'Recebemos sua mensagem! Em breve o DPO entrará em contato com você.', email_comunicado, responsavel_comunicado, hash_comunicado);
    res.json({comunicado: comunicado});
}

module.exports = {
    index,
    criarComunicado,
    retornarTodosComunicados
}