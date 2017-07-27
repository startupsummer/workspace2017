db.users.remove({})

db.users.insertMany([{
  _id: 1,
  first_name: 'Isaac',
  last_name: 'Newton'
}, {
  _id: 2,
  first_name: 'Albert',
  last_name: 'Enstein'
}, {
  _id: 3,
  first_name: 'Nikola',
  last_name: 'Tesla'
}])

db.users.updateOne({
  _id: 2,
  $isolated : 1
}, {
  $set: {
    first_name: 'Molbert'
  }
})

db.users.find({})
