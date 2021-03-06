var mongoose = require('mongoose');
var bctypt = require('bcryptjs');
var SALT_WORL_FACTOR = 10;
var UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },

    password: String,

    role: {
        type:Number,
        default:0
    },
    // 0 is normal
    // 1 激活过得
    // 2 资料完全的高级
    // 3 微博登陆用户（31绑定过的)
    // 4 微信登陆（41)

    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }

});


UserSchema.pre('save', function (next) {

    var user = this;

    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    bctypt.genSalt(SALT_WORL_FACTOR, function (err, salt) {
        if (err) { return next(err) }

        bctypt.hash(user.password, salt, function (err, hash) {
            if (err) { return next(err) }

            user.password = hash
            next()
        })

    })

}); 


UserSchema.methods = {
    comparePassword: function(_password, cb) {
        bctypt.compare(_password, this.password, function(err, isMatch) {
            if (err) {
                console.log(err);
                return cb(err);
            }
            cb(null, isMatch);
        })
    }
}

UserSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    }
};

module.exports = UserSchema;