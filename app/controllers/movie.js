var Movie = require('../models/movie');
var _ = require('underscore');

//detial page
exports.detail = function (req, res) {
    var id = req.params.id;
    Movie.findById(id, function(err,movie){
        res.render('detail', {
            title: '详情',
            movie: movie
        })
    });
};


//admin add a new movie page
exports.new = function(req, res) {
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
};


//admin update movie
exports.update = function(req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: 'demo1 后台更新页',
                movie: movie
            });
        });
    }
};


//admin post a new movie to mongodb
exports.save = function(req, res) {
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
};


//list page
exports.list = function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: 'demo1 列表页',
            movies: movies
        });
    });
};

//admin delete movie
exports.del = function(req,res){
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

};