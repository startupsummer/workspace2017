***Mandatory task:***

1) Create user in Users db: <br />
`db.getCollection('users').insertOne( { _id: 2, firstName: "Oleg", lastname: "Baran"} )`

2) Update user first and last name in a database using atomic update: <br />
	`db.getCollection('users').updateOne( { _id:3 },
    { $set: { firstName : "Ilya" } },
    { upsert: true }
    )`

3) Upsert post to the database: <br />
	`db.getCollection('posts').updateOne(
    { _id: 1 },
    { $set: {
        user_id: 4,
        title: "In lyozna raped 8-years old girl. The suspect is a local resident",
        content: "In district Liozno raped 8-the summer girl. The child is now in intensive care, said TUT.BY the reader is presented by the health care provider. In the regional Department of the Investigative Committee confirmed the information. The suspect is 45 years, he is a local resident. \n — Liozno district Department of the Investigative Committee opened a criminal case under part 3 of article 166 of the Criminal code (Rape of a minor knowingly) in respect of a previously convicted resident of Liozno in 1972 — said TUT.BY the official representative of the USK in the region Svetlana Sakharova. — The investigators carry out the necessary actions to establish all the circumstances of the incident. The girl is being treated in a medical facility. The life of the girl threatens nothing. \napadenie on the girl occurred on the night of 3 June 4, about an hour in the apartment at the place of residence, — BelTA learnt from the Liozno district attorney Denis Zhurko. \n— that evening the victim's mother celebrated a birthday with two girlfriends. At some point they went to the neighbor to continue drinking alcohol, and the girl's parents and she went to sleep. In this case the door is not locked to girlfriend upon return did not knock and Wake them. So the neighbor and was able to get to the apartment and commit the crime. Parents caught it too late, he managed to escape from the crime scene to his home, where he was captured — told details, the Prosecutor. \podozrevaemogo charged under part 3 of article 166 of the Criminal code. Man taken into custody.",
        date: new Date(),
        views: 9999999999,
        shares: [3],
        likes: [
            {
                _id: 1,
                userId: 3,
                type: "like",
            },
            {
                _id: 2,
                userId: 3,
                type: "sad",
            }
        ],
        comments: [
            {
                _id: 1,
                text: "OMG",
                user_id: 2,
                comment_likes: [ {
                    _id: 1,
                    userId: 3,
                    type: "like",
                }],
            },
            {
                _id: 2,
                text: "OMG",
                user_id: 2,
                comment_likes: [{
                    _id: 2,
                    userId: 4,
                    type: "sad",
                }],
            }
        ]       
    }},
    { upsert: true }
)`

4) Add comment to the post: <br />
	`db.getCollection('posts').updateOne(
    { _id: 1},
    { $push: {
        comments: {
            _id: 3,
            text: "LOL",
            user_id: 3,
            likes: [{
                    _id: 3,
                    userId: 4,
                    type: "sad",
                }]            
            }
    }}
  )`

5) Remove comment from a post: <br />
	`db.getCollection('posts').updateOne(
    { _id: 1},
    { $pull: {
         comments: { _id: 3 }


    }}
  )   `

6) Remove post from a database (with specific id): <br />
	`db.getCollection('posts').deleteOne( { _id: 1 })`

7) Using aggregation find out how much comments each post have: <br />
	`db.getCollection('posts').aggregate(
     [
       {
          $project: { numberOfComments: { $size: '$comments'}}
       },
     ]
   )`


***Advanced:***

1) Implement like/unlike functionality for posts: <br />
	- Like: <br />
	 	`db.getCollection('posts').updateOne(
      { _id: 1},
      { $push: {
          likes: {
              _id: 3,
              type: "hangry",
              user_id: 3,            
              }
      }}
    ) `

	- Unlike: <br />
		`db.getCollection('posts').updateOne(
      { _id: 1},
      { $pull: {
           likes: { _id: 3 }


      }}
    )`


2) Implement like/unlike functionality for comments: <br />
	- Like: <br />
		`db.getCollection('posts').update(
      { _id: 1, "comments._id": 1 },
      { $push: {
        "comments.$.comment_likes":
          {
              _id: 3,
              type: "hangry",
              user_id: 3,            
          }
      } }
    )`


	- Unlike: <br />
		`db.getCollection('posts').updateOne(
      { _id: 1, "comments._id": 1},
      { $pull: {
        "comments.$.comment_likes":
          { _id: 3 }
      }}
    )`
