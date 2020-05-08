const mongoose = require('mongoose');
const slugify = require('slugify');

const sweetModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Masterpiece has to have a name'],
      unique: true,
      trim: true,
      maxLength: [40, 'Sweet must be less than 40 characters'],
      minLegnth: [5, 'Sweet must have more than 2 characters']
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Review must belong to the tour']
    },
    price: {
      type: Number,
      required: [true, 'Sweet must have a price'],
      min: [1, 'Sweet can`t cost less than 1']
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    photo: {
      type: String
    },
    description: {
      type: String,
      required: [true, 'Sweet is not a sweet without description'],
      maxLength: [40, 'Description must be less than 200 characters'],
      minLegnth: [5, 'Description must have more than 5 characters']
    },
    slug: String
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

sweetModel.pre(/^find/, function() {
  this.populate({
    path: 'category',
    select: 'name'
  });
});

sweetModel.pre('save', function(next) {
  this.slug = slugify(this.name, {
    lower: true
  });

  next();
});

const Sweet = mongoose.model('Sweet', sweetModel);

module.exports = Sweet;
