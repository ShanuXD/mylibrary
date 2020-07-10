const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//all author Route
router.get('/', async(req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find({})
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }


})


//new author Route
router.get('/new', (req, res) => {
        res.render('authors/new', { author: new Author() })
    })
    //create author route
router.post('/', async(req, res) => {
    const author = new Author({
        name: req.body.name
    })

    try {
        const newAuthor = await author.save()
            //res.redirect('authors/${newAuthor.id}')
        res.redirect('/authors')
        console.log('save author')

    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: "Error occur while creaing Author"
        })

    }


    /*
    author.save((err, newAuthor) => {
        if (err) {
            res.render('authors/new', {
                author: author,
                errorMessage: "Error occur while creaing Author"
            })

        } else {
            console.log('save author')
            res.redirect('authors')
                //res.redirect('authors/${newAuthor.id}')
        }

    })
    */

})


module.exports = router