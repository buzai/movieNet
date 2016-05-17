 var User = require('../models/user');

//user router


exports.signinRequested = function (req, res, next) {
    var user = req.session.user;

    if (!user) {
        return res.redirect('/signin');
    }
    next();

};
exports.adminRequested = function (req, res, next) {
    var user = req.session.user;

    if (user.role <= 10) {

        console.log('you are not admin . so is not allowed');
        return res.redirect('/signin');
    }
    next();

};


exports.showSignup = function (req, res) {
    res.render('signup',{
        title: '注册页面'
    })
};
exports.signup = function (req, res) {
    var _user = req.body.user;
    var newUser = new User(_user);
    User.findOne({name:_user.name}, function (err, user) {
        if (err) {console.log(err)}

        if (user) {
            console.log('please chang a new name');
            return res.redirect('/signin');
        }

        else {

        newUser.save(function (err, user) {
            if (err) { console.log(err) }
            // console.log(user);
            console.log(user)
            res.redirect('/')
        });

        }
    });
};

exports.showSignin = function (req, res) {
    res.render('signin',{
        title: '登陆页面'
    })
};

exports.signin = function (req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    User.findOne({name: name}, function (err, user) {
        if (err) {console.log(err)};

        if (!user) {
            console.log('dont have this user');
            return res.redirect('/signup');
        }

        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                console.log(err);
            }
            if (isMatch) {
                console.log('password is right');
                req.session.user = user
                return res.redirect('/');
            }
            else {
                console.log('password is not right');
                return res.redirect('/signin');
            }
        })
    })
};

exports.logout = function (req, res) {
    delete req.session.user;
    // delete  app.locals.user
    res.redirect('/');
};