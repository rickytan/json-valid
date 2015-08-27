var _ = require('underscore')
        , debug = require("debug")("string")
        , error_code = require('../error');

function validator(param) {
    this.pattern = /^[\w.+]+@\w+(\.[a-zA-Z]{2,})+$/g;
    debug(this);
}

validator.prototype.validate = function (data, path) {
    if (!_.isString(data)) {
        return error_code.error(error_code.ERR_TYPE, path, data);
    }
    if (!this.pattern.test(data)) {
        return error_code.error(error_code.ERR_TYPE, path, data);
    }
};

exports = module.exports = validator;
