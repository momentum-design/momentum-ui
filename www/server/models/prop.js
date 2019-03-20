const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');
const uniqueValidator = require('mongoose-unique-validator');

const PropSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    default: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);
PropSchema.plugin(findOrCreate);
PropSchema.plugin(uniqueValidator);

module.exports = PropSchema;
