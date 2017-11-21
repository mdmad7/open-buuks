import BookInstance from '../models/bookinstance';
import Book from '../models/book';

import async from 'async';

// Display list of all BookInstances
export const bookinstance_list = (req, res) => {
  BookInstance.find()
    .populate('book')
    .exec((err, list_bookinstances) => {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.json(list_bookinstances);
    });
};

// Display detail page for a specific BookInstance
export const bookinstance_detail = (req, res) => {
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec((err, bookinstance) => {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.json(bookinstance);
    });
};

// Handle BookInstance create on POST
export const bookinstance_create_post = (req, res) => {
  // req.checkBody('book', 'Book must be specified').notEmpty(); //We won't force Alphanumeric, because book titles might have spaces.
  // req.checkBody('imprint', 'Imprint must be specified').notEmpty();
  // req
  //   .checkBody('due_back', 'Invalid date')
  //   .optional({ checkFalsy: true })
  //   .isDate();

  // req.sanitize('book').escape();
  // req.sanitize('imprint').escape();
  // req.sanitize('status').escape();
  // req.sanitize('book').trim();
  // req.sanitize('imprint').trim();
  // req.sanitize('status').trim();
  // req.sanitize('due_back').toDate();

  const bookinstance = new BookInstance({
    book: req.body.book,
    status: req.body.status,
    due_back: req.body.due_back,
  });

  const errors = req.validationErrors();
  if (errors) {
    Book.find({}, 'title').exec((err, books) => {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.json(books);
    });
    return;
  } else {
    // Data from form is valid

    bookinstance.save((err, bookinstance) => {
      if (err) {
        return next(err);
      }
      //successful - redirect to new book-instance record.
      res.json(bookinstance);
    });
  }
};

// Handle BookInstance delete on POST
export const bookinstance_delete_post = (req, res) => {
  // req.checkBody('bookinstanceid', 'Book Instance id must exist').notEmpty();

  //Delete object and redirect to the list of bookinstances.
  BookInstance.findByIdAndRemove(req.params.id, (err, bookinstance) => {
    if (err) {
      return next(err);
    }
    //Success - got to author list
    res.json(bookinstance);
  });
};

// Handle bookinstance update on POST
export const bookinstance_update_post = (req, res, next) => {
  // req.sanitize('id').escape();
  // req.sanitize('id').trim();

  // req.checkBody('book', 'Book must be specified').notEmpty(); //We won't force Alphanumeric, because people might have spaces.
  // req.checkBody('imprint', 'Imprint must be specified').notEmpty();
  // req.checkBody('due_back', 'Invalid date').optional({ checkFalsy: true });
  // // .isDate();

  // req.sanitize('book').escape();
  // req.sanitize('imprint').escape();
  // req.sanitize('status').escape();
  // req.sanitize('book').trim();
  // req.sanitize('imprint').trim();
  // req.sanitize('status').trim();
  // req.sanitize('due_back').toDate();

  var bookinstance = new BookInstance({
    book: req.body.book,
    status: req.body.status,
    due_back: req.body.due_back,
    _id: req.params.id,
  });

  var errors = req.validationErrors();
  if (errors) {
    Book.find({}, 'title').exec(function(err, books) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.json(books);
    });
    return;
  } else {
    // Data from form is valid
    BookInstance.findByIdAndUpdate(
      req.params.id,
      bookinstance,
      {},
      (err, thebookinstance) => {
        if (err) {
          return next(err);
        }
        //successful - redirect to genre detail page.
        res.json(thebookinstance);
      },
    );
  }
};
