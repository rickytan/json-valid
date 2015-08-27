
var error_code = {
    ERR_TYPE: 1000,
    ERR_LIMIT: 1001,
    ERR_NOT_EXIST: 1002
};

// Functions which will be available to external callers
exports = module.exports = error_code;

exports.error = function(code, path, value) {
    var err;
    var msg;
    switch(code) {
        case error_code.ERR_TYPE:
            msg = "Data field " + path.join('.') + " type error";
            break;
        case error_code.ERR_NOT_EXIST:
            msg = "Data field " + path.join('.') + " doesn't exist";
            break;
        case error_code.ERR_LIMIT:
            msg = "Data field " + path.join('.') + " doesn't meet limits";
            break;
        default:
            msg = "Data field " + path.join('.') + " has unknown error";
            break;
    }
    err = new Error(msg);
    err.code = code;
    err.dataField = path.join('.');
    if (value) {
        err.value = value;
    }
    return err;
};
