const mongoose = require('mongoose');

//const URI = 'mongodb://localhost/mern-tasks';
const URI = 'mongodb+srv://admin:admin@cluster0-5uwv2.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URI)
.then(db=> console.log('DB is connected'))
.catch(err=>console.error(err));

module.exports = mongoose;