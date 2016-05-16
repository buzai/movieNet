 var User = require('../models/user')

    //user router
exports.signup = function (req, res) {
    var _user = req.body.user;
    var newUser = new User(_user);
    User.findOne({name:_user.name}, function (err, user) {
        if (err) {console.log(err)}

        if (user) {
            console.log('please chang a new name')
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

exports.signin = function (req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    User.findOne({name: name}, function (err, user) {
        if (err) {console.log(err)};

        if (!user) {
            console.log('dont have this user');
            return res.redirect('/');
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
            }
        })
    })
};

exports.logout = function (req, res) {
    delete req.session.user;
    // delete  app.locals.user
    res.redirect('/');
};