var _ = require('underscore')
        , debug = require('debug')('validate')
        , error_code = require('./error');


var custom_models = {};

var validator = function (model) {
    this.model = model;
    this.errors = [];
};


function validate(data, model, path) {
    path = path || [];
    debug("Data:", data);
    debug("Model:", model);
    debug("Path: ", path)
    _.each(model, function (v, k) {
        if (_.isObject(v)) {
            validate.call(this, data[k], v, path.concat([k]));
        } else if (_.isString(v)) {
            var type = v.split(':')[0];
            var param = v.split(':')[1];
            var optional = _.last(type) === '?';
            if (optional) {
                type = type.slice(0, -1).trim();
            }
            debug("Type:", type);
            if (!optional && typeof data[k] === 'undefined') {
                this.errors.push(error_code.error(error_code.ERR_NOT_EXIST, path.concat([k])));
            } else if (data[k]) {
                var type_validator;
                try {   // try inner type
                    type_validator = require('./validators/' + type.toLowerCase());
                    var error = new type_validator(param).validate(data[k], path.concat([k]));
                    if (!_.isEmpty(error)) {
                        this.errors.push(error);
                    }
                } catch (e) {   // otherwise use use defined models
                    var model = validator.model(type);
                    if (model) {
                        validate.call(this, data[k], model, path.concat([k]));
                    } else {
                        throw new Error("Undefined model " + type);
                    }
                }
            }
        } else {
            this.errors.push(new Error("Model gramma error!"));
        }
    }, this);
}

validator.define = function (name, model) {
    custom_models[name] = model;
};

validator.model = function (name) {
    return custom_models[name];
};

validator.prototype.validate = function (data, path) {
    this.errors = [];
    validate.call(this, data, this.model, path);
    this.errors = _.flatten(this.errors);
    return this.errors;
};

exports = module.exports = validator;
