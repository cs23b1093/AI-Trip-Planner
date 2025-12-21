import mongoose from 'mongoose'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUser {
    fullName: string,
    username: string,
    email: string,
    password: string,
    plan: string,
    address: string,
    preferences: string,
    trip: Object,
    authProvider: string,
    credits: number,

    isPasswordCorrect(password: string): Promise<boolean>,
    generateToken(): Promise<any>
}

const userSchema = new mongoose.Schema<IUser>({
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
    },
    credits: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next: any) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    if (!password) return false;
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = async function (){
    const accessToken = await jwt.sign({ userId: this._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    const refreshToken = await jwt.sign({ userId: this._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
    return { accessToken, refreshToken };
}

const User = mongoose.model<IUser>('User', userSchema)

export { User }