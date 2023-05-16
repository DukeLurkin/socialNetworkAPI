const { Schema, model } = require('mongoose');

// * const thought/email/friendsSchema = require('./')
// Schema to create userName
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
      validate: {
        validator: function (value) {
          // Custom validation function to check if the email is valid
          return /\S+@\S+\.\S+/.test(value);
        },
        message: 'Please enter a valid email address'
      },
    },
  },
  {
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
      },
    ],
  },
  {
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
    ]
  },
  { toJSON: {
    virtuals: true,
  },
  id: false,
  },
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);
module.exports = User;