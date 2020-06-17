module.exports = class Order {
    constructor(idPedido, idClienteFK, idProdutorFK, statusPedido, idInstituicaoFK) {
        this.idPedido = idPedido;
        this.idClienteFK = idClienteFK;
        this.idProdutorFK = idProdutorFK;
        this.statusPedido = statusPedido;
        this.idInstituicaoFK = idInstituicaoFK;
    }
}