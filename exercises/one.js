module.exports = function(mongoose, Checkout, Movie) {
	// What user(s) had the most checkouts?
	
	// Use aggregate to sort userIDs by number of occurences
	Checkout.aggregate(
		[
			// Set number of checkouts to sum of user occurences in checkout
			{ $group: { 
				_id: '$userId', 
				checkouts: { $sum: 1} 
			}},
			// Sort by number of checkouts
			{ "$sort": {
				"checkouts": -1
			}},
		],
		function(err, res){
			// Error handling 
			if(err) return console.log(err);
			// Log the first (most occured) userid 
			console.log("UserId with most checkouts: " + res[0]._id);
		}
	);
};
