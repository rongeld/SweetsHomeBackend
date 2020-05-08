const mongoose = require('mongoose');
const slugify = require('slugify');

const categoryModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category should have a name'],
      unique: true,
      trim: true
    },
    photo: {
      type: String
    },
    description: {
      type: String,
      required: [
        true,
        'Sorry, but yous should spend a little bit more time here and describe your category. Why? Who knows'
      ],
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
categoryModel.pre('save', function(next) {
  this.slug = slugify(this.name, {
    lower: true
  });

  next();
});

categoryModel.virtual('products', {
  ref: 'Sweet',
  foreignField: 'category',
  localField: '_id'
});

const Category = mongoose.model('Category', categoryModel);

module.exports = Category;
