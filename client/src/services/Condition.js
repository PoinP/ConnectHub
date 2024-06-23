export class Condition {
    constructor (validatorFunc, messageIfFalse) {
        this.isValid = validatorFunc;
        this.message = messageIfFalse;
    }

    getMessage() {
        return this.message;
    }

    isValid(value) {
        return this.isValid(value);
    }
}