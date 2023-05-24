import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import crypto from 'crypto';
import Project from './models/Project';
import Milestone from './models/Milestone';
import Task from './models/Task';

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('projects');
        await db.dropCollection('milestones');
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
    }, {
        email: 'user4@gmail.com',
        password: '123',
        displayName: 'Маркелов Артем',
        token: crypto.randomUUID(),
    }, {
        email: 'user5@gmail.com',
        password: '123',
        displayName: 'Акматалиев Нурдамир',
        token: crypto.randomUUID(),
    });

    const [booking, shop] = await Project.create({
        name: 'Booking',
        description: 'Create booking website',
        manager: userOne._id,
        developers: [userTwo._id, userThree._id]
    }, {
        name: 'Shop',
        description: 'Create shop website',
        manager: userOne._id,
        developers: [userTwo._id, userThree._id]
    });

    const [sprintOne, sprintTwo, sprintFirst, sprintSecond] = await Milestone.create({
        project: booking._id,
        title: 'Sprint#1',
        startDate: '16.05.23',
        dueDate: '31.05.23',
        description: "Create backend for Booking page",
    }, {
        project: booking._id,
        title: 'Sprint#2',
        startDate: '01.06.23',
        dueDate: '15.06.23',
        description: 'Create frontend for Booking page',
    }, {
        project: shop._id,
        title: 'Sprint-1',
        startDate: '16.06.23',
        dueDate:  '30.06.23',
        description: 'Create backend for Shop page',

    }, {
        project: shop._id,
        title: 'Sprint-2',
        startDate: '01.07.23',
        dueDate:  '15.07.23',
        description: 'Create frontend for Shop page',
    });

    await Task.create({
        project: booking._id,
        assignee: userTwo._id,
        milestone: sprintOne._id,
        title: 'Create schema for User model',
        description: 'Schema for user must generate token, bcrypt.hash password and check password',
    }, {
        project: booking._id,
        assignee: userThree._id,
        milestone: sprintTwo._id,
        status: 'in progress',
        title: 'Create header and footer for main page',
        description: 'Background should be light green color',
        ticketStartDate: new Date().toISOString(),
    }, {
        project: booking._id,
        assignee: userTwo._id,
        milestone: sprintTwo._id,
        status: 'done',
        title: 'Create form for register new user',
        description: 'Register form mush catch validation error from backend and the button should be primary color',
        spendTime: {
            hours: 1,
            minutes: 25,
        },
    }, {
        project: shop._id,
        assignee: userTwo._id,
        milestone: sprintFirst._id,
        title: 'Create schema for shopItem',
        description: 'Also you have to create router for post, patch and delete shopItem',
    }, {
        project: shop._id,
        assignee: userThree._id,
        milestone: sprintSecond._id,
        status: 'in progress',
        title: 'Create card for shopItem',
        description: 'Card must have full information about shopItem and image',
        ticketStartDate: new Date().toISOString(),
    }, {
        project: shop._id,
        assignee: userTwo._id,
        milestone: sprintSecond._id,
        status: 'done',
        title: 'Creat Image carousel',
        description: 'Create image carousel must be accept array image from backend',
        spendTime: {
            hours: 0,
            minutes: 25,
        },
    });

    await db.close();
}

void run();