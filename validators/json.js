var _ = require('underscore')
        , debug = require('debug')('number')
        , Validator = require('../validate')
        , error_code = require('../error');

function validator(param) {
    this.modelName = (param || "").trim();
}

validator.prototype.validate = function (data, path) {
    try {
        JSON.parse(data);
    } catch (e) {
        return error_code.error(error_code.ERR_TYPE, path, data);
    }
};

exports = module.exports = validator;
