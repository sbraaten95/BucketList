var app = require('express')();

app.use(require('express').static(require('path').join(__dirname, './client')));
app.use(require('express').static(require('path').join(__dirname, './bower_components')));
app.use(require('body-parser').json());

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(8000, ()=>{
	console.log('listening 8000');
});