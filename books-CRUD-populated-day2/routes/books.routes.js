const express = require('express')
const router = express.Router()

const Book = require('../models/book.model')

// Es necesario requerir el modelo de la relación
const Author = require('../models/author.model')


// Listado de libros
router.get('/list', (req, res) => {
  Book.find()
    .then(allBooks => res.render('books/books-list', { books: allBooks }))
    .catch(err => console.log("Error consultadno los libros en la BBDD: ", err))
})


// Detalle de libro
router.get('/details/:theBookIdFromTheURL', (req, res) => {

  const bookId = req.params.theBookIdFromTheURL


  if (!/^[0-9a-fA-F]{24}$/.test(bookId)) {
    return res.status(404).render('not-found');
  }


  Book.findById(bookId)
    .populate('author')
    .then(theBook => res.render('books/book-details', theBook))
    .catch(err => console.log("Error consultadno el libro en la BBDD: ", err))
})


// Creación de libro
router.get('/add', (req, res) => res.render('books/book-form'))
router.post('/add', (req, res) => {

  const { title, author, description, rating } = req.body

  Book.create({ title, author, description, rating })
    .then(() => res.redirect('/books/list'))
    .catch(err => console.log(err))
})



// Editar libro
router.get('/edit', (req, res) => {

  const bookId = req.query.bookId

  Book.findById(bookId)
    .then(theBook => res.render('books/book-edit', theBook))
    .catch(err => console.log(err))
})
router.post('/edit/:bookId', (req, res) => {
  console.log("EL Id del lirbo que llega como URL param es:", req.params.bookId)
  const bookId = req.params.bookId

  // Retorna el objeto actualizado:
  // Book.findByIdAndUpdate(bookId, req.body, {new: true}) 

  Book.findByIdAndUpdate(bookId, req.body)
    .then(x => res.redirect(`/books/details/${bookId}`))
    .catch(err => console.log(err))
})

module.exports = router