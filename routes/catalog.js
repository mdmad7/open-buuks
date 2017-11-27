import { Router } from 'express';
const router = new Router();

import passport from 'passport';
import passportConfig from '../passport';

const passportJWTAuth = passport.authenticate('jwt', { session: false });

// Require controller modules
import * as book_controller from '../controllers/book';
import * as author_controller from '../controllers/author';
import * as genre_controller from '../controllers/genre';
import * as book_instance_controller from '../controllers/bookinstance';

router.get('/statscount', passportJWTAuth, book_controller.stats);

/// BOOK ROUTES ///
/* POST request for creating Book. */
router.post('/book', passportJWTAuth, book_controller.book_create_post);

// POST request to delete Book
router.delete('/book/:id', passportJWTAuth, book_controller.book_delete_post);

// POST request to update Book
router.put('/book/:id', passportJWTAuth, book_controller.book_update_post);

/* GET request for one Book. */
router.get('/book/:id', passportJWTAuth, book_controller.book_detail);

/* GET request for list of all Book items. */
router.get('/books', passportJWTAuth, book_controller.book_list);

/* GET request for list of all Book items for searchbox */
router.get('/books/search', book_controller.book_list_search);

/// AUTHOR ROUTES ///
/* POST request for creating Author. */
router.post('/author', passportJWTAuth, author_controller.author_create_post);

// POST request to delete Author
router.delete(
  '/author/:id',
  passportJWTAuth,
  author_controller.author_delete_post,
);

// POST request to update Author
router.put(
  '/author/:id',
  passportJWTAuth,
  author_controller.author_update_post,
);

/* GET request for one Author. */
router.get('/author/:id', passportJWTAuth, author_controller.author_detail);

/* GET request for list of all Authors. */
router.get('/authors', passportJWTAuth, author_controller.author_list);

/// GENRE ROUTES ///
/* POST request for creating Genre. */
router.post('/genre', passportJWTAuth, genre_controller.genre_create_post);

// POST request to delete Genre
router.delete(
  '/genre/:id',
  passportJWTAuth,
  genre_controller.genre_delete_post,
);

// POST request to update Genre
router.put('/genre/:id', passportJWTAuth, genre_controller.genre_update_post);

/* GET request for one Genre. */
router.get('/genre/:id', passportJWTAuth, genre_controller.genre_detail);

/* GET request for list of all Genre. */
router.get('/genres', passportJWTAuth, genre_controller.genre_list);

/// BOOKINSTANCE ROUTES ///
/* POST request for creating BookInstance. */
router.post(
  '/bookinstance',
  passportJWTAuth,
  book_instance_controller.bookinstance_create_post,
);

// POST request to delete BookInstance
router.delete(
  '/bookinstance/:id',
  passportJWTAuth,
  book_instance_controller.bookinstance_delete_post,
);

// POST request to update BookInstance
router.put(
  '/bookinstance/:id',
  passportJWTAuth,
  book_instance_controller.bookinstance_update_post,
);

/* GET request for one BookInstance. */
router.get(
  '/bookinstance/:id',
  passportJWTAuth,
  book_instance_controller.bookinstance_detail,
);

/* GET request for list of all BookInstance. */
router.get(
  '/bookinstances',
  passportJWTAuth,
  book_instance_controller.bookinstance_list,
);

export default router;
