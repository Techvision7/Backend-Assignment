module.exports = mongoose => {
	var schema = mongoose.Schema(
		{
			name: String,
			img: String,
			summary:String
		},
		{ timestamps: true}
			);

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Movie = mongoose.model("movie", schema);
  return Movie;
};