"use strict"

const User = use("App/Models/User")

class UserController {
  async create({ request }) {
    const data = request.only(["username", "email", "password"])

    const user = await User.create(data)

    return user
  }

  // listar 1 registro
  async show({ request, res }) {

    const users = User.query()
      .fetch()

    return users
  }
}

module.exports = UserController