const { Schema, model } = require("mongoose");


const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'What are you thinking?',
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    userName: {
        type: String,
        required: true
    },
    reactions: []
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);