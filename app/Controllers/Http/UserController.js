"use strict"

const User = use("App/Models/User")

class UserController {
  async create({ request }) {
    const data = request.only(["username", "email", "password"])

    const user = await User.create(data)

    return user
  }

  // listar 1 registro
  async show({ params }) {

    // return params.username

    // const query = { "username": params.username }

    const usersss = User.find({ email: /foo\.bar/, age: { $gte: 30 } });
    console.log(usersss)
    return usersss
  }
}

module.exports = UserController