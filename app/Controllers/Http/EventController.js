'use strict'

const Event = use('App/Models/Event')
// const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with events
 */
class EventController {

  // listar todos
  async index({ request }) {

    const { email, latitude, longitude } = request.all()

    if (!email) {
      const events = Event.query()
        .with('images')
        .nearBy(latitude, longitude, 10)
        .fetch()

      return events
    }

    if (email) {
      // const users = User.query()
      //   .select('id')
      //   .where('email', '=', email)
      //   .fetch()

      // return Object.keys(users)
      // return JSON.parse(users)
      const events = Event.query()
        .with('images')
        .where('user_id', '=', 1)
        .fetch()

      return events
    }

  }

  // criar
  async store({ auth, request, response }) {

    const { id } = auth.user

    const data = request.only([
      'title',
      'description',
      'playersnum',
      'restriction',
      'latitude',
      'longitude'
    ])

    const event = await Event.create({ ...data, user_id: id })

    return event
  }

  // listar 1 registro
  async show({ params }) {
    const event = await Event.findOrFail(params.id)

    await event.load('images')

    return event
  }

  // atualizar
  async update({ params, request, response }) {
    const event = await Event.findOrFail(params.id)

    const data = request.only([
      'title',
      'description',
      'playersnum',
      'restriction',
      'latitude',
      'longitude'
    ])

    event.merge(data)

    await event.save()

    return event
  }

  // apagar
  async destroy({ params, auth, response }) {
    const event = await Event.findOrFail(params.id)

    if (event.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await event.delete()
  }
}

module.exports = EventController
