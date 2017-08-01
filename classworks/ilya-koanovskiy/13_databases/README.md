
1) Create user in users collection: <br />
```javascript
db.getCollection('users').insertOne({ _id: 1,firstName: 'Ilya',lastName: 'Kohanovskiy' });
```

2) Update user first and last name in a collection using atomic update: <br />
```javascript
db.getCollection('users').updateOne({ firstName: 'Ilya' },{ $set: { firstName: "Egor", lastName: "Kohan" } });
```
3) Upsert post to the collection: <br />
```javascriptdb.posts.update({ _id: 1 }, { $set: {
    title: 'news',
    image: 'news.png',
    comments:['Nice information!','I think that it is necessary to know','I dislike it'],
});
```

4) Add comment to the post: <br />
```javascript
db.posts.update({ _id: 1 }, { $push : { comments: 'What do you think about it?' } });
```

5) Remove comment from a post: <br />
```javascript
db.posts.update({ _id: 1 }, { $pull : { comments: 'What do you think about it?' } });
```

6) Remove post from a database : <br />
```javascript
db.posts.remove({ _id : 1 });
```

7) Using aggregation find out how much comments each post have: <br />
```javascript
db.posts.aggregate([{$project: {title:1 ,numberOfComments: { $size: "$comments" }}}]);
```

# Object for advansed version

```javascript
db.posts.insertMany([ 
    { 
        _id: 1, 
        title: 'news', 
        image: 'news.png', 
        comments:[
            { 
                _id : 1,
                text: 'Nice information!',
                userId:ObjectId("59785e869518a68658741488"),
                likes: [
                    { _id : 1, firstName: 'Masha', userId: ObjectId("59785e869518a68658741488") }
                ] 
            }
        ],
        likes: [
            { _id : 1, firstName: 'Egor', userId: ObjectId("59785e6f9518a68658741487") },
            { _id : 2, firstName: 'Masha', userId: ObjectId("59785e869518a68658741488") }
        ] 
    },
    {   
        _id: 2, 
        title: 'job', 
        image: 'job.png', 
        comments:[
            {
                _id : 1, 
                text: 'Great information!', 
                userId: ObjectId("59785e6f9518a68658741487"),
                likes: [
                    { _id : 1, firstName: 'Egor', userId: ObjectId("59785e6f9518a68658741487") }
                ] 
            }
        ],
        likes: [
            { _id : 1, firstName: 'Egor', userId: ObjectId("59785e6f9518a68658741487") }
        ]        
    },
    {   
        _id: 3, 
        title: 'entertaiment', 
        image: 'entertaiment.png', 
        comments:[
            { 
                _id : 1, 
                text: 'Awesome information!', 
                userId:ObjectId("59785e6f9518a68658741487"),
                likes: [
                    { _id : 1, firstName: 'Egor', userId: ObjectId("59785e6f9518a68658741487") },
                    { _id : 2, firstName: 'Masha', userId: ObjectId("59785e869518a68658741488") }
                ]  
            },
            { 
                _id : 2, 
                text:'I think that it is possible to learn', 
                userId:ObjectId("59785e869518a68658741488") }
        ],
        likes: [
            { _id : 1, firstName: 'Masha', userId: ObjectId("59785e869518a68658741488") }
        ] 
    }
]);
```

8) Implement like/unlike functionality for posts: <br />

    - Add like to the post: <br />

    ```javascript
    db.posts.update({ _id: 3}, { $push: { likes: { _id: 5, firstName: 'Vanya', userId: '3256345' } } });
    ```

    - Remove like from post: <br />

    ```javascript
    db.posts.update({ _id: 2}, { $pull: { likes: { _id: 1} } });
    ```

9) Implement like/unlike functionality for comments: <br />

    - Add like to the comments: <br />

    ```javascript
    db.posts.update({ _id: 3, 'comments._id': 1 }, { $push: { 'comments.$.likes': { _id: 5, firstName: 'Petya', userId: 43345 } } });
    ```

    - Remove like from comments: <br />

    ```javascript
    db.posts.update({ _id: 1, 'comments._id': 1 }, { $pull: { 'comments.$.likes': { _id: 1 } } });
    ```