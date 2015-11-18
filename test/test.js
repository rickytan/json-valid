var Validator = require('../validate');

var data0 = {
    user: "ricky",
    age: 17,
    vip: false,
    optional_field0: 'option0',
    optional_field1: 'not_a_email'
};

var data1 = {
    user: "rickylonglonglonglonglonglonglonglonglonglong",
    age: 25,
    phone: "18888888880",
    vip: true,
    optional_field1: 'ricky.tan.xin@gmail.com'
};

var model0 = {
    user: 'string:5,20',
    phone: 'string?:1\\d{10}',
    age: 'number:[10,18)',
    vip: 'bool',
    optional_field0: 'string?',
    optional_field1: 'email?'
};

var valid0 = new Validator(model0);

console.log(valid0.validate(data0));
console.log(valid0.validate(data1));

var data2 = {
    user: {
        username: 'Ricky',
        age: 25,
        avatar: 'http://www.google.com/doodle.png',
        slogan: "Talk is cheap, show me your code!"
    },
    comments: [{
            comment_id: '2323',
            content: 'yes, i have',
            vote: 32
        }, {
            comment_id: 2324,
            content: 'yes, i have',
            vote: -1
        }]
};

var model1 = {
    user: 'User',
    comments: 'array:Comment'
};

Validator.define('Comment', {
    comment_id: 'string',
    content: 'string',
    vote: 'number:[,9)'
});

Validator.define('User', {
    username: 'string',
    avatar: 'url',
    age: 'number',
    slogan: 'string?'
});

var valid1 = new Validator(model1);

console.log(valid1.validate(data2));


var data3 = {
    post_id: 'abc',
    created_at: '2015-08-27T16:10:00.000Z',
    updated_at: 'wefaw',
    author: {
        user: 'Ricky',
        avatar: 'http://www.google.com/doodle.png'
    },
    comments: [],
    action: '{\"test\":20}'
};

var model2 = {
    post_id: 'string:0,3',
    created_at: 'date',
    updated_at: 'date',
    author: {
        user: 'string',
        avatar: 'url',
        age: 'number?'
    },
    comments: 'array',
    action: 'json'
};

var valid2 = new Validator(model2);

console.log(valid2.validate(data3));

Validator.define('Post', model2);

console.log(new Validator('Post').validate(data3));

/*
Validator.define('User', {
    username: 'string',
    avatar: 'url',
    is_vip: 'bool'
});

Validator.define('Comment', {
    comment_id: 'number',
    content: 'string',
    author: 'User'
});

var model = {
    artical_id: 'number',
    content: 'string',
    creator: 'User',
    comments: 'array:Comment'
};

var validator = new Validator(model);
var errors = validator.validate({
    artical_id: 1234,
    content: "This is a article",
    creator: {
        username: 'Ricky',
        avatar: 'http://www.google.com/doodle.png',
        is_vip: 1		// This is a error!
    },
    comments: [{
            comment_id: '2344', // This is a error!
            author: {
                username: 'Hi'
            }
        }]
});

console.log(errors);
*/