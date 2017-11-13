import { Router } from 'express';
const router = new Router();

import passport from 'passport';

const passportJWTAuth = passport.authenticate('jwt', { session: false });

// Require controller modules
import * as book_controller from '../controllers/book';
import * as author_controller from '../controllers/author';
import * as genre_controller from '../controllers/genre';
import * as book_instance_controller from '../controllers/bookinstance';

router.get('/statscount', book_controller.stats);

/// BOOK ROUTES ///
/* POST request for creating Book. */
router.post('/book/create', book_controller.book_create_post);

// POST request to delete Book
router.post('/book/:id/delete', book_controller.book_delete_post);

// POST request to update Book
router.post('/book/:id/update', book_controller.book_update_post);

/* GET request for one Book. */
router.get('/book/:id', book_controller.book_detail);

/* GET request for list of all Book items. */
router.get('/books', passportJWTAuth, book_controller.book_list);

/// AUTHOR ROUTES ///
/* POST request for creating Author. */
router.post('/author/create', author_controller.author_create_post);

// POST request to delete Author
router.post('/author/:id/delete', author_controller.author_delete_post);

// POST request to update Author
router.post('/author/:id/update', author_controller.author_update_post);

/* GET request for one Author. */
router.get('/author/:id', author_controller.author_detail);

/* GET request for list of all Authors. */
router.get('/authors', passportJWTAuth, author_controller.author_list);

/// GENRE ROUTES ///
/* POST request for creating Genre. */
router.post('/genre/create', genre_controller.genre_create_post);

// POST request to delete Genre
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// POST request to update Genre
router.post('/genre/:id/update', genre_controller.genre_update_post);

/* GET request for one Genre. */
router.get('/genre/:id', genre_controller.genre_detail);

/* GET request for list of all Genre. */
router.get('/genres', genre_controller.genre_list);

/// BOOKINSTANCE ROUTES ///
/* POST request for creating BookInstance. */
router.post(
  '/bookinstance/create',
  book_instance_controller.bookinstance_create_post,
);

// POST request to delete BookInstance
router.post(
  '/bookinstance/:id/delete',
  book_instance_controller.bookinstance_delete_post,
);

// POST request to update BookInstance
router.post(
  '/bookinstance/:id/update',
  book_instance_controller.bookinstance_update_post,
);

/* GET request for one BookInstance. */
router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail);

/* GET request for list of all BookInstance. */
router.get('/bookinstances', book_instance_controller.bookinstance_list);

export default router;
