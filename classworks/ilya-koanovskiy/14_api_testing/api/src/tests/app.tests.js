describe('Api testing', function() {
  let userUsual;
  let task;
  let token;
  let staff;
  let length;
  before(async () => {
    userUsual = await userFactory.user(false);
    staff = await userFactory.user(false);
    task = await taskFactory.task(userUsual,[userUsual._id]);  
    length = task.participatorIds.length;
    token = await auth.signinAsRoot(request,userUsual);
  })
  it('should return right number of users tasks', done => {
    request.get('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect((res) => res.body.results.should.have.lengthOf(4))
      .end(done)
  })
  it('should return 403 when non admin try to create a task', done => {
    request.post(`/api/v1/tasks/`)
      .set('Authorization', `Bearer ${token}`)
      .send(task)
      .expect(403) 
      .end(done)
  })
  it('should return title of updatet task', done => {
    request.put(`/api/v1/tasks/${task._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(task)
      .expect((res) => {return res.body.results.value.title.should.equal('Issue')}) 
      .end(done)
  })
  it('should return lenght of new participator array', done => {
    request.post(`/api/v1/tasks/${task._id}/participators/${staff._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect((res) => res.body.results.value.participatorIds.length.should.equal(length+1)) 
      .end(done)
  })
  it('should return 403 when non admin try to add participator to task', done => {
    request.post(`/api/v1/tasks/${task._id}/participators/${staff._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(403) 
      .end(done)
  })
});