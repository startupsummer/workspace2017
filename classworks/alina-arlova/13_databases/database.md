Mandatory task:

1. Create a new user in a database
`db.getCollection('users').insertOne({_id: 1, firstName: 'Alina', lastName: 'Arlova'})`

2. Update user first and last name in a database using atomic update
`db.getCollection('users').updateOne({_id: 1},{ $set: {firstName: 'Sue', lastName: 'Brown'} })`

3. Upsert post to the database.
`db.getCollection('posts').updateOne({ _id: 1 }, {$set: { _id: 1, user_id: 1, content: 'This is a new post', comments: [] }}, { upsert: true })`

4. Add comment to the post
`db.getCollection('posts').updateOne({ _id: 1 }, {$push: { comments: { comment_id: 1, content: 'comment 1', user_id: 1}}})
 db.getCollection('posts').updateOne({ _id: 1 }, {$push: { comments: { comment_id: 2, content: 'comment 2', user_id: 2}}})`

5. Remove comment from a post.
`db.getCollection('posts').updateOne({ _id: 1 }, {$pull: { comments: { comment_id: 2 }}})`

6. Remove post from a database.
`db.getCollection('posts').updateOne({ _id: 2 }, {$set: { _id: 2, user_id: 2, content: 'This is a post for deletion', comments: [] }}, { upsert: true })
 db.getCollection('posts').deleteOne({ _id: 2})`

7. Using aggregation find out how much comments each post have.
`db.getCollection('posts').aggregate(
  [
     {
        $project: {
           numberOfComments: { $size: "$comments" }
        }
     }
  ]
)`

Advanced:

8. Implement like/unlike functionality for posts.
`db.getCollection('posts').updateMany({}, {$set: { likes: []}})
 db.getCollection('posts').updateOne({ _id: 1 }, {$push: { likes: { user_id: 3}}})
 db.getCollection('posts').updateOne({ _id: 1 }, {$pull: { likes: { like_id: 1 }}})`

9. Implement like/unlike functionality for comments.
`db.getCollection('posts').updateOne({ _id: 1, 'comments.comment_id': 1 }, {$push: { 'comments.$.likes': { like_id: 1, user_id: 3 }}})
 db.getCollection('posts').updateOne({ _id: 1, 'comments.comment_id': 1 }, {$pull: { 'comments.$.likes': { like_id: 1}}})`
