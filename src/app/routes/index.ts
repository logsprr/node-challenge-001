import express from 'express';
import { ArticleController } from '../controllers/ArticleController';
import { AuthorController } from '../controllers/AuthorController';
import { UserController } from '../controllers/UserController';

const routes = express.Router();

import { AuthToken } from '../services/Auth';
import { Token } from '../services/Token';

const authToken = new AuthToken();
const token = new Token();
const userController = new UserController();
const authorController = new AuthorController();
const articleController = new ArticleController();

routes.post('/login', userController.show);
routes.post('/sign-up', userController.store);
routes.get('/articles', token.verifyLoggedUser, articleController.index);
routes.get('/articles/:id', token.verifyLoggedUser, articleController.show);

routes
  .route('/admin/authors')
  .get(authToken.AuthUser, authorController.index)
  .post(authToken.AuthUser, authorController.store);
routes
  .route('/admin/authors/:id')
  .get(authToken.AuthUser, authorController.show)
  .put(authToken.AuthUser, authorController.update)
  .delete(authToken.AuthUser, authorController.delete);

routes
  .route('/admin/articles')
  .get(authToken.AuthUser, articleController.index)
  .post(authToken.AuthUser, articleController.store);
routes
  .route('/admin/articles/:id')
  .get(authToken.AuthUser, articleController.show)
  .put(authToken.AuthUser, articleController.update)
  .delete(authToken.AuthUser, articleController.delete);

export default routes;
