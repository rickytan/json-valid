# json-validator

This is a simple to use json data model validate kit for NodeJS.

In every NodeJS App, we have to receive data from Clients, with is represented in `JSON` format. Unlike a `Relational Database`, `JSON` doesn't have a schema, and the data from client can be arbitrary, so we have to validate use input on the server.

There are some alternatives to this kind of scenario:

- [validator.js](https://github.com/chriso/validator.js)
- [jsonschema](https://github.com/tdegrunt/jsonschema)

but not as easy as I expected, so here comes this Repo.

## Install

``` cmd
npm install json-valid
```

## Usage

``` javascript
var Validator = require('json-validator');
```

### Define a model

``` javascript
var model = {
   username: 'string',
   avatar: 'url',
   age: 'number',
   is_vip: 'bool',
   created_at: 'date'
}

var validator = new Validator(model);
validator.validate(data);	// return a Array of error
```

### More Options

``` javascript
var model = {
  username: 'string',
  slogan: 'string?',		// ? means optional
  age: 'number:[12,18)',	// 12 <= age < 18
  email: 'email',
  phone: 'string:1\\d{10}',	// use your own pattern, Chinese's cell phone number starts with 1, and other 10 digit
  description: 'string?:0,200' // optional, if exists 0 <= description.length <= 200
}
```

### Nested

``` javascript
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
}

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
	comment_id: '2344',		// This is a error!
  	author: {
	  username: 'Hi',
	}
  }]
});

console.log(errors);
```

And here is the output from above:

``` 
[ { [Error: Data field creator.is_vip type error] code: 1000, dataField: 'creator.is_vip', value: 1 },
  { [Error: Data field comments.0.comment_id type error] code: 1000, dataField: 'comments.0.comment_id', value: '2344' },
  { [Error: Data field comments.0.content doesn't exist] code: 1002, dataField: 'comments.0.content' },
  { [Error: Data field comments.0.author.avatar doesn't exist] code: 1002, dataField: 'comments.0.author.avatar' },
  { [Error: Data field comments.0.author.is_vip doesn't exist] code: 1002, dataField: 'comments.0.author.is_vip' } ]
```

## License

**MIT**
