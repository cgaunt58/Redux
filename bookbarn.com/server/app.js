const express = require('express')
const cors = require('cors')
const app = express()
const models = require('./models')
const bcrypt = require("bcryptjs");
require('dotenv').config()
const jwt = require('jsonwebtoken')
const authenticate = require('./utils/authenticationMiddleware')

app.use(express.json())
app.use(cors())



app.post('/add-book', async (req, res) => {
    const book = {
        title: req.body.title,
        genre: req.body.genre,
        publisher: req.body.publisher,
        year: req.body.year,
        imageURL: req.body.imageURL,
        username: req.body.username
    }

    const bookAdded = await models.Book.create(book)
    res.json(bookAdded)
})

app.get('/books', async (req, res) => {
    const books = await models.Book.findAll({})
    res.json(books)
})

app.delete('/delete-book/:id', async (req, res) => {
    try {
        const deletedBook = await models.Book.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({ success: true })
    } catch (error) {
        res.json({ success: false, message: 'Unable to delete book.' })
    }
})

app.get('/update-book/:id', async (req, res) => {
    const book = await models.Book.findOne({
        where: {
            id: req.params.id
        }
    })

    res.json(book)
})

app.post('/update-email/:username', async (req, res) => {
    const user = await models.User.findOne({
        where: {
            email: req.body.oldEmail
        }
    })

    if (user) {
        const userUpdated = await models.User.update({ email: req.body.newEmail }, {
            where: {
                username: req.params.username
            }
        })
        console.log(userUpdated)
        if (userUpdated) {
            res.send({ message: 'Your email address has been updated.' })
        }
    } else {
        res.send({ message: 'Unable to update email address.' })
    }

})

app.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = {
        username: req.body.username,
        password: hashedPassword
    }

    const userCreated = await models.User.create(user)
    res.json(userCreated)
})

app.post('/login', async (req, res) => {
    console.log(req.body.username)
    const user = await models.User.findOne({
        where: {
            username: req.body.username
        }
    })

    if (user) {
        const match = await bcrypt.compare(req.body.password, user.dataValues.password)
        console.log(match)
        if (match) {
            
            const token = jwt.sign({ username: user.dataValues.username }, process.env.JWT_SECRET_KEY)
            res.send({ message: 'SUCCESS', username: user.dataValues.username, token: token })
        } else {
         
            res.send({ message: 'AUTHENTICATION ERROR' })
        }
    }
    else {
     
        res.send({ message: 'AUTHENTICATION ERROR' })
    }

})

app.get('/:username/my-books', authenticate, async (req, res) => {
    console.log('hi')
    const books = await models.Book.findAll({
        where: {
            username: req.params.username
        }
    })
    
    res.json(books)
})

app.listen(8080, () => {
    console.log('Server is running...')
})