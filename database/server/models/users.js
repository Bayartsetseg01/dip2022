const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "insert name"],
        unique:true,
    },
    email: {
        type: String,
        required: [true, "insert email"],
    },
    password: {
        type: String,
        required: [true, "insert password"],
    },
    company: {
        type: String,
        required: [true, "insert compony name"],
    },
    ip: {
        type: String,
        required: [true, "inser IP"],
    }

});

module.exports = mongoose.model("users",UsersSchema);


