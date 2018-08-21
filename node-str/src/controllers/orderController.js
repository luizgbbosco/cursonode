//Fazendo importações necessarias
const validationContract = require('../validators/fluentValidator.js');
const repository = require('../repositories/orderRepository.js');
const guid = require('guid');

//Pesquisar 
exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

//Cadastrando novos itens
exports.post = async (req, res, next) => {
    try {
        await repository.create({
            customer: req.body.customer,
            number: guide.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({
            message: "Pedido cadastrado com sucesso"
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao precessar sua requisição"
        });
    }
}
