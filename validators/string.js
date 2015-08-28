var _ = require('underscore')
        , debug = require("debug")("string")
        , error_code = require('../error');

function validator(param) {
    this.pattern = /.*/g;
    if (param) {
        var reg = /(\d+),(\d+)/g;
        var match = reg.exec(param);
        if (_.isString(param) && !_.isEmpty(match)) {
            this.pattern = new RegExp(".{" + match[1] + "," + match[2] + "}", 'g');
        } else {
            this.pattern = new RegExp(param, 'g');
        }
    }
    debug(this);
}

validator.prototype.validate = function (data, path) {
    if (!_.isString(data)) {
        return error_code.error(error_code.ERR_TYPE, path, data);
    }
    if (!this.pattern.test(data)) {
        return error_code.error(error_code.ERR_LIMIT, path, data);
    }
};

exports = module.exports = validator;
