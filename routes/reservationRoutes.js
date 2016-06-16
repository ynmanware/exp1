var express = require('express');

var routes = function(Reservation) {

	var reservationRouter = express.Router();

	reservationRouter.route('/reservations')
		.get(function(req, res) {
					console.log("Reservations ..............");
			var query = req.query;
			Reservation.find(query, function(err, reservations) {
				if (err) {
					console.log(err);
				} else {
					res.json(reservations)
				}
			})
		})
		.post(function(req, res) {
			var reservation = new Reservation(req.body);
			console.log(reservation);	

			reservation.save();

			res.send(reservation);
		});

	return reservationRouter;

}

module.exports = routes;