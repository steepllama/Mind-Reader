const { Schema, model } = require("mongoose");


const ThoughtSchema = new Schema ({
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => 
            dateFormat(createdAtVal)
        },
        userName: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    }
);

const ReactionSchema = new Schema ({ 
        reactionId: {
            type: Schema.Types.ObjectId, 
            default: () => Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        userName: { 
            type: String, 
            required: true,
        },
        createdAt: { 
            type: Date, 
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MM/DD/YY [at] HH:MM'),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;