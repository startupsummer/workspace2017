```javascript
// Show users
db.users.find({})

// Add user
db.users.insertOne({
  _id: 1,
  firstname: 'John',
  lastname: 'Galt'
})

// Update user
db.users.updateOne(
  { _id: 1 },
  { $set: { firstname : 'Paul' }},
  { upsert: true }
)

// Show posts
db.posts.find({})

// Add post
db.posts.updateOne( 
{ _id: 1 }, 
  { $set: {
    user_id: 1,
    title: 'Amazing title',
    date: new Date(),
    views: 42,
    likes: [
      { _id: 1, user_id: 2, type: 'like' },
      { _id: 2, user_id: 3, type: 'sad' }
    ], 
    comments: [
      {
        _id: 1,
        text: 'Inconceivable comment',
        user_id: 2,
        likes: [
          { _id: 1, user_id: 3, type: 'like' }
        ]
      },
      {
        _id: 2,
        text: 'Prodigious comment',
        user_id: 3,
        likes: [
          { _id: 1, user_id: 2, type: 'like' }
        ]
      }

    ]
  }},
  { upsert: true }
)

// Delete post
db.posts.deleteOne({ _id: 1 })

// Add comment
db.posts.updateOne( 
  { _id: 1 },
  { $push: {
    comments: { 
      _id: 3,
      text: "Steep comment",
      user_id: 4,
      likes: []
    }
  }}
)

// Delete comment
db.posts.updateOne(
  { _id: 1 },
  { $pull: { comments: { _id: 3 }}}
)

// Comments counter
db.getCollection('posts').aggregate(
  [
    { $project: { numberOfComments: { $size: '$comments'}}},
  ]
)

// Like post
db.posts.updateOne(
  { _id: 1 },
  { $push: { likes: { _id: 1, type: 'hangry', user_id: 3 }}}
)

// Unlike post
db.posts.updateOne(
  { _id: 1 },
  { $pull: { likes: { _id: 1 }}}
)

// Like comment
db.posts.updateOne( 
  { _id: 1, 'comments._id': 1 },
  { $push: { 'comments.$.likes': { _id: 2, type: 'angry', user_id: 3 }}}
)

// Unlike comment
db.posts.updateOne(
  { _id: 1, 'comments._id': 1 },
  { $pull: { 'comments.$.likes': { _id: 2 }}}
)
````