const Response = require('../models/Response');
const ProviderSrv = require('../services/provider.srv');

module.exports = (app, models) => {
    const providerSrv = new ProviderSrv(models.Provider);
    
    
    app.get('/api/providers', async (req, res) => {
        const srvResp = await providerSrv.getProviders();
        if (srvResp.hasError)
            return res
            .status(404)
            .send(Response.constructResponseErrModel(srvResp.error.code || 404, srvResp.error.message));
        
        return res.send(Response.constructResponseModel(srvResp.data));
    });
    
    app.get('/api/provider/:id', async (req, res) => {
        const {id} = req.params;
        const srvResp = await providerSrv.getProviderById(id);
        
        if (srvResp.hasError)
            return res
            .status(404)
            .send(Response.constructResponseErrModel(srvResp.error.code || 404, srvResp.error.message));
        
        return res.send(Response.constructResponseModel(srvResp.data));
    });
    
    app.post('/api/provider', async (req, res) => {
        const {name} = req.body;
        const srvResp = await providerSrv.createProvider(name);
        
        if (srvResp.hasError)
            return res
            .status(409)
            .send(Response.constructResponseErrModel(srvResp.error.code || 409, srvResp.error.message));
        
        return res.send(Response.constructResponseModel(srvResp.data));
    });
    
    
    app.delete('/api/provider/:id', async (req, res) => {
        const {id} = req.params;
        const srvResp = await providerSrv.deleteProvider(id);
        
        if (srvResp.hasError)
            return res
            .status(404)
            .send(Response.constructResponseErrModel(srvResp.error.code || 404, srvResp.error.message));
        
        return res.send(Response.constructResponseModel(srvResp.data));
    });
    
    app.put('/api/provider/:id', async (req, res) => {
        const {id} = req.params;
        const srvResp = await providerSrv.updateProvider(id, req.body);
        
        if (srvResp.hasError)
            return res
            .status(409)
            .send(Response.constructResponseErrModel(srvResp.error.code || 409, srvResp.error.message));
        
        return res.send(Response.constructResponseModel(srvResp.data));
    });
    
};
