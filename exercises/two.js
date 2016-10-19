module.exports = function(mongoose, Checkout, Movie) {
	// Which users checked out any of the Lord of the Rings trilogy?

	// Find titles using regex matching The Lord of the Rings 
	Movie.find({title: new RegExp('^The Lord of the Rings')}, function(err, movies) {

		// Initialize array to store lord of the rings title ids
		var lorIds = [];

		// Loop through movies collection
		for(var movie of movies){
			lorIds.push(movie._id);
		}

		// Find users who have checked out any of the lord of the rings titles
		Checkout.find({movieId: { $in: lorIds }}, 'userId', function(err, checkouts){
			// Initialize array to store ids of those who have checked out a lor title
			var lordies = [];
			// loop index key through checkouts collection 
			for(var key in checkouts){
				// By default, we add this lord id...
				var addLordy = true;
				for(var lordy of lordies){
					if(lordy === checkouts[key].userId){
						// Unless the id already exist in the aray... (could be done beter with find method)
						addLordy = false;
					}
				}
				// If we should stil ad this lordy id
				if(addLordy){
					// add the id to lordies array
					lordies.push(checkouts[key].userId);
				}
			}
			// Log the array of user ids that have view an lotr film
			console.log("Users that watched atleast on LOTR film: " + lordies);
		});
	});
};
