var _ = require('underscore')
        , url = require('url')
        , debug = require("debug")("string")
        , error_code = require('../error');

function validator(param) {

}

validator.prototype.validate = function (data, path) {
    if (!_.isString(data)) {
        return error_code.error(error_code.ERR_TYPE, path, data);
    }
    if (_.isEmpty(url.parse(data).hostname)) {
        return error_code.error(error_code.ERR_TYPE, path, data);
    }
};

exports = module.exports = validator;
