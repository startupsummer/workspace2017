```js
use 13_databases
  db.user.insert({lastName: 'lName', firstName: 'fName'})
    db.user.find()
      { "_id" : ObjectId("597857e5c2347e2b927a6529"), "lastName" : "lName", "firstName" : "fName" }

  db.posts.update({page: '1', img: 'url', author: 'uName'}, {page: '1' , img: 'url', author: 'uName'}, true);
    WriteResult({
	"nMatched" : 0,
	"nUpserted" : 1,
	"nModified" : 0,
	"_id" : ObjectId("59785e5c1ed5f6571feba73f")
    })

  db.posts.update({page: '1'}, {$push: {comments: {autor: 'uName1' , Content: 'content 123'}}})
  db.posts.update({page: '1'}, {$push: {comments: {autor: 'uName2' , Content: 'content 2'}}})
  db.posts.update({page: '1'}, {$push: {comments: {autor: 'uName2' , Content: 'content3'}}})

  db.posts.update( { page:  '1' }, { $pull: { 'comments':  { autor: 'uName1', Content: 'content 123'} } } );

  db.posts.insert({page: '2', img: 'url2', author: 'uName2', coments: [] })
    WriteResult({ "nInserted" : 1 })
  db.posts.insert({page: '3', img: 'url3', author: 'uName2', coments: [] })
    WriteResult({ "nInserted" : 1 })
  db.posts.remove({page: '2'})
    WriteResult({ "nRemoved" : 1 })
  db.posts.update( { page: '3' } , { $unset: { coments : [] } } );
  db.posts.aggregate({$match: {}}, {$project: { count: {$size: '$comments'} }} )

  db.posts.update({}, {$set: {likes: []}}, true,true)
  db.posts.update({_id: ObjectId("59785e5c1ed5f6571feba73f")} , {$push: {likes: {authorID: '001'} }} )

  db.posts.update({},{$set: {comments:[]}},true, true)
  db.posts.update({_id: ObjectId("59785e5c1ed5f6571feba73f")} , {$push: {comments: {_id: '01', authorID: '001', content: 'some text', likes: []} }} )
  db.posts.update({_id: ObjectId("59785e5c1ed5f6571feba73f"), "comments._id": '01'}, {$push: { 'comments.$.likes': { authorId: '123' } }} )
```

