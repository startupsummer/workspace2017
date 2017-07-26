## Victoria Drozd, 13_databases
#### 1. Create a new user in a database:
```javascript
db.users.insertOne({
    _id: 1,
    firstName: 'Victoria',
    lastName: 'Drozd',
    avatar: 'Some avatar',
})
```
#### 2. Update user first and last name in a database using atomic update
```javascript
db.users.findAndModify({
    query: {  _id: 1 },
    update: {
        $set: {
            firstName: 'Alex', 
            lastName: 'Turner'
        }
    }
})
```
#### 3. Upsert post to the database.
```javascript
db.posts.update(
    { something: 'something' },
    { 
        _id: 100,
        text: 'Very interesting post!',
        image: 'Some image',
        time: new Date(),
        comments: []
    },
    { upsert: true }
)
```
#### 4. Add comment to the post
```javascript
db.posts.update(
   { _id: 100 },
   { $push: { 
       comments: {
           _id: 1000,
           userId: 1,
           time: new Date(),
           text: 'Very eloquent commentary'
       } 
     }
   }
)
```
#### 5. Remove comment from a post.
```javascript
db.posts.update(
   { _id: 100 },
   { $pull: { 
       comments: { _id: 1000 }
     }
   }
)
```
#### 6. Remove post from a database.
```javascript
db.posts.deleteOne({ _id: 100 })
```
#### 7. Using aggregation find out how much comments each post have.
```javascript
db.posts.aggregate([
   { $project: {
        text: 1,
        commentsNumber : { $size: "$comments" }
     }
   },
   { $out: 'commentsNumbers' }
])
```
#### 8. Implement like/unlike functionality for posts.
```javascript
db.posts.update(
   {},
   { $set: { 
       likes: []
     }
   },
   {multi: true}
)

db.posts.update(
   { _id: 100 },
   { $push: { 
       likes: { userId: 1 } 
     }
   }
)

db.posts.update(
   { _id: 100 },
   { $pull: { 
       likes: { userId: 1 }
     }
   }
)
```
#### 9. Implement like/unlike functionality for comments.
```javascript
db.posts.update(
   { 
       _id: 100,
       'comments._id': 1000
   },
   { $push: { 
       'comments.$.likes': { userId: 1 } 
     }
   }
)

db.posts.update(
   { 
       _id: 100,
       'comments._id': 1000
   },
   { $pull: { 
       'comments.$.likes': { userId: 1 } 
     }
   }
)
```