const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');
const uniqueValidator = require('mongoose-unique-validator');

const IconSchema = new Schema({
  name: {
    type: 'string',
    required: true,
    unique: true,
  },
  sizes: {
    type: 'Object',
    required: true,
  },
  colors: {
    type: 'Object',
    required: true,
  },
  tags: Array
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  });
IconSchema.plugin(findOrCreate);
IconSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Icon', IconSchema);
