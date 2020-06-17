module.exports = class Kit {
    constructor(idKit, descricaoKit, precoKit, idProdutorFK) {
        this.idKit = idKit;
        this.descricaoKit = descricaoKit;
        this.precoKit = precoKit;
        this.idProdutorFK = idProdutorFK;
    }
}