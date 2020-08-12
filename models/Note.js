const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add title'],
    unique: true,
    trim: true,
    maxlength: [30, 'Title maximum character is 30'],
  },
  description: {
    type: String,
    required: true,
    maxLength: [250, 'Description maximum character is 250'],
  },
})

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema)
