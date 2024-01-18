const { Schema } = require('mongoose');
const { ObjectId } = require('mongodb')

const formatDate = (time) => {
    return time.toLocalString()
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
            get: time => formatDate(time)
        }
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

module.exports = reactionSchema;