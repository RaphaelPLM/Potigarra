const express = require('express');

const MembersController = require('./controllers/member_controller');
const AuthController = require('./controllers/auth_controller');
const CardsController = require('./controllers/card_controller');

const AuthMiddleware = require('./middlewares/auth_middleware');

const MemberValidator = require('./validators/member_validator');

const routes = express.Router();


// Member routes
routes.get('/api/members', AuthMiddleware.verifyToken, MembersController.index);
routes.post('api//register', MemberValidator.validateCreate, MembersController.create);

// Auth routes
routes.post('/api/login', AuthController.login);
routes.get('/api/verifyToken', AuthMiddleware.verifyToken, (request, response) => {
	return response.status(200).json({ message: 'The token is valid.' });
});

//Card routes
routes.get('/api/cards', AuthMiddleware.verifyToken, CardsController.index);

routes.put('/api/cards/generate', AuthMiddleware.verifyToken, CardsController.generatePass)

module.exports = routes;