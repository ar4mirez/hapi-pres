'use strict';

const Lab = require('@hapi/lab');
const Code = require('@hapi/code');
const Hapi = require('@hapi/hapi');

const { describe, it } = exports.lab = Lab.script();
const { expect } = Code;

const internals = {
    info: require('../package')
};

describe(internals.info.name + ' plugin registration.', () => {

    it('registers successfully', async () => {

        const server = new Hapi.Server();
        await server.register({
            plugin: require('../'),
            options: { dirname: '/test/pre' }
        });
    });

    it('returns an error on invalid dirname option', async () => {

        const server = new Hapi.Server();
        let err;

        try {
            await server.register({
                plugin: require('../'),
                options: { dirname: 'test/invalid' }
            });
        }
        catch (e) {
            err = e;
        }

        expect(err).to.exist();
        expect(err.message).to.include('ENOENT');
    });

    it('returns error if invalid options', async () => {

        const server = new Hapi.Server();
        let err;

        try {
            await server.register({
                plugin: require('../'),
                options: { badkey: 'test/invalid' }
            });
        }
        catch (e) {
            err = e;
        }

        expect(err).to.exist();
        expect(err).to.be.an.instanceof(Error);
    });

    it('pre requirements are loaded', async () => {

        const server = new Hapi.Server();
        await server.register({
            plugin: require('../'),
            options: { dirname: '/test/pre' }
        });

        expect(server.pre).to.exist();
        expect(server.pre).to.be.an.object();
        expect(server.pre.pre1.preA).to.exist();
        expect(server.pre.pre1.preA).to.be.an.object();
        expect(server.pre.pre2.preB).to.exist();
        expect(server.pre.pre2.preB).to.be.an.object();
    });
});
