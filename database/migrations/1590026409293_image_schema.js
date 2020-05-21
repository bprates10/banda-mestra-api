'use strict'

const Schema = use('Schema')

class ImageSchema extends Schema {
  up() {
    this.create('images', table => {
      table.increments()
      table
        .integer('event_id')
        .unsigned()
        .references('id')
        .inTable('events')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('path').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('images')
  }
}

module.exports = ImageSchema