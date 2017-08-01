db.posts.remove({})

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

db.posts.remove({ _id: 0 })

db.posts.aggregate([{
    $project: {
        _id: "$_id",
        count: {
            $size: "$comments"
        }
    }
}])

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

db.posts.find({})