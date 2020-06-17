//client.js
module.exports = class Client {
    constructor(idCliente, emailCliente, cartaoCredito, senha) {
        this.idCliente = idCliente;
        this.emailCliente = emailCliente;
        this.cartaoCredito = cartaoCredito;
        this.senha = senha;
    }
}