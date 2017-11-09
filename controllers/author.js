import Author from '../models/author';
import async from 'async';
import Book from '../models/book';

// Display list of all Authors
export const author_list = (req, res) => {
  Author.find()
    .sort([['family_name', 'ascending']])
    .exec((err, list_authors) => {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.json(list_authors);
    });
};

// Display detail page for a specific Author
export const author_detail = (req, res, next) => {
  async.parallel(
    {
      author: callback => {
        Author.findById(req.params.id).exec(callback);
      },
      authors_books: callback => {
        Book.find({ author: req.params.id }, 'title summary').exec(callback);
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

// Handle Author create on POST
export const author_create_post = (req, res, next) => {
  req.checkBody('first_name', 'First name must be specified.').notEmpty(); //We won't force Alphanumeric, because people might have spaces.
  req.checkBody('family_name', 'Family name must be specified.').notEmpty();
  req
    .checkBody('family_name', 'Family name must be alphanumeric text.')
    .isAlpha();
  req.checkBody('date_of_birth', 'Invalid date').optional({ checkFalsy: true });
  // .isDate();
  req.checkBody('date_of_death', 'Invalid date').optional({ checkFalsy: true });
  // .isDate();

  req.sanitize('first_name').escape();
  req.sanitize('family_name').escape();
  req.sanitize('first_name').trim();
  req.sanitize('family_name').trim();
  req.sanitize('date_of_birth').toDate();
  req.sanitize('date_of_death').toDate();

  const errors = req.validationErrors();

  const author = new Author({
    first_name: req.body.first_name,
    family_name: req.body.family_name,
    date_of_birth: req.body.date_of_birth,
    date_of_death: req.body.date_of_death,
  });

  if (errors) {
    return next(errors);
  } else {
    // Data from form is valid

    author.save((err, author) => {
      if (err) {
        return next(err);
      }
      //successful - redirect to new author record.
      res.send(author);
    });
  }
};

// Handle Author delete on POST
export const author_delete_post = (req, res, next) => {
  // req.checkBody('authorid', 'Author id must exist').notEmpty();

  async.parallel(
    {
      author: callback => {
        Author.findById(req.params.id).exec(callback);
      },
      authors_books: callback => {
        Book.find({ author: req.params.id }, 'title summary').exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      //Success
      if (results.authors_books.length > 0) {
        //Author has books. Render in same way as for GET route.
        res.json(results);
        return;
      } else {
        //Author has no books. Delete object and redirect to the list of authors.
        Author.findByIdAndRemove(req.params.id, (err, author) => {
          if (err) {
            res.send('an error occurred tryin to delete a author');
          }
          ``;
          //Success - got to author list
          res.json(author);
        });
      }
    },
  );
};

// Handle Author update on POST
export const author_update_post = (req, res) => {
  req.sanitize('id').escape();
  req.sanitize('id').trim();

  req.checkBody('first_name', 'First name must be specified.').notEmpty();
  req.checkBody('family_name', 'Family name must be specified.').notEmpty();
  req
    .checkBody('family_name', 'Family name must be alphanumeric text.')
    .isAlpha();
  req
    .checkBody('date_of_birth', 'Invalid date')
    .optional({ checkFalsy: true })
    .isDate();
  req
    .checkBody('date_of_death', 'Invalid date')
    .optional({ checkFalsy: true })
    .isDate();
  req.sanitize('first_name').escape();
  req.sanitize('family_name').escape();
  req.sanitize('first_name').trim();
  req.sanitize('family_name').trim();
  req.sanitize('date_of_birth').toDate();
  req.sanitize('date_of_death').toDate();

  //Run the validators
  const errors = req.validationErrors();

  //Create a author object with escaped and trimmed data (and the old id!)
  const author = new Author({
    first_name: req.body.first_name,
    family_name: req.body.family_name,
    date_of_birth: req.body.date_of_birth,
    date_of_death: req.body.date_of_death,
    _id: req.params.id,
  });

  if (errors) {
    //If there are errors render the form again, passing the previously entered values and errors
    res.json(errors);
    return;
  } else {
    // Data from form is valid. Update the record.
    Author.findByIdAndUpdate(req.params.id, author, {}, (err, theauthor) => {
      if (err) {
        res.send('an error occurred tryin to update an author');
      }
      //successful - display updated author
      res.json(theauthor);
    });
  }
};
