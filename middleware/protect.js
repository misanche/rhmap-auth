var fh = require("fh-mbaas-api");

module.exports = function (auth, spec) {

    return function protect (request, response, next) {
        fh.service({
            "guid": auth.SAMLAuthProjId,
            "path": "/session/valid",
            "method": "POST",
            "params": {
                token: request.body.token
            }
        }, function(err, body, service_res) {
            console.log('call', body, service_res);
            if (err) {
                // An error occurred
                console.log('Service call failed: ', err, service_res);
                return err;
            } else {
                return next();
            }
        });
    }
};
