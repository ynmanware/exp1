var express = require('express');

var routes = function(Reservation, Parking) {

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
		})

	reservationRouter.use('/reservations/:reservationId', function(req, res, next) {
		Reservation.findById(req.params.reservationId, function(err, reservation) {
			if (err) {
				console.log(err);
			} else if (reservation) {
				req.reservation = reservation;
				next();
			} else {
				res.status(404).send('no reservation found');
			}
		})
	})

reservationRouter.route('/reservations/:reservationId')
		.get(function(req, res) {
			res.json(req.reservation);
		})
		.put(function(req, res) {
			//req.reservation.parkingUid = req.body.parkingUid;
			

			req.reservation.save(function(err) {
				if (err) {
					res.status(500).send(err);
				}
			});
			res.json(req.reservation);
		})
		.patch(function(req, res) {
			if (req.body._id) {
				delete req.body._id;
			}
			//we shiuld have know variable in request to avoid unwwanted values
			for (var p in req.body) {
				req.reservation[p] = req.body[p];
			}

			req.reservation.save(function(err) {
				if (err) {
					res.status(500).send(err);
				}
			});

			res.json(req.reservation);
		})
		.delete(function(req, res) {
			req.reservation.remove(function(err) {
				if (err)
					res.status(500).send(err);
				else
					res.status(204).send("Delete Succeeded");
			});
		});


	reservationRouter.route('/update').post(function(req, res) {
			//find specific reservations
			var result = null;

			Reservation.find(null, function(err, reservations) {
				var spotId = req.body['spotId'];
				var status = req.body['status'];
				for (var i=0; i < reservations.length; i++) {
					var resr = reservations[i];
					if(resr.spotId == spotId){
						result = resr;
						console.log("mathc found");
						resr.status = status;
						resr.save(function (err) {
							if (err) {
								res.status(500).send(err);
							}
						});
						break;
					}	
				}	
			})
			res.json(result);
		});

	reservationRouter.route('/spot/:spotId').get(function(req, res) {
			
			var spotId = req.params.spotId
			var result = {"status" : "OK"};

			Parking.find(null, function(err, parkings) {
				for (var i=0; i < parkings.length; i++) {
					var resr = parkings[i];
					console.log(resr);
				}	
			})
			res.json(result);
		});

	return reservationRouter;
}

module.exports = routes;