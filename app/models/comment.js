/**
 * Created by Administrator on 2016/5/13.
 */
var mongoose=require('mongoose');
var CommentSchema = require('../schemas/comment');
var Comment=mongoose.model('Comment',CommentSchema);

module.exports=Comment;