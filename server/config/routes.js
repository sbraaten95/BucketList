var users = require('../controllers/users.js');
var tasks = require('../controllers/tasks.js');

module.exports = (app) => {
	app.get('/users', users.index);
	app.get('/users/:id', users.getOne);
	app.post('/users', users.login);
	app.get('/tasks', tasks.index);
	app.get('/tasks/:id', tasks.getUserTasks);
	app.post('/tasks', tasks.create);
	app.put('/tasks', tasks.check);
};