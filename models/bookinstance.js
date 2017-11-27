import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

var BookInstanceSchema = new Schema(
  {
    book: { type: Schema.ObjectId, ref: 'Book', required: true }, //reference to the associated book
    status: {
      type: String,
      required: true,
      enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
      default: 'Available',
    },
    due_back: { type: Date },
    with: { type: String },
  },
  { timestamps: true, toJSON: { virtuals: true, getters: true } },
);

// Virtual for bookinstance's URL
BookInstanceSchema.virtual('url').get(function() {
  return '/catalog/bookinstance/' + this._id;
});

BookInstanceSchema.virtual('due_back_formatted').get(function() {
  return moment(this.due_back).format('MMMM Do, YYYY');
});

BookInstanceSchema.virtual('due_back_yyyy_mm_dd').get(function() {
  return moment(this.due_back).format('YYYY-MM-DD');
});

//`xport model
export default mongoose.model('BookInstance', BookInstanceSchema);
