const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');
const uniqueValidator = require('mongoose-unique-validator');
const VariationSchema = require('./variation');

const SectionSchema = new Schema(
  {
    name: String,
    displayName: String,
    description: String,
    variations: {
      core: VariationSchema,
      react: VariationSchema,
      angular: VariationSchema,
      angularjs: VariationSchema,
    },
    hideCode: Boolean
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);
SectionSchema.plugin(findOrCreate);
SectionSchema.plugin(uniqueValidator);

module.exports = SectionSchema;
