import Genre from '../models/genre';
import Book from '../models/book';
import async from 'async';

// Display list of all Genre
export const genre_list = (req, res) => {
  Genre.find()
    .sort([['name', 'ascending']])
    .exec((err, list_genres) => {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.json(list_genres);
    });
};

// Display detail page for a specific Genre
export const genre_detail = (req, res) => {
  async.parallel(
    {
      genre: callback => {
        Genre.findById(req.params.id).exec(callback);
      },

      genre_books: callback => {
        Book.find({ genre: req.params.id }).exec(callback);
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

// Handle Genre create on POST
export const genre_create_post = (req, res) => {
  //Check that the name field is not empty
  req.checkBody('name', 'Genre name required').notEmpty();

  //Trim and escape the name field.
  req.sanitize('name').escape();
  req.sanitize('name').trim();

  //Run the validators
  const errors = req.validationErrors();

  //Create a genre object with escaped and trimmed data.
  const genre = new Genre({ name: req.body.name });

  if (errors) {
    //If there are errors render the form again, passing the previously entered values and errors
    res.send(errors);
    return;
  } else {
    // Data from form is valid.
    //Check if Genre with same name already exists
    Genre.findOne({ name: req.body.name }).exec((err, found_genre) => {
      if (err) {
        return next(err);
      }

      if (found_genre) {
        //Genre exists, redirect to its detail page
        res.send(`the genre: ${found_genre} exists`);
      } else {
        genre.save((err, genre) => {
          if (err) {
            return next(err);
          }
          //Genre saved. Redirect to genre detail page
          res.json(genre);
        });
      }
    });
  }
};

// Handle Genre delete on POST
export const genre_delete_post = (req, res) => {
  req.checkBody('genreid', 'Genre id must exist').notEmpty();

  async.parallel(
    {
      genre: callback => {
        Genre.findById(req.body.genreid).exec(callback);
      },
      genres_books: callback => {
        Book.find({ genre: req.body.genreid }, 'genre id').exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      //Success
      if (results.genres_books.length > 0) {
        //Genre has books. Render in same way as for GET route.
        res.json(results);
        return;
      } else {
        //Author has no books. Delete object and redirect to the list of authors.
        Genre.findByIdAndRemove(req.body.genreid, (err, genre) => {
          if (err) {
            return next(err);
          }
          //Success - got to author list
          res.json(genre);
        });
      }
    },
  );
};

// Handle Genre update on POST
export const genre_update_post = (req, res) => {
  //Sanitize id passed in.
  req.sanitize('id').escape();
  req.sanitize('id').trim();

  //Check that the name field is not empty
  req.checkBody('name', 'Genre name required').notEmpty();

  //Trim and escape the name field.
  req.sanitize('name').escape();
  req.sanitize('name').trim();

  //Create a genre object with escaped and trimmed data.
  const genre = new Genre({ name: req.body.name, _id: req.params.id });

  //Run the validators
  const errors = req.validationErrors();

  if (errors) {
    res.json(errors);
  } else {
    Genre.findByIdAndUpdate(req.params.id, genre, {}, (err, thegenre) => {
      if (err) {
        return next(err);
      }

      res.json(thegenre);
    });
  }
};
