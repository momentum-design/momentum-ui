const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');
const uniqueValidator = require('mongoose-unique-validator');
const SectionSchema = require('./section');
const PropSchema = require('./prop');

const ComponentSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: 'string',
      required: true,
    },
    displayName: 'string',
    sections: [SectionSchema],
    tags: Array,
    props: {
      core: [PropSchema],
      react: [PropSchema],
      angular: [PropSchema],
      angularjs: [PropSchema],
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);
ComponentSchema.plugin(findOrCreate);
ComponentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Component', ComponentSchema);
