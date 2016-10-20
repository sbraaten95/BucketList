var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	name: String,
	tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
});

var User = mongoose.model('User', UserSchema);