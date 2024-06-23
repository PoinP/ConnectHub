import {ValidationResult} from "./ValidationResult"

export class Validator {
    constructor (validationSchema) {
        this.validationSchema = validationSchema;
    }

    isValid() {
        for (const prop in this.validationSchema.getSchema()) {
            if (!this.validationSchema.getPropStatus(prop))
                return false;
        }
        
        return true;
    }

    validate(prop, value) {
        const conditions = this.validationSchema.getPropConditions(prop);

        for (const condition of conditions) {
            if (!condition.isValid(value))
                return new ValidationResult(false, condition.getMessage());
        }
        
        return new ValidationResult(true);
    }

    validateSchema(prop, status) {
        this.validationSchema.setPropStatus(prop, status)
    }
}