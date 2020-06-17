module.exports = class Chart {
    constructor(idCarrinho, idClienteFK, gerouPedido) {
        this.idCarrinho = idCarrinho;
        this.idClienteFK = idClienteFK;
        this.gerouPedido = gerouPedido;
    }
}