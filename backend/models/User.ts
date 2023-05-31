import {HydratedDocument, Model, model, Schema} from "mongoose";
import bcrypt from 'bcrypt';
import {randomUUID} from "crypto";
import {IUser} from "../types";

const SALT_WORK_FACTOR = 10;

interface IUserMethods {
    generateToken(): void;
    checkPassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (this: HydratedDocument<IUser>, email: string): Promise<boolean> {
                if (!this.isModified('email')) return true;

                const user: HydratedDocument<IUser> | null = await User.findOne({email});
                return !Boolean(user);
            },
            message: 'This user is already registered',
        }
    },
    password: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    avatar: String,
    token: {
        type: String,
        required: true,
    },
    googleId: String,
    role: {
        type: String,
        required: true,
        enum: ['developer', 'manager'],
    },
    online: {
        type: Boolean,
        default: true,
    },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});

UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
};

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model<IUser, UserModel>('User', UserSchema);
export default User;