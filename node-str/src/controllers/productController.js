//Fazendo importações necessarias
const mongoose = require('mongoose');
const Product = mongoose.model('product');
const validationContract = require('../validators/fluentValidator.js');
const repository = require('../repositories/productRepository.js');

//Pesquisar buscando aparecendo o titulo preço e slug, alem de trazer o id
exports.get = (req, res, next) => {
    repository.get()
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

//Pesquisando os itens pelo slug
exports.getBySlug = (req, res, next) => {
    repository.getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

//Pesquisando os itens por id
exports.getById = (req, res, next) => {
    repository
        .getById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

//Pesquisando itens pelas tags
exports.getByTag = (req, res, next) => {
    repository.getByTag(req.params.tag)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });

}

//Cadastrando novos itens
exports.post = (req, res, next) => {
    let contract = new validationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

    //Se os dados forem invalidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository.create(req.body)
        .then(x => {
            res.status(201).send({ message: "Produto cadastrado com sucesso" });
        }).catch(e => {
            res.status(400).send({
                message: "Falha ao cadastrar produto",
                data: e
            });
        });

};

//Editando itens ja existentes no banco
exports.put = (req, res, next) => {
    repository.update(req.params.id, req.body)
        .then(x => {
            res.status(200).send({
                message: 'Produto atualizado com sucesso'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar produto',
                data: e
            });
        });
};

//Deletando itens existentes no banco 
exports.delete = (req, res, next) => {
    repository.delete(req.body.id)
        .then(x => {
            res.status(200).send({
                message: 'Produto removido com sucesso'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao remover produto',
                data: e
            });
        });
};
