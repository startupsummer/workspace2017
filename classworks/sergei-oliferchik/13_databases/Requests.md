db.getCollection('users').insertOne({_id: 1, firstName:'Sasha', lastrName:'Borisow'})
db.getCollection('users').insertOne({_id: 1, firstName:'Jora', lastrName:'Volchenko'})

db.getCollection('users').updateOne({_id: 1}, { $set: {firstName: 'Inokentoj'} })



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


db.getCollection('post').update( 
 { _id: 11 },
 { $pop: { coments: { $elemMatch: {name: 'Jvan'} } } }
)


db.getCollection('post').remove( { _id: 11} )

db.getCollection('post').aggregate([
  {
    $project: { size: { $size: '$coments' } }
   }
])



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
 { $pop: { likes: { $elemMatch: { _id: 444 } } } }
)

