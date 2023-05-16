const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    // user Mongoose's ObjectId data type default value to new ObjectId
    assignmentId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      min_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // use getter to format timestamp
      get: (date) => {
        if (date) return date.toISOString().split("T")[0];
      },
    },
  }
);

module.exports = reactionSchema;