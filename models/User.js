const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const { v4: uuidv1 } = require('uuid');



const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 256
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    encry_password: {
        type: String,
        required: true,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 1
    }
}, { timestamps: true });


userSchema.methods = {
    securePassword: function (plainPassword) {
        if (!plainPassword) return '';
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainPassword)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
    authenticate: function (plainPassword) {
        return this.securePassword(plainPassword) === this.encry_password;
    }
}

userSchema.virtual('password')
    .set(function (plainPassword) {
        this.salt = uuidv1();
        this.encry_password = this.securePassword(plainPassword);
    });

module.exports = mongoose.model('User', userSchema);