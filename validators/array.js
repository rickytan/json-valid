var _ = require('underscore')
        , debug = require('debug')('number')
        , Validator = require('../validate')
        , error_code = require('../error');

function validator(param) {
    this.modelName = (param || "").trim();
}

validator.prototype.validate = function (data, path) {
    if (!_.isArray(data)) {
        return error_code.error(error_code.ERR_TYPE, path);
    }

    if (!_.isEmpty(this.modelName)) {
        var model = Validator.model(this.modelName);
        if (!model) {
            throw new Error("Undefined model " + this.modelName);
        }
        
        return _.compact(_.map(data, function (d, idx) {
            var valid = new Validator(model);
            var errors = valid.validate(d, path.concat([idx]));
            return errors;
        }));
    }
};

exports = module.exports = validator;
