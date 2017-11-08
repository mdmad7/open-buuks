import { Router } from 'express';
const router = new Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect('/catalog');
});

export default router;
