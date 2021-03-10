const db = require("../models");
const Movie = db.movies;

//create and save a new movie
exports.create = (req, res) => {
	//Validating request
	if (!req.body.name){
		res.status(400).send({ message: "content can not be empty!"});
		return;
	}
	//creting a movie
	const movie = new Movie({
		name: req.body.name,
		img: req.body.img,
		summary: req.body.summary
	});

	//saving movie in the Database
	movie
	.save(movie)
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message: err.message || "some error Occured while creation."
		});
	});

};

// Retrieve all movies from the database.
exports.findAll = (req, res) => {
	const name = req.query.name;
	var condition = name ? {name: {$regex: new RegeExp(name), $options: "i"}} : {};

	Movie.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Movies."
      });
    });
};
  

// Find a single movie with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Movie.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Movie with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Movie with id=" + id });
    });
};

// Update a movie by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Movie with id=${id}. Maybe Movie was not found!`
        });
      } else res.send({ message: "Movie was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Movie with id=" + id
      });
    });
};

// Delete a movie with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Movie.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`
        });
      } else {
        res.send({
          message: "Movie was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Movie with id=" + id
      });
    });
};

// Delete all movies from the database.
exports.deleteAll = (req, res) => {
  Movie.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Movies were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Movies."
      });
    });
};

