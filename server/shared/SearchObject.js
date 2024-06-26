const ContactSearch = require("../services/PredictiveSearch/ContactSearch");

class SearchObject {
    constructor() {
        this.predictors = new Map();
    }

    addPredictor(userId, contact) {
        if (!this.predictors.get(userId.toString())) {
            this.predictors.set(userId.toString(), new ContactSearch())
        }

        const predictor = this.getPredictor(userId);
        predictor.addContact(contact);
    }

    updatePredictor(userId, contact) {
        if (!this.predictors.has(userId.toString()))
            return;

        const predictor = this.predictors.get(userId.toString());
        predictor.updateContact(contact);
    }

    deletePredictor(userId, contact) {
        if (!this.predictors.has(userId.toString()))
            return;
        
        const predictor = this.predictors.get(userId.toString());
        predictor.removeData(contact.id);
        predictor.print();
    }

    getPredictor(userId) {
        if (!this.predictors.has(userId.toString()))
            return null;

        return this.predictors.get(userId.toString());
    }
}

const searchObject = new SearchObject();

module.exports = searchObject;