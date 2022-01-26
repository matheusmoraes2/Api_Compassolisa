class InvalidBody extends Error {
    constructor(erro) {
        super(`${erro} is invalid`)
        this.name = 'InvalidBody'
        this.idErro = 1
    }
}

module.exports = InvalidBody