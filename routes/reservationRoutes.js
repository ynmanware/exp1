var express = require('express');

var routes = function (Reservation, Parking) {

	var reservationRouter = express.Router();

	reservationRouter.route('/reservations')
	.get(function (req, res) {
		console.log("Reservations ..............");
		var query = req.query;
		Reservation.find(query, function (err, reservations) {
			if (err) {
				console.log(err);
			} else {
				res.json(reservations)
			}
		})
	})
	.post(function (req, res) {
		var reservation = new Reservation(req.body);
		console.log(reservation);

		reservation.save();

		var spotId = reservation.spotId;
		var statusd = reservation.status;

		Parking.find({}, function (err, parkings) {
			if (err) {
				console.log(err);
			} else {
				for (var i = 0; i < parkings.length; i++) {
					var spaces = parkings[i].spaces;
					for (var j = 0; j < spaces.length; j++) {
						var slots = spaces[j].slots;
						for (var k = 0; k < slots.length; k++) {
							if (spotId == slots[k].id) {
								slots[k].status = statusd;
								parkings[i].save(function (err) {
									if (err) {
										res.status(500).send(err);
									}
									 else {
									 	console.log("updated successfully");
									 }
								});
								break;
							}
						}
					}
				}
			}
		});

		res.send(reservation);
	})

	reservationRouter.use('/reservations/:reservationId', function (req, res, next) {
		Reservation.findById(req.params.reservationId, function (err, reservation) {
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
	.get(function (req, res) {
		res.json(req.reservation);
	})
	.put(function (req, res) {
		//req.reservation.parkingUid = req.body.parkingUid;


		req.reservation.save(function (err) {
			if (err) {
				res.status(500).send(err);
			}
		});
		res.json(req.reservation);
	})
	.patch(function (req, res) {
		if (req.body._id) {
			delete req.body._id;
		}
		//we shiuld have know variable in request to avoid unwwanted values
		for (var p in req.body) {
			req.reservation[p] = req.body[p];
		}

		req.reservation.save(function (err) {
			if (err) {
				res.status(500).send(err);
			}
		});

		res.json(req.reservation);
	})
	.delete(function (req, res) {
		Parking.find({}, function (err, parkings) {
			if (err) {
				console.log(err);
			} else {
				for (var i = 0; i < parkings.length; i++) {
					var spaces = parkings[i].spaces;
					for (var j = 0; j < spaces.length; j++) {
						var slots = spaces[j].slots;
						for (var k = 0; k < slots.length; k++) {
							if (spotId == slots[k].id) {
								slots[k].status = "available";
								parkings[i].save(function (err) {
									if (err) {
										console.log("error while updating parking");
									}
									 else {
									 	console.log("updated successfully");
									 }
								});
								break;
							}
						}
					}
				}
			}
		});

		req.reservation.remove(function (err) {
			if (err)
				res.status(500).send(err);
			else{
				
		var spotId = req.reservation.spotId;

			res.status(204).send("Delete Succeeded");
			}
		});
	});

	reservationRouter.route('/update').post(function (req, res) {
		//find specific reservations
		var result = null;
		var statusd = null;
		var spotId = null;
		spotId = req.body['spotId'];
		statusd = req.body['status'];

		Reservation.find(null, function (err, reservations) {
			for (var i = 0; i < reservations.length; i++) {
				var resr = reservations[i];
				if (resr.spotId == spotId) {
					result = resr;
					console.log("match found");
					resr.status = statusd;
					resr.save(function (err) {
						if (err) {
							res.status(500).send(err);
						}
					});
					break;
				}
			}
		});

		Parking.find({}, function (err, parkings) {
			if (err) {
				console.log(err);
			} else {
				for (var i = 0; i < parkings.length; i++) {
					var spaces = parkings[i].spaces;
					for (var j = 0; j < spaces.length; j++) {
						var slots = spaces[j].slots;
						for (var k = 0; k < slots.length; k++) {
							if (spotId == slots[k].id) {
								slots[k].status = statusd;
								parkings[i].save(function (err) {
									if (err) {
										res.status(500).send(err);
									}
									 else {
									 	console.log("updated successfully");
									 }
								});
								break;
							}
						}
					}
				}
			}
		});

		res.json(result);
	});

	reservationRouter.route('/spot/:spotId').get(function (req, res) {

		var spotId = req.params.spotId
			var result = null; //{"status" : "OK"};


		var statusd = null;

		Reservation.find(null, function (err, reservations) {

			for (var i = 0; i < reservations.length; i++) {
				var resr = reservations[i];
				console.log("resr.spotid : " + resr.spotId);
				console.log("resr : " + spotId);
				if (resr.spotId == spotId) {
					result = resr;
					statusd = resr.status;

					res.json(statusd);
					break;
				}
			}
		})

		//			res.json(result);
	});


        //delete all 
		reservationRouter.route('/reservation-del').post(function(req, res) {
			Reservation.remove({}, function(err){
				if (err) {
                console.log(err)
            	} else {
                	res.send('success');
            	}	
			});
		});

	return reservationRouter;
}

module.exports = routes;