'use strict'

const User = use("App/Models/User")

class SessionController {
  async create({ request, auth }) {

    const { email, password } = request.all()
    // return { teste: email }
    const token = await auth.attempt(email, password)

    if (!token) {
      return 'ERRO'
    }

    const data = User.query()
      .select('email')
      .where('username', '=', 'bprates10')
      .fetch()

    return { token, email }
  }
}

module.exports = SessionController