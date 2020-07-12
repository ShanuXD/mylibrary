const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const Book = require('../models/book')
const Author = require('../models/author')
const uploadPath = path.join('public', Book.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimeType))
            //console.log('file type', file)
    }
})

//all book Route
router.get('/', async(req, res) => {

    res.send('all books')

})


//new book Route
router.get('/new', async(req, res) => {

        renderNewPage(res, new Book())


    })
    //create book route
router.post('/', upload.single('cover'), async(req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    console.log((req.file))
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        coverImageName: fileName,
        description: req.body.description
    })
    console.log(book)

    try {
        const newBook = await book.save()
            //res.redirect('books/${new.Book.Id}')
        res.redirect('books')
    } catch {
        renderNewPage(res, book, true)

    }

})

async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find({})
        const params = {
            authors: authors,
            book: book
        }
        if (hasError) params.errorMessage = 'Error occur'
        res.render('books/new', params)
    } catch {
        res.redirect('/books')
    }

}


module.exports = router