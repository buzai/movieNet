
var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')

module.exports = function(app) {

    //session pre
    app.use(function (req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user;
        next();
    });

    //index
    app.get('/', Index.index);


    //user router
    app.post('/user/signup', User.signup);

    app.post('/user/signin', User.signin);

    app.get('/logout', User.logout);


    //admin page add new movie
    app.get('/admin/movie', Movie.new);

    //admin update movie
    app.get('/admin/update/:id', Movie.update);

    //admin post movie to mongodb
    app.post('/admin/movie/new', Movie.new);

    //list page
    app.get('/admin/list', Movie.list);

    //admin delete movie
    app.delete('/admin/list', Movie.del);

    //detail page
    app.get('/detail/:id', Movie.detail);

}

