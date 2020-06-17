module.exports = class Product {
    constructor(idProduto, descricao, precoUnit, caloria, idProdutorFK) {
        this.idProduto = idProduto;
        this.descricao = descricao;
        this.precoUnit = precoUnit;
        this.caloria = caloria;
        this.idProdutorFK = idProdutorFK;
    }
}