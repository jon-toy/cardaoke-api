const Card = require('../models/card.model');

const cardTypes = ["song", "artist", "genre"];

// Create and Save a new Card
exports.create = (req, res) => {

    if (!validateCardType(req.body.type, res)) return;

    // Create an Card
    const card = new Card({
        type: req.body.type,
        description: req.body.description
    });

    // Save Card in the database
    card.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Card."
        });
    });
};

// Retrieve and return all cards from the database.
exports.findAll = (req, res) => {
    Card.find()
    .then(cards => {
        res.send(cards);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Cards."
        });
    });
};

// Find a single Card with a cardId
exports.findOne = (req, res) => {
    Card.findById(req.params.cardId)
    .then(card => {
        if(!card) {
            return res.status(404).send({
                message: "Card not found with id " + req.params.cardId
            });            
        }
        res.send(card);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Card not found with id " + req.params.cardId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Card with id " + req.params.cardId
        });
    });
};

// Update a Card identified by the cardId in the request
exports.update = (req, res) => {

    validateCardType(req.body.type, res);

    // Find Card and update it with the request body
    Card.findByIdAndUpdate(req.params.cardId, {
        type: req.body.type,
        description: req.body.description
    }, {new: true})
    .then(card => {
        if(!card) {
            return res.status(404).send({
                message: "Card not found with id " + req.params.cardId
            });
        }
        res.send(card);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Card not found with id " + req.params.cardId
            });                
        }
        return res.status(500).send({
            message: "Error updating Card with id " + req.params.cardId
        });
    });
};

// Delete a Card with the specified cardId in the request
exports.delete = (req, res) => {
    Card.findByIdAndRemove(req.params.cardId)
    .then(card => {
        if(!card) {
            return res.status(404).send({
                message: "Card not found with id " + req.params.cardId
            });
        }
        res.send({message: "Card deleted successfully!", _id: req.params.cardId});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Card not found with id " + req.params.cardId
            });                
        }
        return res.status(500).send({
            message: "Could not Card with id " + req.params.cardId
        });
    });
};

function validateCardType(type, res) {
    if (!cardTypes.includes(type)) {
        res.status(400).send({
            message: "Invalid card type. Valid types are " + cardTypes.toString()
        });

        return false;
    }

    return true;
}