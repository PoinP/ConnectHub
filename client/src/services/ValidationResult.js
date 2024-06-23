export class ValidationResult {
    constructor(isValid, message = "") {
        this.isValid = isValid;
        this.message = message;
    }

    getIsValid() {
        return this.isValid;
    }

    getMessage() {
        return this.message;
    }
}