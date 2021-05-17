const AsyncFunctionResponse = require('../models/AsyncFunctionResponse');
const errorMessages = require('../utils/errorMessages');

class ProviderSrv {
    constructor(model) {
        this.model = model;
    }
    
    async createProvider(name) {
        try {
            const isExist = await this.model.findOne({name});
            if (isExist) {
                const err = new Error(errorMessages.providerNameAlreadyExists);
                return AsyncFunctionResponse.constructResponseErrModel(err);
            }
            
            const provider = await this.model({name}).save();
            return AsyncFunctionResponse.constructResponseModel(provider);
        } catch (err) {
            return AsyncFunctionResponse.constructResponseErrModel(err);
        }
    }
    
    async getProviders() {
        try {
            const providers = await this.model.find().lean();
            if (!providers) {
                const err = new Error(errorMessages.providerNotFound);
                return AsyncFunctionResponse.constructResponseErrModel(err);
            }
            return AsyncFunctionResponse.constructResponseModel(providers.reverse());
        } catch (err) {
            return AsyncFunctionResponse.constructResponseErrModel(err);
        }
    }
    
    async getProviderById(id) {
        try {
            const provider = await this.model.findOne({_id: id});
            if (!provider) {
                const err = new Error(errorMessages.providerNotFound);
                return AsyncFunctionResponse.constructResponseErrModel(err);
            }
            return AsyncFunctionResponse.constructResponseModel(provider);
        } catch (err) {
            return AsyncFunctionResponse.constructResponseErrModel(err);
        }
    }
    
    
    async deleteProvider(id) {
        try {
            const provider = await this.model.findOneAndDelete({_id: id});
            if (!provider) {
                const err = new Error(errorMessages.providerNotFound);
                return AsyncFunctionResponse.constructResponseErrModel(err);
            }
            return AsyncFunctionResponse.constructResponseModel(provider);
        } catch (err) {
            return AsyncFunctionResponse.constructResponseErrModel(err);
        }
    }
    
    async updateProvider(id, body) {
        const {name} = body;
        const isExist = await this.model.findOne({name});
        if (isExist) {
            const err = new Error(errorMessages.providerNameAlreadyExists);
            return AsyncFunctionResponse.constructResponseErrModel(err);
        }
        try {
            const provider = await this.model.findByIdAndUpdate({_id: id}, body, {new: true}).lean();
            
            return AsyncFunctionResponse.constructResponseModel(provider);
        } catch (err) {
            return AsyncFunctionResponse.constructResponseErrModel(err);
        }
    }
}

module.exports = ProviderSrv;
