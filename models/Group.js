const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 32,
        trim: true
    },
    members: [
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            role: {
                type: String,
                enum: ['admin', 'member'],
                default: 'member',
                required: true
            }
        }
    ]
}, { timestamps: true });


module.exports = mongoose.model('Group', groupSchema);