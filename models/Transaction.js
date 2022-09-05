const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const transactionSchema = new Schema({
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Transaction', transactionSchema);