/**
 * Created by Administrator on 2016/5/11.
 */
var express = require('express');
var static = require('serve-static');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./models/movie');
var User = require('./models/user')
var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/imoocc');

app.use(bodyParser.urlencoded({extended: true}));
app.use(static('public'));
app.set('views','./views/pages/');
app.set('view engine','jade');
app.locals.moment = require('moment');
app.listen(port)
console.log('moview is staring '+port)

app.get('/', function (req, res) {
    Movie.fetch(function (err,movies){
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: '首页',
            movies: movies
        })
    })
});


//user router
app.post('/user/signup', function (req, res) {
    var _user = req.body.user;
    var user = new User(_user);

    User.findOne({name:_user.name}, function (err, user) {
        if (err) {console.log(err)}

        if (user) {
            console.log('please chang a new name')
        }

        else {

        user.save(function (err, user) {
            if (err) { console.log(err) }
            // console.log(user);
            res.redirect('/')
        });

        }
    });



})

app.get('/detail/:id', function (req, res) {
    var id = req.params.id;
    Movie.findById(id, function(err,movie){
        res.render('detail', {
            title: '详情',
            movie: movie
        })
    })
});

//admin page
app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: 'demo1 后台录入页',
        movie: {
            _id: '',
            doctor: '',
            country: '',
            title: '',
            year: '',
            poster: '',
            language: '',
            flash: '',
            summary: ''
        }
    });
});

//admin update movie
app.get('/admin/update/:id', function(req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: 'demo1 后台更新页',
                movie: movie
            });
        });
    }
});

//admin post movie
app.post('/admin/movie/new', function(req, res) {
    console.log(req.body);
    console.log(req.body.movie);
    var id = req.body.movie._id;
    console.log(id);
    var movieObj = req.body.movie;
    var _movie;
    if (id!== '') {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function(err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/detail/' + movie._id);
            });
        });
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            language: movieObj.language,
            country: movieObj.country,
            year: movieObj.year,
            poster: movieObj.poster,
            flash: movieObj.flash,
            summary: movieObj.summary
        });
        _movie.save(function(err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect('/detail/' + movie._id);
        });
    }
});

//list page
app.get('/admin/list', function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: 'demo1 列表页',
            movies: movies
        });
    });
});

//admin delete movie
app.delete('/admin/list',function(req,res){
    var id = req.query.id;
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err);
            }else{
                res.json({success:1});
            }
        });
    }

})