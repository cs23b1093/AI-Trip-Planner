import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    plan: {
        type: String,
        enum: ['Free', 'Pro'],
        default: 'Free'
    },
    address: {
        type: String
    },
    preferences: {
        type: String
    },
    trip: {
        type: Object
    },
    authProvider: {
        type: String,
        enum: ['google', 'facebook', 'X', 'password_based'],
        default: 'password_based'
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema)

export { User };