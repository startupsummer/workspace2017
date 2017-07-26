1.
```javascript
db.users.insertOne({
  _id: 123,
  firstName: "Johnny",
  lastName: "Hash"
})
```

2.
```javascript
db.users.updateOne({ _id: 123 }, { $set: { "firstName": "New-Johnny", "lastName": "New-Hash" } })
```

3.
```javascript
//update for creating
db.posts.update(
  {
    _id: 455
  },
  {
    title: "Mona Lisa is alive !",
    content: "Rusty James from Minessota noticed that very old lady living in the neighberhood can be th very Mona Lisa",
    comments: [{_id: 11, userId: 123, content: "Shooot !" }, {_id: 12, userId: 123, content: "Dont like Mona.. and Leo either" }]
  },
  {
    upsert: true
  }
)

//update for updating
db.posts.update(
  { _id: 455 },
  {
    likes: [{ _id: "id", userId: 123, type: "simple-like" }]     
  },
  {
    upsert: true
  }
)
```

4.
```javascript
db.posts.update(
  { _id: 455 },
  {
    $push: { comments:  { _id: 13, userId: 123, content: "Im pushed", likes: [], replyOnId: null } }
  }
)
```

5.
```javascript
db.posts.update(
  { _id: 455 },
  {
    $pull: { comments:  { _id: 12 } }
  }
)
```

6.
```javascript
db.posts.deleteOne({
  _id: 455
})
```

7.
```javascript
db.posts.update(
  { _id: 454 },
  {
    title: "Mona Lisa is alive !",
    content: "Rusty James from Minessota noticed that very old lady living in the neighberhood can be th very Mona Lisa",
    comments: [
      { _id: 11, userId: 123, content: "Shooot !", likes: [] },
      { _id: 12, userId: 123, content: "Dont like Mona.. and Leo either", likes: [ { _id: 67, userId: 123, type: "like" } ] }
    ],
    likes: [ { _id: "434", userId: 123, type: "like" } ]
  },
  {
    upsert: true
  }
)

db.posts.update(
  { _id: 458 },
  {
    title: "Mona Lisa is not alive !",
    content: "Rusty James from Minessota reported that very old lady living in the neighberhood probably have died today",
    comments: [
      { _id: 23, userId: 123, content: "Dont like Mona.. and Leo either", likes: [ { _id: 69, userId: 123, type: "like" } ] }
    ],
    likes: [ { _id: "434", userId: 123, type: "dislike" } ]
  },
  {
    upsert: true
  }
)

db.posts.aggregate(
  [
    {
      $project: {
        numberOfComments: { $size: "$comments" }
      }
    }
  ]
)
```

8.
```javascript
//create posts    
db.posts.update(
  { _id: 454 },
  {
    title: "Mona Lisa is alive !",
    content: "Rusty James from Minnesota noticed that very old lady living in the neighborhood can be th very Mona Lisa",
    comments: [
      { _id: 11, userId: 123, content: "Shooot !", likes: [] },
      { _id: 12, userId: 123, content: "Dont like Mona.. and Leo either", likes: [{ _id: 67, userId: 123, type: "like" }] }
    ],
    likes: [{ _id: "434", userId: 123, type: "like" }]
  },
  {
    upsert: true
  }
)

db.posts.update(
  { _id: 458 },
  {
    title: "Mona Lisa is not alive !",
    content: "Rusty James from Minnesota reported that very old lady living in the neighborhood probably have died today",
    comments: [
      { _id: 21, userId: 123, content: "Shooot !", likes: [] },
      { _id: 23, userId: 123, content: "Dont like Mona.. and Leo either", likes: [{ _id: 69, userId: 123, type: "like" }] }
    ],
    likes: [{ _id: "434", userId: 123, type: "dislike" }]
  },
  {
    upsert: true
  }
)

//add like/dislike to post   
db.posts.update(
  { _id: 454 },
  {
    $push: { likes:  { _id: 5454, userId: 123, type: "dislike"} }
  }
)
```

9.
```javascript
//add like/dislike to comment
db.posts.update(
  { _id: 458, "comments._id": 23 },
  { $push:
    {
      "comments.$.likes": { _id: 12, userId: 123, type: "dislike" }
    }
  }
)   

//remove like/dislike from comment   
db.posts.update(
  { _id: 458, "comments._id": 23 },
  { $pull:
    {
      "comments.$.likes": { _id: 69 }
    }
  }
)   
```
