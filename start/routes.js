'use strict'

const Route = use('Route')

// criar usuario
Route.post('/users', 'UserController.create')
// retornar usuario
Route.get('/users/:mail', 'UserController.show')
// autentica sessao - cria token
Route.post('/sessions', 'SessionController.create')

Route.resource('events', 'EventController')
  .apiOnly()
  .middleware('auth')

Route.post('events/:id/images', 'ImageController.store')
  .middleware('auth')

Route.get('images/:path', 'ImageController.show')