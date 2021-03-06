import mongoose, { Schema } from 'mongoose';

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.ObjectId, ref: 'Author', required: true },
    summary: { type: String },
    publisher: { type: String },
    year_of_publication: { type: String },
    isbn: { type: String, required: true },
    genre: [{ type: Schema.ObjectId, ref: 'Genre' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
  },
);

// Virtual for book's URL
BookSchema.virtual('url').get(function() {
  return '/catalog/book/' + this._id;
});

//Export model
export default mongoose.model('Book', BookSchema);
