***Mandatory task:***

1) Create user in Users db: <br />
`db.getCollection('Users').insertOne({_id: 3,firsName: "Anton",surname: "OSNN"})`

2) Update user first and last name in a database using atomic update: <br />
	`db.getCollection('Users').update( {_id: 2 }, {$set: {firstName: "Jack" } })`

3) Upsert post to the database: <br />
	`db.getCollection('Post').update( { _id:2 }, { $set: { title: "Weather" } }, { upsert: true } )`

4) Add comment to the post: <br />
	`db.getCollection('Post').update( { _id:2 }, { $push: { comments: { _id: 4, name: "comment4", context: "con4" } } } )`

5) Remove comment from a post: <br />
	`db.getCollection('Post').update( { _id:2 }, { $pull: { comments: { _id: 4} } } )`

6) Remove post from a database (with specific id): <br />
	`db.getCollection('Post').remove({ _id: 1 }, true)`

7) Using aggregation find out how much comments each post have: <br />
	`db.getCollection('Post').aggregate([
		{
		   $project: {
		       size: { $size: "$comments" }
		   }
		}
])`

	
***Advanced:***

1) Implement like/unlike functionality for posts: <br />
	- Add like to the post: <br />
	 	`db.getCollection('Post').update( { _id:2 }, { $push: { likes: { _id: 12, userName: "TestUser", user_id: "testuser_id" } } } )`

	- Remove like from post: <br />
		`db.getCollection('Post').update( { _id:2 }, { $pull: { likes: { _id: 12 } } } )`


2) Implement like/unlike functionality for comments: <br />
	- Add like to the comments: <br />
		`db.getCollection('Post').update( { "_id":2, "comments._id": 1 }, {
		    "$push": {
			    "comments.$.likes": 
          {
              _id: 12,
              "userName": "TestUser", 
              "user_id": "testuser_id" 		
          }
			  }
		 } )`


	- Remove like from comments: <br />
		`db.getCollection('Post').update( { "_id":2, "comments._id": 1 }, {
		    "$pull": {
			    "comments.$.likes": 
          {
              _id: 15	
          }
			  }
		 } )`

