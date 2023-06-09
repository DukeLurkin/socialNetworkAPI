const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // use getter to format timestamp
      get: (date) => {
        if (date) return date.toISOString().split("T") [0];
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  { toJSON: {
    virtuals: true,
  },
  id: true,
  },
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);
module.exports = Thought;