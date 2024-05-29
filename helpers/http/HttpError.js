const HttpError = class extends Error{
    /**
        @param code http status code
        @param message error message
    */
    constructor(code, message) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
    }
}

module.exports = HttpError;