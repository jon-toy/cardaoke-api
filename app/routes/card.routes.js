module.exports = (app) => {
    const card = require('../controllers/card.controller');

    // Create a new Card
    app.post('/api/v1/card', card.create);

    // Retrieve all Cards
    app.get('/api/v1/card', card.findAll);

    // Retrieve a single Card with cardId
    app.get('/api/v1/card/:cardId', card.findOne);

    // Update an Card with cardId
    app.put('/api/v1/card/:cardId', card.update);

    // Delete an Card with cardId
    app.delete('/api/v1/card/:cardId', card.delete);
}