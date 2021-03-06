import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

const AuthorSchema = new Schema(
  {
    first_name: { type: String, required: true },
    family_name: { type: String, required: true },
    bio: { type: String },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
  },
  { timestamps: true, toJSON: { virtuals: true, getters: true } },
);

// Virtual for author's full name
AuthorSchema.virtual('name').get(function() {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(function() {
  return '/catalog/author/' + this._id;
});

//Virtual for formatted dates
AuthorSchema.virtual('date_of_birth_formatted').get(function() {
  return this.date_of_birth
    ? moment(this.date_of_birth).format('MMMM Do, YYYY')
    : null;
});

// Virtual for author's full name
AuthorSchema.virtual('fullname').get(function() {
  return `${this.first_name} ${this.family_name}`;
});

AuthorSchema.virtual('date_of_death_formatted').get(function() {
  return this.date_of_death
    ? moment(this.date_of_death).format('MMMM Do, YYYY')
    : null;
});

AuthorSchema.virtual('date_of_birth_yyyy_mm_dd').get(function() {
  return moment(this.date_of_birth).format('YYYY-MM-DD');
});

AuthorSchema.virtual('date_of_death_yyyy_mm_dd').get(function() {
  return moment(this.date_of_death).format('YYYY-MM-DD');
});

//Export model
export default mongoose.model('Author', AuthorSchema);
