var _ = require('underscore')
        , debug = require('debug')('number')
        , error_code = require('../error');

function validator(param) {
    this.minValue = Number.MIN_VALUE;
    this.minInclude = false;

    this.maxValue = Number.MAX_VALUE;
    this.maxInclude = false;

    var reg = /([\[\(]?)((\d*\.\d+)|(\d+)),((\d*\.\d+)|(\d+))([\]\)]?)/g;
    var match;
    while (match = reg.exec(param)) {
        if (match[1] === '[') {
            this.minInclude = true;
        }
        this.minValue = +match[2];
        this.maxValue = +match[5];
        if (match[8] === ']') {
            this.maxInclude = true;
        }
        break;
    }
    debug(this);
}

validator.prototype.validate = function (data, path) {
    if (!_.isNumber(data)) {
        return error_code.error(error_code.ERR_TYPE, path, data);
    }
    if (!((this.minInclude && data >= this.minValue || data > this.minValue) &&
            (this.maxInclude && data <= this.maxValue || data < this.maxValue))) {
        return error_code.error(error_code.ERR_LIMIT, path, data);
    }
};

exports = module.exports = validator;
