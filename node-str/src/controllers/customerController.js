//Fazendo importações necessarias
const validationContract = require('../validators/fluentValidator.js');
const repository = require('../repositories/customerRepository');

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
    let contract = new validationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'Email invalido');
    contract.hasMinLen(req.body.password, 3, 'A senha deve conter pelo menos 3 caracteres');

    //Se os dados forem invalidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create(req.body);
        res.status(201).send({
            message: "Cliente cadastrado com sucesso"
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao precessar sua requisição"
        });
    }
}