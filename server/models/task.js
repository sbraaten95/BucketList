var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchmea = new mongoose.Schema({
	user: String,
	checked: Boolean,
	title: {type: String, minlength: 5, required: true},
	description: {type: String, minlength: 10, required: true},
	shared_user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updatedAt'
	}
});

var Task = mongoose.model('Task', TaskSchmea);