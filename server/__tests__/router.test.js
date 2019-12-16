const { expect } = require('chai');
const router = require('../router');
const { signin, signup, verify } = require('../controllers/auth');

describe('router', function() {
    it('map correct routes', function() {
        const app = {
            routes: {},
            post: function(route, handler) {
                this.routes[route] = handler
            }
        };
        router(app);
        expect(app.routes['/api/signup']).to.equal(signup);
        expect(app.routes['/api/signin']).to.equal(signin);
        expect(app.routes['/api/verify']).to.equal(verify);
    });
});