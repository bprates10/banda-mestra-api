'use strict'

// const Image = use('App/Models/Image')
const Helpers = use('Helpers')
const Event = use('App/Models/Event')

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  /**
   * Create/save a new image.
   * POST images
   */
  async store({ params, request }) {
    const event = await Event.findOrFail(params.id)

    const images = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    await images.moveAll(Helpers.tmpPath('uploads'), file => ({
      name: `${Date.now()}-${file.clientName}`
    }))

    if (!images.movedAll()) {
      return images.errors()
    }

    await Promise.all(
      images
        .movedList()
        .map(image => event.images().create({ path: image.fileName }))
    )
  }

  async show({ params, response }) {

    return response.download(Helpers.tmpPath(`uploads/${params.path}`))

  }
}

module.exports = ImageController