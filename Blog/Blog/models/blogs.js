const mongoose = require("mongoose");

const BlogSchema =   new mongoose.Schema({
    Title:{
        type:String,
        minlength: 4,
        maxlength: 50,
        required: true,
    },
    Author_Name:{
        type: String,
        minlength: 4,
        maxlength: 50,
        required: true,
    },
    Description:{
        type: String,
        minlength: 50,
        maxlength: 1000,
        required: true,
    },
    date:{
        type:Date,
        default: Date.now,
    }
});

const Blog = mongoose.model("Blog",BlogSchema);

module.exports = Blog;
