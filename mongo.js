var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log('mongoose is  ok')
});

var kittySchema = mongoose.Schema({
    name: String
})

var Kitten = mongoose.model('Kitten', kittySchema)

var silence = new Kitten({ name: 'Silence' })
console.log(silence.name) // 'Silence'
silence.save(function (error) {
	console.log('error-----'+error)
});

// var krouky = new Kitten({name:'krouky'});
//     krouky.save();

Kitten.find(function(err,persons){
      //查询到的所有person
      console.log('persons-----'+persons)
      console.log(persons.length)
    });