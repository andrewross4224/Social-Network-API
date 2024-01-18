const { Schema } = require('mongoose');
const { ObjectId } = require('mongodb')

const formatDate = (date) => {
    return date.toLocaleString()
}

const reactionSchema = new Schema(
    {
        reactionId: {
            type: ObjectId,
            Default: new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => formatDate(date)
        }
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

module.exports = reactionSchema;