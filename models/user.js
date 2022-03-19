const { Schema, model } = require('mongoose');


const UserSchema = new Schema({
    userName: {
        type: String,
        trim: true,
        unique: true,
        required: true
        },
    email: {
        type: String,
        required: "Your email can not be 69!",
        unique: true,
        match: [/.+@.+\..+/]
        },
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: "Thought"
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
    },
    {
        toJSON: {
            virtuals: true, 
            getters: true
        },
        id: false
    }
);

UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
})

const User = model('User', UserSchema)


module.export = User;


// userSchema.virtual('domain').get(() => {
//     return this.email.slice(this.email.indexOf('@')+1);
// })

// const User = mongoose.model('User', userSchema);

// let doc = await User.create({email: 'sem@gmail.com'});

// doc.domain;



