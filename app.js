const express = require('express')
const morgan = require('morgan')
const cipher = require('./caesarCipher')
const randomGenerator = require('./randomGenerator')
const arrComparer = require('./arrComparer')

const app = express()
app.use(morgan('dev'))


// app.get(PATH, HANDLER)
app.get('/', (req, res) => {
       res.send('!@@@@@###$$$%%%!')
})

app.get('/burgers', (req, res) => {
    res.send('Burgerland USA')
})
app.get('/pizza/pineapple', (req, res) => {
    res.send('Pineapple')
})
app.get('/echo', (req, res) => {
    const responseText = `Here are the details of your request:
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
        Body: ${req.body}
        cookies: ${req.cookies}
        IP: ${req.ip}
        Method: ${req.method}
        query: ${req.query}
    `
    res.send(responseText)
})
app.get('/queryViewer', (req, res) => {
    console.log(req.query)
    res.end()
})
app.get('/greetings', (req, res) => {
    const name = req.query.name 
    const race = req.query.race 

    if (!name){
        return res.status(400).send('Please provide a name')
    }

    if (!race){
        return res.status(400).send('Please provide a race')
    }

    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom`

    res.send(greeting)
})
app.get('/sum', (req, res) => {
    const { a, b } = req.query
    if (!a){
        res.status(400).send('We need an "a" parameter')
    }
    if (!b){
        res.status(400).send('We need a "b" parameter')
    }
    if (isNaN(parseInt(a)) || isNaN(parseInt(b))){
        res.status(400).send('both parameters need to be a number')
    }
    const message = `the sum of ${a} and ${b} is ${parseInt(a) + parseInt(b)}`
    res.send(message)
})
app.get('/cipher', (req, res) => {
    const { text, shift } = req.query
    
    if (!text) {
        res.status(400).send('You must supply a text to encode')
    }
    if (!shift || isNaN(parseInt(shift))){
        res.status(400).send('You must supply an integer encode via')
    }  
    const message = cipher(text, parseInt(shift))
    res.send(message)
})
app.get('/lotto', (req, res) => {
    const lottoArr = randomGenerator()
    // console.log(lottoArr)
    // console.log(req.query.arr)
    if (!req.query.arr || req.query.arr.length !== 6){
        res.status(400).send('Please enter query for array of 6 integers')
    }
    const score = arrComparer(lottoArr, req.query.arr)
    let message = "Sorry, you lose"
    if (score === 4){
        message = "Congrats, you won a free ticket!"
    } else if (score === 5){
        message = "Congrats! You win $100"
    } else if (score === 6){
        message = "Wow! Unbelievable! You could have won megamillions, but this is just a dummy app"
    }
    res.send(message)
})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000...')
})