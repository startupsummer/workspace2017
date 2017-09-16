const supertest = require('supertest');
const app = require('../app');
const request = supertest.agent(app.listen())
const { saveUser, updateClient, updateAnotherClient,
        createTask, updateTaskByAdmin, addParticipatorbyAdmin,
        addParticipatorbyClient } = require('./resources/staff/index.js');

// saveUser(request);
//updateClient(request);
//updateAnotherClient(request);
//createTask(request);
//updateTaskByAdmin(request);
// addParticipatorbyAdmin(request);
addParticipatorbyClient(request);
