//Fazendo importações necessarias
const mongoose = require('mongoose');
const Product = mongoose.model('product');
const validationContract = require('../validators/fluentValidator.js');

//Pesquisar buscando aparecendo o titulo preço e slug, alem de trazer o id
exports.get = (req, res, next) => {
    Product.find({
        active: true
    }, 'title price slug')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

//Pesquisando os itens pelo slug
exports.getBySlug = (req, res, next) => {
    Product.
        findOne({
            slug: req.params.slug,
            active: true
        })
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

//Pesquisando os itens por id
exports.getById = (req, res, next) => {
    Product.findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

//Pesquisando itens pelas tags
exports.getByTag = (req, res, next) => {
    Product
        .find({
            tags: req.params.tag,
            active: true
        }, 'title price slug tags')
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

    var product = new Product(req.body);
    product.save()
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
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description.description,
                price: req.body.price,
                slug: req.body.slug
            }
        }).then(x => {
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
    Product
        .findOneAndRemove(req.body.slug)
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
