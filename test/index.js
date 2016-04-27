'use strict';

const Lab = require('lab');
const Code = require('code');
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;
const Hapi = require('hapi');

const internals = {
    info: require('../package')
};

describe(internals.info.name + ' plugin registration.', () => {

    it('registers successfully', (done) => {

        const server = new Hapi.Server();
        server.register({
            register: require('../'),
            options: { dirname: '/test/pre' }
        }, (err) => {

            expect(err).to.not.exist();
            done();
        });
    });

    it('returns an error on invalid dirname option', (done) => {

        const server = new Hapi.Server();
        server.connection();

        return server.register({
            register: require('../'),
            options: { dirname: 'test/invalid' }
        }, (err) => {

            expect(err).to.exist();
            expect(err.message).to.include('ENOENT');

            return done();
        });
    });

    it('returns error if invalid options.', (done) => {

        const server = new Hapi.Server();
        server.connection();

        return server.register({
            register: require('../'),
            options: { badkey: 'test/invalid' }
        }, (err) => {

            expect(err).to.exist();
            expect(err).to.be.an.instanceof(Error);

            return done();
        });
    });

    it('pre requirements are loaded.', (done) => {

        const server = new Hapi.Server();
        server.connection();

        return server.register({
            register: require('../'),
            options: { dirname: '/test/pre' }
        }, (err) => {

            expect(err).to.not.exists();
            expect(server.pre).to.exists();
            expect(server.pre).to.be.an.object();
            expect(server.pre.pre1.preA).to.exists();
            expect(server.pre.pre1.preA).to.be.an.object();
            expect(server.pre.pre2.preB).to.exists();
            expect(server.pre.pre2.preB).to.be.an.object();

            return done();
        });
    });
});
