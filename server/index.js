const express = require('express')
const bodyParser = require('body-parser')
const Goal = require('./models/goal')
const app = express()

require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
  });

app.use(bodyParser.json())

app.get('/goals', (req, res) => {
    Goal.find()
        .then(goals => res.send({goals}))
        .catch(err => res.status(400).send(err))
})

app.post('/goals', (req, res) => {
    let goal = new Goal(req.body)
    goal.save()
        .then(doc => res.send(doc))
        .catch(err => res.status(400).send(err))
})

app.delete('/goals', (req, res) => {
    Goal.findByIdAndDelete({_id: req.query.id})
        .then(doc => res.send(doc))
        .catch(err => res.status(400).send(err))
})

app.put('/goals', (req,res) => {
    Goal.findByIdAndUpdate({_id: req.body._id}, {$set: req.body})
        .then(doc => res.send(doc))
        .catch(err => res.status(400).send(err))
})

app.listen(process.env.PORT, () => console.log(`started on port ${process.env.PORT}`))

module.exports = {app}
