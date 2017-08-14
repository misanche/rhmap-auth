var fh = require("fh-mbaas-api");

module.exports = function (auth, spec) {

    return function protect (request, response, next) {
        var params = {
            token: request.body.token
        }
        if (spec != undefined) {
            if (spec.groups) {
                params.groups = spec.groups
            }
        }
        fh.service({
            "guid": auth.SAMLAuthProjId,
            "path": "/session/valid",
            "method": "POST",
            "params": params
        }, function(err, body, service_res) {
            if (err) {
                // An error occurred
                console.log('Service call failed: ', err, service_res);
                return err;
            } else {
                console.log('response auth ok', body, service_res);
                if (service_res.statusCode == 200) {
                    return next();
                } else {
                    return response.status(service.statusCode).send(body);
                }
                
                
            }
        });
    }
};
