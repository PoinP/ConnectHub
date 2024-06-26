class ValidationSchema {
    constructor(schema) {
        this.schema = schema;
    }

    getSchema() {
        return this.schema;
    }

    setPropStatus(prop, state) {
        if (!this.schema.hasOwnProperty(prop))
            return;

        this.schema[prop].status = state;
    }

    getPropStatus(prop) {
        if (!this.schema.hasOwnProperty(prop))
            return null;

        return this.schema[prop].status;
    }

    getPropConditions(prop) {
        if (!this.schema.hasOwnProperty(prop))
            return null;

        return this.schema[prop].conditions;
    }
}

module.exports = { ValidationSchema }