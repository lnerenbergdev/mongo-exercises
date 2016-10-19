module.exports = function(mongoose, Checkout, Movie) {
	//What is the title of the movie(s) that was the most checked out?

	// Get total occurences of movie id as checkouts then sort by number of occerences
	Checkout.aggregate(
		[
			{ $group: { 
				_id: '$movieId', 
				checkouts: { $sum: 1} 
			}},
			{ "$sort": {
				"checkouts": -1
			}},
		],
		function(err, res){
			// Error handling
			if(err) return console.log(err);
			// find the most checked out title at the first value of the respose
			Movie.findOne({_id:res[0]._id}, function(err, movie) {
				if (err) return err;
				// Log the most checked out movie
				console.log("Most checked out: " + movie.title);
			});
		}
	);
};
