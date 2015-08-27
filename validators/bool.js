var _ = require('underscore')
        , debug = require('debug')('number')
        , error_code = require('../error');

function validator(param) {

}

validator.prototype.validate = function (data, path) {
    if (!_.isBoolean(data)) {
        return error_code.error(error_code.ERR_TYPE, path, data);
    }
};

exports = module.exports = validator;
