import Book from '../models/book';
import Author from '../models/author';
import Genre from '../models/genre';
import BookInstance from '../models/bookinstance';

import async from 'async';

export const stats = (req, res) => {
  async.parallel(
    {
      book_count: callback => {
        Book.count(callback);
      },
      book_instance_count: callback => {
        BookInstance.count(callback);
      },
      book_instance_available_count: callback => {
        BookInstance.count({ status: 'Available' }, callback);
      },
      book_instance_loaned_count: callback => {
        BookInstance.count({ status: 'Loaned' }, callback);
      },
      book_instance_maintenance_count: callback => {
        BookInstance.count({ status: 'Maintenance' }, callback);
      },
      author_count: callback => {
        Author.count(callback);
      },
      genre_count: callback => {
        Genre.count(callback);
      },
    },
    (err, results) => {
      res.json(results);
    },
  );
};

// Display list of all books
export const book_list = (req, res) => {
  Book.find()
    .populate('author')
    .populate('genre')
    .exec((err, list_books) => {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.json(list_books);
    });
};

// Display detail page for a specific book
export const book_detail = (req, res) => {
  async.parallel(
    {
      book: callback => {
        Book.findById(req.params.id)
          .populate('author')
          .populate('genre')
          .exec(callback);
      },
      book_instance: callback => {
        BookInstance.find({ book: req.params.id })
          //.populate('book')
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.json(results);
    },
  );
};

// Handle book create on POST
export const book_create_post = (req, res) => {
  // req.checkBody('title', 'Title must not be empty.').notEmpty();
  // req.checkBody('author', 'Author must not be empty').notEmpty();
  // req.checkBody('summary', 'Summary must not be empty').notEmpty();
  // req.checkBody('isbn', 'ISBN must not be empty').notEmpty();

  // req.sanitize('title').escape();
  // req.sanitize('author').escape();
  // req.sanitize('summary').escape();
  // req.sanitize('isbn').escape();
  // req.sanitize('title').trim();
  // req.sanitize('author').trim();
  // req.sanitize('summary').trim();
  // req.sanitize('isbn').trim();
  // req.sanitize('genre').escape();

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: req.body.genre,
    publisher: req.body.publisher,
    year_of_publication: req.body.year_of_publication,
    // genre:
    //   typeof req.body.genre === 'undefined' ? [] : req.body.genre.split(','),
  });

  const errors = req.validationErrors();
  if (errors) {
    // Some problems so we need to re-render our book

    //Get all authors and genres for form
    async.parallel(
      {
        authors: callback => {
          Author.find(callback);
        },
        genres: callback => {
          Genre.find(callback);
        },
      },
      (err, results) => {
        if (err) {
          return next(err);
        }

        // Mark our selected genres as checked
        for (i = 0; i < results.genres.length; i++) {
          if (book.genre.indexOf(results.genres[i]._id) > -1) {
            //Current genre is selected. Set "checked" flag.
            results.genres[i].checked = 'true';
          }
        }

        res.json(results);
      },
    );
  } else {
    // Data from form is valid.
    // We could check if book exists already, but lets just save.

    book.save((err, book) => {
      if (err) {
        return next(err);
      }
      //successful - redirect to new book record.
      res.json(book);
    });
  }
};

// Handle book delete on POST
export const book_delete_post = (req, res) => {
  req.checkBody('bookid', 'Book id must exist').notEmpty();
  async.parallel(
    {
      book: callback => {
        Book.findById(req.params.id).exec(callback);
      },
      book_instance: callback => {
        BookInstance.find(
          { book_instance: req.params.id },
          'title summary',
        ).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      //Success
      if (results.book_instance.length > 0) {
        //Book has instances. Render in same way as for GET route.
        res.json(results);
        return;
      } else {
        //Author has no books. Delete object and redirect to the list of authors.
        Book.findByIdAndRemove(req.params.id, (err, book) => {
          if (err) {
            return next(err);
          }
          //Success - got to author list
          res.json(book);
        });
      }
    },
  );
};

// Handle book update on POST
export const book_update_post = (req, res) => {
  //Sanitize id passed in.
  // req.sanitize('id').escape();
  // req.sanitize('id').trim();

  // //Check other data
  // req.checkBody('title', 'Title must not be empty.').notEmpty();
  // req.checkBody('author', 'Author must not be empty').notEmpty();
  // req.checkBody('summary', 'Summary must not be empty').notEmpty();
  // req.checkBody('isbn', 'ISBN must not be empty').notEmpty();

  // req.sanitize('title').escape();
  // req.sanitize('author').escape();
  // req.sanitize('summary').escape();
  // req.sanitize('isbn').escape();
  // // req.sanitize('genre').escape();
  // req.sanitize('title').trim();
  // req.sanitize('author').trim();
  // req.sanitize('summary').trim();
  // req.sanitize('isbn').trim();
  // // req.sanitize('genre').trim();

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: req.body.genre,
    publisher: req.body.publisher,
    year_of_publication: req.body.year_of_publication,
    // genre: typeof req.body.genre === 'undefined' ? [] : req.body.genre,
    _id: req.params.id, //This is required, or a new ID will be assigned!
  });

  const errors = req.validationErrors();
  if (errors) {
    // Re-render book with error information
    // Get all authors and genres for form
    async.parallel(
      {
        authors: callback => {
          Author.find(callback);
        },
        genres: callback => {
          Genre.find(callback);
        },
      },
      (err, results) => {
        if (err) {
          return next(err);
        }

        // Mark our selected genres as checked
        for (i = 0; i < results.genres.length; i++) {
          if (book.genre.indexOf(results.genres[i]._id) > -1) {
            results.genres[i].checked = 'true';
          }
        }
        res.json(results);
      },
    );
  } else {
    // Data from form is valid. Update the record.
    Book.findByIdAndUpdate(req.params.id, book, {}, (err, thebook) => {
      if (err) {
        return next(err);
      }
      //successful - redirect to book detail page.
      res.json(thebook);
    });
  }
};
