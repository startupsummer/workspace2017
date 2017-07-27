## Users

Clear all documents from collection
```js
db.users.remove({})
```

Add sample users
```js
db.users.insertMany([{
  _id: 1,
  first_name: 'Isaac',
  last_name: 'Newton'
}, {
  _id: 2,
  first_name: 'Albert',
  last_name: 'Enstein'
}, {
  _id: 3,
  first_name: 'Nikola',
  last_name: 'Tesla'
}])
```

##### Create a new user in a database.
`$isolated` acquires a lock on this filed.
`$set` keeps existing files and adds/updates `first_name`.
```js
db.users.updateOne({
  _id: 2,
  $isolated : 1
}, {
  $set: {
    first_name: 'Molbert'
  }
})
```

See result
```js
db.users.find({})
```

## Posts

Clear all documents from collection
```js
db.posts.remove({})
```

Add sample posts
```js
db.posts.insertMany([{
  _id: 1,
  title: 'Ливень подтопил многие улицы в Минске',
  content: 'Вечером 25 июля Минск накрыл сильный и продолжительный ливень. Информации о чрезвычайных происшествиях, связанных со стихией, пока не поступало. Пользователи соцсетей размещают фотографии зловещего грозового неба и видеозаписи с подтопленных улиц. Очевидцы сообщают о подтоплениях, в частности, на улицах Могилевской, Волгоградской, Якуба Коласа, Тростенецкой. Ситуация не критичная, но местами из-за луж образуются заторы. Многие водители в нерешительности останавливаются перед «большой водой», а затем разворачиваются. Другие самоуверенно штурмуют водные преграды.',
  comments: [{
    _id: 1,
    user_id: 1,
    content: 'Hi buddy how ya doing!',
    likes: [ 1 ]
  }, {
    _id: 2,
    user_id: 2,
    content: 'Wwwwaaaassssuuuuuppppp',
    likes: []
  }],
  likes: [ 1, 2, 3 ]
}, {
  _id: 2,
  title: '«Басков забрал песню — купил квартиру». Белорусские авторы рассказывают, как написать хит и продать его',
  content: 'Говорят, что готовую песню белорусский эстрадный исполнитель может купить всего за $1 тыс. Другое дело, что он потом будет с этим добром делать. Впрочем, все лавры достанутся именно ему. На него же спустят и всех собак в случае провала. Onliner.by поговорил с людьми, которые пишут и продают эти песни, и узнал про методы работы, муки творчества и конкретные цифры. Спойлер: Филипп Киркоров платит молодым авторам $2—3 тыс.',
  comments: [{
    _id: 1,
    user_id: 2,
    content: 'Owmainegod! It\'s rofl!',
    likes: [ 1, 2, 3 ]
  }],
  likes: [ 2, 1 ]
}])
```

##### Upsert post to the database.
`usperst` results in update, when post exists, otherwise it is inserted.
```js
db.posts.update({
    _id: 0,
}, {
    title: 'Радиация, скука, гравитация, или Почему человек не колонизирует Марс',
    content: 'Стремление человека в космос превосходит его возможности. По крайней мере, сегодня. На самом ближайшем к Земле небесном теле — Луне — побывало 12 человек. Это было настолько давно, что многие уже не верят в произошедшее и подозревают «фотошоп», а кто-то начал забывать. Нет, к спутнику нашей планеты интерес не потерян, а в последнее время даже растет. Но дальше планов дело не идет. К примеру, чуть более 10 лет назад президент и генеральный конструктор РКК «Энергия» Николай Севастьянов заявил, что к 2015 году на Луне появится постоянная база, а к 2020-му начнется добыча гелия-3. Не сложилось. Однако мы верим: в обозримом будущем на Луну вновь ступит нога человека.',
    comments: [{
        _id: 1,
        user_id: 1,
        content: 'Lorem ipsum dolor sit rofl!',
        likes: []
    }],
    likes: []
}, {
    upsert: true
})
```

##### Add comment to the post.
 `findAndModify` is used because why not? Inserion in array happens in `$push` operator. It insets new comment to found post in `comments` array.
```js
db.posts.findAndModify({
  query: {
    _id: 2
  },
  update: {
    $push: {
      comments: {
        _id: 2,
        user_id: 2,
        content: 'Pointless',
        likes: []
      }
    }
  }
})
```

##### Remove comment from a post.
Comment with `id: 1` is removed. It is `$pull`ed from comments array of found post.
```js
db.posts.findAndModify({
  query: {
    _id: 2
  },
  update: {
    $pull: {
      comments: {
        _id: 1
      }
    }
  }
})
```

##### Remove post from a database.
Nothing special.
```js
db.posts.remove({ _id: 0 })
```

##### Using aggregation find out how much comments each post have.
`$project` works like `posts.map(item => projection)`. It grabs only `_id` and instead  of comments places their length.
```js
db.posts.aggregate([{
  $project: {
    _id: "$_id",
    count: {
      $size: "$comments"
    }
  }
}])
```

##### Implement like/unlike functionality for posts.
Simple. Push/Pull and `_id` from likes array.
```js
db.posts.findAndModify({
  query: {
    _id: 2
  },
  update: {
    $push: {
      likes: 3
    }
  }
})

db.posts.findAndModify({
  query: {
    _id: 1
  },
  update: {
    $pull: {
      likes: 1
    }
  }
})
```

##### Implement like/unlike functionality for comments.
Push/Pull `_id` from a nested array.
```js
db.posts.update({
    _id: 2,
    "comments._id": 2
}, {
    $push: {
        "comments.$.likes": 2
    }
})

db.posts.update({
    _id: 1,
    "comments._id": 1
}, {
    $pull: {
        "comments.$.likes": 1
    }
})
```

See result
```js
db.posts.find({})
```
