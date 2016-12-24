var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
});

var User = mongoose.model('User', UserSchema);