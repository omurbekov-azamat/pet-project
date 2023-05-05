import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import crypto from 'crypto';
import Project from './models/Project';

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('projects');
        await db.dropCollection('tasks');
    } catch (e) {
        console.log('Collections were not present')
    }

    const [userOne, userTwo, userThree] = await User.create({
        email: 'manager@gmail.com',
        password: '123',
        displayName: 'Эмиль',
        token: crypto.randomUUID(),
        role: 'manager'
    }, {
        email: 'user1@gmail.com',
        password: '123',
        displayName: 'Азамат Омурбеков',
        token: crypto.randomUUID(),
    }, {
        email: 'user2@gmail.com',
        password: '123',
        displayName: 'Куон Валерий',
        token: crypto.randomUUID(),
    }, {
        email: 'user3@gmail.com',
        password: '123',
        displayName: 'Биктимиров Эдиль',
        token: crypto.randomUUID(),
    },  {
        email: 'user4@gmail.com',
        password: '123',
        displayName: 'Маркелов Артем',
        token: crypto.randomUUID(),
    },  {
        email: 'user5@gmail.com',
        password: '123',
        displayName: 'Акматалиев Нурдамир',
        token: crypto.randomUUID(),
    });

    await Project.create({
        name: 'Booking',
        description: 'Create booking website',
        manager: userOne._id,
    }, {
        name: 'Shop',
        description: 'Create shop website',
        manager: userOne._id,
        developers: [userTwo._id, userThree]
    });

    await db.close();
}

void run();