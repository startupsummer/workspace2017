Mandatory task:

1. Create a new user in a database
```
db.getCollection('users').insertOne({_id: 1, firstName:'Sasha', lastrName:'Borisow'})
db.getCollection('users').insertOne({_id: 1, firstName:'Jora', lastrName:'Volchenko'})
```
2. Update user first and last name in a database using atomic update
```
db.getCollection('users').updateOne({_id: 1}, { $set: {firstName: 'Inokentoj'} })
```
3. Upsert post to the database.
```
db.getCollection('post')
  .update(
  {_id: 11}, 
  { 
      $set: 
      {
       title: 'In Liozno, an eight year old girl was raped. Suspect - local ',
       description: 'In the district center of Liozno, an eight years old girl was raped. Now the child is in intensive care, told TUT.BY the reader who introduced himself as a medical professional. The regional department of the Investigative Committee confirmed this information. The suspect is 45 years old, he is a local resident.'
       }
   },
    { upsert: true })
  ```  
4. Add comment to the post
```
db.getCollection('post')
  .updateOne(
    {_id: 11}, 
    { $set: { 
      coments: [
       { name:'Jvan', 
         content: 'It is legal'
       }
      ]
     } 
    })
 ```   
5. Remove comment from a post.
```
db.getCollection('post').update( 
 { _id: 11 },
 { $pull: { coments: { $elemMatch: {name: 'Jvan'} } } }
)
```
6. Remove post from a database.
```
db.getCollection('post').remove( { _id: 11} )
```
7. Using aggregation find out how much comments each post have.
```
db.getCollection('post').aggregate([
  {
    $project: { size: { $size: '$coments' } }
   }
])
```
Advanced:
```
8. Implement like/unlike functionality for posts.

db.getCollection('post').update( 
 { _id: 12 },
 { $push: { 
     likes: { 
         _id: 444, 
         "userName": "TestUser", 
         "user_id": "testuser_id" 
      } } }
)

db.getCollection('post').update( 
 { _id: 12 },
 { $pull: { likes: { $elemMatch: { _id: 444 } } } }
)
```
9. Implement like/unlike functionality for comments.

```
db.getCollection('post').update( 
 { _id: 12, 'coments.name': 'Jora' },
 { $push: { 
     "coments.$.likes": { 
         _id: 444, 
         "userName": "TestUser", 
         "user_id": "testuser_id" 
      } } }
)
```

```
db.getCollection('post').update( 
 { _id: 12, 'coments.name': 'Jora' },
 { $pull: { 
     "coments.$.likes": { 
         _id: 444,  
      } } }
)
```

