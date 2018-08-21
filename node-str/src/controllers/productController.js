//Fazendo importações necessarias
const validationContract = require('../validators/fluentValidator.js');
const repository = require('../repositories/productRepository.js');

//Pesquisar buscando aparecendo o titulo preço e slug, alem de trazer o id
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

//Pesquisando os itens pelo slug
exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao precessar sua requisição"
        });
    }

}

//Pesquisando os itens por id
exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao precessar sua requisição"
        });
    }
}

//Pesquisando itens pelas tags
exports.getByTag = async (req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao precessar sua requisição"
        });
    }
}


//Cadastrando novos itens
exports.post = async (req, res, next) => {
    let contract = new validationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

    //Se os dados forem invalidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create(req.body);
        res.status(201).send({
            message: "Produto cadastrado com sucesso"
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao precessar sua requisição"
        });
    }
}

//Editando itens ja existentes no banco
exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Produto atualizado com sucesso'
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao precessar sua requisição"
        });
    }
}

//Deletando itens existentes no banco 
exports.delete = async (req, res, next) => {
    try {
        console.log(req.params.id);
        await repository.delete(req.params.id);
        res.status(200).send({
            message: 'Produto removido com sucesso'
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao precessar sua requisição"
        });
    }
}
