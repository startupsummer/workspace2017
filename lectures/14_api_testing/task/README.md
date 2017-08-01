## Lecture task

The main objective of the task is to learn how to write tests for REST api server.

Mandatory task:

1. Create simple mongo.db database with two collections (`users` and `tasks`). We should have two types of users (`admin` and `client`). And use the proposed api for the next steps.
```javascript
// Example of user
{
  _id: '1',
  email: 'e.zhivitsa@paralect.com',
  passwordHash: 'kdfmbkskkjnklnl',
  firstName: 'Evgeny',
  lastName: 'Zhivitsa',
  isAdmin: true
}
```

```javascript
// Example of task
{
  _id: '11',
  createrId: '1',
  title: 'Learn testing',
  description: 'Learn how to write tests for REST api server.',
  participatorIds: []
}
```

2. Create factory and builder for users to create users of two types
3. Create factory and builder for tasks to create tasks
4. Create one admin and 3 tasks and add test for the request `GET /tasks` that staff can get 3 tasks.
5. Add a test, that non admin staff can successfully update `firstname` and `lastname` of the himself.
6. Add a test that non admin staff can't update `firstname` of the another staff. 
7. Create a test that when a non admin staff tries to create a task, he gets an error 403.
8. Create a test that admin can successfully update the task, and, as a response, he gets the updated task.
9. Add a test that admin can add any staff to the list of participators of the task.
10. Add a test that when non admin staff member tries to add another staff to the task he gets an error 403.

Advanced:

11. Add `beforeEach` and `afterEach` statements to cleanup and setup database.
12. Use module `mock-aws-s3` for create mock of the Amazon S3 service. And create tests for uploading, deleting and updating image for the task.

### Once finished..

1. Call a lecturer and show tests.
2. Show that all tests are working successfully.
3. Create PR.
