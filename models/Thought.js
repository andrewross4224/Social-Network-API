const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const formatDate = (date) => {
    return date.toLocaleString()
}

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => formatDate(date)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
});

const Thought = model('thought', thoughtSchema)

module.exports = Thought;