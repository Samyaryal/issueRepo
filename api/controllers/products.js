const mongoose = require('mongoose');
const Product = require('../models/product')
const checkAuth = require ('../middleware/check-auth')


exports.products_get_all = (req, res, next) => {
	Product.find()
		.select('name price _id productImage') // it will only fetch these fields
		.exec()
		// below here we are modifying the response we get out.. adding count
		.then(docs => {
			const response = {
				Products: docs.map(doc => {
					return {
						_id: doc._id,
						name: doc.name,
						price: doc.price,
						productImage: doc.productImage,

						// request: {
						// 	type: 'GET',
						// 	url: 'http://localhost:3000/products/' + doc._id,
						// },
					};
				}),
			};
			// id (docs.lenght >= 0)
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};


// POST 
// in the post we have to use the schema, instiantiate the new one

exports.products_post =  (req, res, next) => {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		describe:req.body.describe,
		productImage: req.file.path,
	});
	product
		.save()
		.then(result => {
			console.log("result from post in product", result );

			res.status(201).json({
				message: 'Created product successfully',
				createdProduct: {
					_id: result._id,
					name: result.name,
					price: result.price,
					describe:result.describe,
					productImage: req.file.path,
					
					request: {
						type: 'GET',
						url: 'http://localhost:3000/products/' + result._id,
					},
				},
			});
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
};


exports.products_get_single= ( req, res, next) => {
	const id = req.params.productId // extract the ID
	Product.findById(id)
		.select('name price_id productImage')
		.exec()
		.then(doc => {
			console.log('from database', doc);

			//sometimes tehere wil be also good object but not from our database so we need to do the following
			if (doc) {
				res.status(200).json({
					product: doc,
					request: {
						type: 'GET',
						description: 'Get all products',
						url: ' http://localhost:3000/products',
					},
				});
			} else {
				res.status(404).json({ message: 'No valid entry found for the provided id' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};


exports.products_update = (req, res, next) => {
	const id = req.params.productId;
	const updateOps = {};

	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Product.update({ _id: id }, { $set: updateOps })
		.exec()
		.then(result => {
			res.send(200).json({
				message: 'Product updated',
				request: {
					type: 'GET',
					url: 'http://localhost:3000/products/' + id,
				},
			});
		})
		.catch(err => {
			console.log(err);
			res.send(500).json({ error: err });
		});
};



exports.products_delete = (req, res, next) => {
	const id = req.params.productId;
	Product.remove({ _id:id })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Product deleted',
				request:{
					type:"POST",
					url: 'http://localhost:3000/products',
					body: { name: 'String', price: 'Number' },
				}
			});
		})

		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};
