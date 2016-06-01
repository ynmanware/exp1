var express = require('express');

var routes = function(Parking) {

	var parkingRouter = express.Router();

	parkingRouter.use('/parkings/:parkingId', function(req, res, next) {
		Parking.findById(req.params.parkingId, function(err, parking) {
			if (err) {
				console.log(err);
			} else if (parking) {
				req.parking = parking;
				next();
			} else {
				res.status(404).send('no parking found');
			}
		})
	})

	parkingRouter.route('/parkings')
		.get(function(req, res) {
			var query = req.query;
			Parking.find(query, function(err, parkings) {
				if (err) {
					console.log(err);
				} else {
					res.json(parkings)
				}
			})
		})
		.post(function(req, res) {
			var parking = new Parking(req.body);
			console.log(parking);	

			parking.save();

			res.send(parking);
		});

	parkingRouter.route('/parkings/:parkingId')
		.get(function(req, res) {
			res.json(req.parking);
		})
		.put(function(req, res) {
			req.parking.parkingUid = req.body.parkingUid;
			req.parking.owner = req.body.owner;
			req.parking.ratePerHour = req.body.ratePerHour;
			req.parking.address = req.body.address;
			req.parking.allocated = req.body.allocated;

			req.parking.save(function(err) {
				if (err) {
					res.status(500).send(err);
				}
			});
			res.json(req.parking);
		})
		.patch(function(req, res) {
			if (req.body._id) {
				delete req.body._id;
			}
			//we shiuld have know variable in request to avoid unwwanted values
			for (var p in req.body) {
				req.parking[p] = req.body[p];
			}

			req.parking.save(function(err) {
				if (err) {
					res.status(500).send(err);
				}
			});

			res.json(req.parking);
		})
		.delete(function(req, res) {
			req.parking.remove(function(err) {
				if (err)
					res.status(500).send(err);
				else
					res.status(204).send("ok");
			});
		});

	return parkingRouter;

}

module.exports = routes;