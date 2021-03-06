1.
```javascript
db.getCollection('users').insertOne({_id: 1, first_name: "Mark", last_name: "Chepicov"})
```

2.
```javascript
db.getCollection('users').updateOne({_id: 1}, {$set: {first_name: "Andrew", last_name: "Orsich"}})
```

```javascript
db.getCollection('users').insertOne({_id: 2, first_name: "Mark", last_name: "Chepicov"})
db.getCollection('users').insertOne({_id: 3, first_name: "Nikita", last_name: "Nesterenko"})
```

3.
```javascript
db.posts.updateOne(
{ _id : 1 }, 
{ $set: 
    {_id: 1, 
    title: "Belarus Central Bank Approves Blockchain Use For Bank Guarantees",
    content: "The central bank of Belarus has cleared the way for domestic banks to use blockchain as part of their processes of transmitting bank guarantees.",  
    user_id: 2, 
    comment: [
    {
        _id: 1, 
        user_id: 1, 
        content: "That's great!", 
        like: [
            {_id: 1, 
            user_id: 3, 
            type: "wow"}
        ]
    }], 
    like: [{_id: 1, user_id: 1, type: "like"}], 
    share: [{_id: 1, user_id: 3}],
    views: 100500
    } 
}, 
{ upsert: true })
```

4.
```javascript
db.posts.updateOne(
{ _id : 1 }, 
{ $push: { comment:
    {_id: 2, 
    content: "Novost' - bayan",  
    user_id: 3,
    replyOn_id: 1,
    like: [{_id: 1, user_id: 2, type: "haha"}], 
    } 
}
})
```

5.
```javascript
db.posts.updateOne(
{ _id : 1 }, 
{ $pull: { comment: {_id: 2}} 
})
```

6.
```javascript
db.posts.deleteOne( { _id : 1 } );
```

7.
```javascript
db.posts.aggregate(
   [
      {
         $project: {
            numberOfComments: { 
                $size: "$comment" 
            }
         }
      }
   ]
)
```

8.
```javascript
db.posts.update(
    { _id: 1},
    { $push: 
        {like: 
            {
                _id: 2, 
                user_id: 1, 
                type: "like"
            }
        }
    }
)

db.posts.update(
    { _id: 1},
    { "$pull": 
        {like: 
            {
                _id: 2
            }
        }
    }
)
```

9.
```javascript
db.posts.update(
    { _id: 1, "comment._id": 1},
    { "$push": 
        {"comment.$.like": 
            {
                _id: 2, 
                user_id: 3, 
                type: "angry"
            }
        }
    }
)

db.posts.update(
    { _id: 1, "comment._id": 1},
    { "$pull": 
        {"comment.$.like": 
            {
                _id: 2, 
            }
        }
    }
)
```
