1) Create a new user in a database:
```javascript
db.users.insert(
    {
        firstname: "kirill",
        lastname: "borovko",
        age: 19
    }
)
```

2) Update user first and last name in a database using atomic update:
```javascript
db.users.update(
    { _id: ObjectId("59787b09dfe33be53ffa35ed") },
    { 
        $set: {
            firstname: "lena",
            lastname: "daylidko",
            age: 19
        }   
    }
)
```


3) Upsert post to the database:
```javascript
db.createCollection('post')
db.posts.insert(        
    { 
        title: "girl",
        description: "I hate you",
        image: "picture.jpeg",
        views: 0, 
        comments: [] 
    },
    { upsert: true }
)
```

4) Add comment to the post:
```javascript
db.posts.update(
    { _id: ObjectId("59787e04dfe33be53ffa35ee") },
    { 
        $push: {
            comments: {
                _id: 1,
                firstname: "natallia",
                lastname: "belousova",
                description: "blablabla, i don't like boys",
                time: new Date(),
            }
        } 
    }
)
```

5) Remove comment from a post:
```javascript
db.posts.update(
    { _id: ObjectId("59787e04dfe33be53ffa35ee")},
    { 
        $pull: {
            comments: { _id: 1 }
        }  
    }
)
```

6) Remove post from a database:
```javascript
db.posts.remove(
    { _id: ObjectId("59787e04dfe33be53ffa35ee") }
)
```

7) Using aggregation find out how much comments each post have:
```javascript
db.posts.aggregate([
    { $unwind: "$comments" },
    {
        $group: {
            _id: "$title",
            num_comments: { $sum: 1 } 
        }
    }
])
```

Advanced level

8) Implement like/unlike functionality for posts.

Like:

```javascript
db.posts.update(
    { _id: ObjectId("5978866cdfe33be53ffa35ef") },
    { 
        $push: {
            likes: {
                idUser: 1,
                firstname: "bananka",
                lastname: "vananka"
            }
        }
    }
)
```

Unlike: 

```javascript
db.posts.update(
    { _id: ObjectId("5978866cdfe33be53ffa35ef") },
    { 
        $pull: {
            likes: { idUser: 1 }
        }
    }
)
```

9) Implement like/unlike functionality for comments

Like:

```javascript
db.posts.update(
    { "comments._id": 1 },
    { $push: {
        "comments.$.likes": {
            idUser: 1,
            firstname: "bananka",
            lastname: "vananka"
            }
        }
    }
)
```

Unlike:

```javascript
db.posts.update(
    { "comments._id": 1 },
    { 
        $pull: {
            "comments.$.likes": {
                idUser: 1,
            }
        }
    }
)
```







