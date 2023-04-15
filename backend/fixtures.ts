import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import crypto from 'crypto';
import Project from './models/Project';
import Manager from './models/Manager';
import Developer from './models/Developer';

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('projects');
    } catch (e) {
        console.log('Collections were not present')
    }

    const [userOne, userTwo] = await User.create({
        email: 'user1@gmail.com',
        password: '123',
        displayName: 'Максим',
        token: crypto.randomUUID(),
    }, {
        email: 'user2@gmail.com',
        password: '123',
        displayName: 'Никита',
        token: crypto.randomUUID(),
    });

    const [booking, shop] = await Project.create({
        owner: userOne._id,
        projectName: 'Booking',
    }, {
        owner: userTwo._id,
        projectName: 'Shop',
    });

    await Manager.create({
        project: booking._id,
        projectManager: userTwo._id,
    }, {
        project: shop._id,
        projectManager: userTwo._id,
    });

    await Developer.create({
        project: booking._id,
        projectDeveloper: userOne._id,
    }, {
        project: shop._id,
        projectDeveloper: userTwo._id,
    });

    await db.close();
}

void run();