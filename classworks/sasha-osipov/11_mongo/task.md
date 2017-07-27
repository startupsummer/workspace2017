## Create a new user in a database
```javascript
db.Users.insert({
    _id: 1,
    firstname: 'Sasha',
    lastname: 'Osipov',
})
```
## Update user first and last name in a database using atomic update
```javascript
db.Users.updateOne({_id: 1}, { $set: { firstname: 'Lol', lastname: 'Kek' } })
```
## Upsert post to the database
```javascript
db.posts.updateOne(
    { _id: 1 },
    { $set: {
        user_id: 2,
        title: 'В Минске студент из Китая бросался вещами из окна квартиры и разбил припаркованное авто',
        content: `Дебоширом оказался 26-летний гражданин Китая, 
                  который учится в одном из минских вузов. 
                  Из окна квартиры на втором этаже парень выбрасывал кухонные предметы.  
                  Одна из кружек попала в окно припаркованной внизу машины. 
                  Студента доставили в райуправление милиции.  
                  Там он пояснил свое поведение шумами в голове`,
        time: new Date(),
        views: 228,
        likes: [
            {
                _id: 1,
                user_id: 5,
                image: 'like',
            },
            {
                _id: 2,
                user_id: 999,
                image: 'mops',
            }
        ],
        comments: [
            {
                _id: 1,
                user_id: 10,
                content: 'privet',
                likes: [],
            },
            {
                _id: 2,
                user_id: 7,
                content: 'lol kek azaza',
                likes: [],
            },
        ]
        
    }},
    { upsert: true }
)
```
## Add comment to the post
```javascript
db.posts.updateOne(
    { _id: 1 }, 
    { $push: { 
        comments: {
                _id: 3,
                user_id: 76,
                content: 'privet, Sasha!',
                likes: [],
            }
        }
    }
)
```
## Remove comment from a post
```javascript
db.posts.updateOne(
    { _id: 1 }, 
    { $pull: { 
            comments: { _id: 1 }
        }
    }
)
```
## Remove post from a database
```javascript
db.posts.remove({ _id: 1 })
```
## Using aggregation find out how much comments each post have
```javascript
db.posts.aggregate([
    { $project: { count: { $size: '$comments' } } }
])
```
## Implement like/unlike functionality for posts
```javascript
db.posts.updateOne(
    { _id: 1 }, 
    { $push: { 
        likes: {
                _id: 3,
                user_id: 90,
                image: 'like',
            }
        }
    }
)

db.posts.updateOne(
    { _id: 1 }, 
    { $pull: { 
            likes: { _id: 1 }
        }
    }
)
```
## Implement like/unlike functionality for comments
```javascript
db.posts.updateOne(
    { _id: 1, 'comments._id': 2 }, 
    { $push: { 
       'comments.$.likes': {
                _id: 3,
                user_id: 90,
                image: 'like',
            }
        }
    }
)
    
db.posts.updateOne(
    { _id: 1, 'comments._id': 2 }, 
    { $pull: { 
       'comments.$.likes': {
               _id: 3,   
            }
        }
    }
)
```

