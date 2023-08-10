class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1A- FILTERING
    // Create a copy of the request query object to avoid modification of the original
    const queryObj = { ...this.queryString };

    // List of fields to exclude from the query
    const excludeFields = ['page', 'sort', 'limit', 'fields'];

    // Delete excluded fields from the query object
    excludeFields.forEach((el) => delete queryObj[el]);

    // 1B- ADVANCED FILTERING
    // Convert the query object to a string
    let queryString = JSON.stringify(queryObj);

    const pattern = /\b(gte|gt|lte|lt)\b/g;
    const replacement = (match) => `$${match}`;
    queryString = JSON.parse(queryString.replace(pattern, replacement));

    // Create the base query using the modified query string
    this.query.find(queryString);
    //let query = Tour.find(queryString);
    return this;
  }

  sort() {
    // 2- SORTING
    // Check if a sort parameter exists in the request query
    if (this.queryString.sort) {
      // Replace all commas with a space to make it a valid sort field
      const sortFields = this.queryString.sort.replace(/,/g, ' ');
      this.query = this.query.sort(sortFields);
    } else {
      // If no sort parameter, sort by the creation date in descending order
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limit() {
    // 3- FIELD LIMITING
    // Check if a fields parameter exists in the request query
    if (this.queryString.fields) {
      // Replace all commas with a space to make it a valid field selection
      const fields = this.queryString.fields.replace(/,/g, ' ');
      this.query = this.query.select(fields);
    } else {
      // If no fields parameter, exclude the "__v" field from the result
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;