const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');
const uniqueValidator = require('mongoose-unique-validator');

const VariationSchema = new Schema(
  {
    example: {
      type: 'string'
    },
    escaped: {
      type: 'string'
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);
VariationSchema.plugin(findOrCreate);
VariationSchema.plugin(uniqueValidator);

module.exports = VariationSchema;
