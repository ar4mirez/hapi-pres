'use strict';

const Joi = require('joi');

const Pkg = require('../package.json');

const schema = Joi.object({
    cwd: Joi.string().default(process.cwd()),
    dirname: Joi.string().default('/pre'),
    filter: Joi.alternatives(Joi.string(), Joi.object()).default(/^(.+)\.js$/),
    excludeDirs: Joi.alternatives(Joi.string(), Joi.object()).default(/^\.(git|svn)$/),
    recursive: Joi.boolean().default(true),
    prefix: Joi.string().default('pre')
});

exports.plugin = {
    pkg: Pkg,
    register: async (server, options) => {

        const { error, value } = schema.validate(options, { allowUnknown: false });

        if (error) {
            throw error;
        }

        const pres = require('require-all')({
            dirname: value.cwd + value.dirname,
            filter: value.filter,
            excludeDirs: value.excludeDirs,
            recursive: value.recursive
        });

        server.decorate('server', value.prefix, pres);
        server.log(['plugin', 'info', Pkg.name], 'pre-requirements loaded.');
    }
};
