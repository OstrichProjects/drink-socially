'use strict';

// Games routes use games controller
var games = require('../controllers/games');
var authorization = require('./middlewares/authorization');

// Game authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.game.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/games', games.all);
    app.post('/games', authorization.requiresLogin, games.create);
    app.get('/games/:gameId', games.show);
    app.put('/games/:gameId', authorization.requiresLogin, hasAuthorization, games.update);
    app.del('/games/:gameId', authorization.requiresLogin, hasAuthorization, games.destroy);

    // Finish with setting up the gameId param
    app.param('gameId', games.game);

};