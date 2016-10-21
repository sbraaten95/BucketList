var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
	tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
});

var User = mongoose.model('User', UserSchema);