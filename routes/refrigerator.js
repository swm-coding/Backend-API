var express = require('express')
var router = express.Router()
var Client = require('mongodb').MongoClient

//refrigerator
router.route('/').get(function(req, res){
    console.log('/refrigerator..')
    var paramCompany = req.query.company
    var paramCapacity = req.query.capacity
    console.log(paramCapacity)

    var query= {}
    if(req.query.company && req.query.company.length != 0) query.company = {$in:paramCompany}
    console.log(req.query.isIgnoreCapacity)
    if(req.query.isIgnoreCapacity == 'false'){
        query.size = {$gte : Number(req.query.capacity[0]), $lte : Number(req.query.capacity[1])}
    }
    if(req.query.isIgnorePrice == 'false'){
        query.price = {$gte : Number(req.query.price[0]), $lte : Number(req.query.price[1])}
    }
    console.log(query)
    var dbsort = { time : -1 }
    Client.connect('mongodb://dev:dev@13.125.4.46:27017', {useNewUrlParser : true}, function(err, doc){
        if(err){
            console.error('Connection failed..', err)
            return
        } else{
            db = doc.db('test')
            refrigeratorColl = db.collection('refrigerator').find(query).sort(dbsort).limit(30).toArray(function(err,docs){
                res.send(docs)
            })
        }
    })
})


module.exports = router