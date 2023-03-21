/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.group(() => {
    Route.get('', 'DocumentTypesController.index');
    Route.post('', 'DocumentTypesController.create');
    Route.delete('/:id', 'DocumentTypesController.delete');
  }).prefix('/document-types').middleware(['auth', 'admin']);

  Route.group(() => {
    Route.get('', 'RolesController.index');
    Route.post('', 'RolesController.create');
    Route.delete('/:id', 'RolesController.delete');
  }).prefix('/roles').middleware(['auth', 'admin']);

  Route.post('/login', 'AuthenticationController.login');

  Route.group(() => {
    Route.get('/getUsers', 'UsersController.index');
    Route.post('/create', 'UsersController.create');
    Route.put('/update/:id', 'UsersController.update');
    Route.get('/getUser/:id', 'UsersController.get');
  }).prefix('/user').middleware(['auth', 'admin']);

  Route.group(() => {
    Route.get('/getQuestions', 'QuestionsController.index');
    Route.post('/create', 'QuestionsController.create');
    Route.put('/updateQuestion/:id', 'QuestionsController.update');
    Route.put('/updateAnswer/:id', 'AnswersController.update');
    Route.get('/getOptions/:id', 'QuestionsController.getOptions');
    Route.get('/deleteQuestion/:id', 'QuestionsController.delete');
  }).prefix('/questions').middleware(['auth', 'admin']);

  Route.group(() => {
    Route.get('/getquestions', 'FormsController.index');
    Route.post('/postquestions', 'FormsController.create');
  }).prefix('/form').middleware('auth');

}).prefix('/api/v1')
