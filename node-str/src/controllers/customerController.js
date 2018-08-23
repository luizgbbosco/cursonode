//Fazendo importações necessarias
const validationContract = require('../validators/fluentValidator.js');
const repository = require('../repositories/customerRepository');
const md5 = require('md5');
const emailService = require('../services/emailService');
const authService = require('../services/authService');


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
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ['user']
        });

        emailService.send(req.body.email, 'Bem vindo', global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(201).send({
            message: "Cliente cadastrado com sucesso"
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({
                message: 'Usuario ou senha invalidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name,
                roles: customer.roles
            }
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.refreshToken = async (req, res, next) => {
    try {

        const token = req.body.token || req.query.token || req.headers['x-acess-token'];
        const data = await authService.decodeToken(token);

        const customer = await repository.getByid(data.id);

        if (!customer) {
            res.status(404).send({
                message: 'Cliente nao encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

