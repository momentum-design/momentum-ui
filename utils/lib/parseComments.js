const commentsParser = require('./commentsParser');

const parseComments = async (library, file, fileContents) => {
  try {
    let commentBlocks;
    commentsParser.parse(fileContents, {}, parsedObject => {
      if (!parsedObject.blocks.length > 0) return;
      commentBlocks = parsedObject.blocks;
    });
    return commentBlocks;
  } catch (e) {
    throw new Error(console.error(file, e));
  }
};

module.exports = parseComments;
