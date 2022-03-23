const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 20
    },
    userName: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        user: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {type: String},
    profilePicture: {type: String}
}, {timestamps: true});


userSchema.virtual('password').set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10);
})

userSchema.virtual('fullName')
.get(function(){
    return `${this.firstName} ${this.lastName}`;
})

userSchema.methods = {
    aunthenticate : function(password){
        return bcrypt.compareSync(password, this.hash_password); 
    }
}


const Model = mongoose.model('User', userSchema);
module.exports = Model