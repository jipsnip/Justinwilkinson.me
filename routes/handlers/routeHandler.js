const logger = require('tracer');


function handleSuccessResponse(req, res, resOptions){
    logger.trace(req.route.path);

    if(resOptions.type === 'json'){
        res.json(resOptions.data);
    }
}

function handleErrorResponse(req, res, statusCode, error){
    logger.trace(req.route.path);

    res.status(statusCode).send(error);
}