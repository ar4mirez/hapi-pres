'use strict';

const Hoek = require('hoek');
const Joi = require('joi');

const defaults = {
    options: Joi.object().keys({
        cwd: Joi.string().default(process.cwd()),
        dirname: Joi.string().default('/pre'),
        filter: Joi.string().default(/\.js$/),
        excludeDirs: Joi.string().default(/^\.(git|svn)$/),
        recursive: Joi.boolean().default(true),
        prefix: Joi.string().default('pre')
    }),
    info: ['plugin', 'info', require('../package.json').name],
    error: ['plugin', 'error', require('../package.json').name]
};

exports.register = (server, options, next) => {

    Joi.validate(options, defaults.options, (err, value) => {

        if (err) {
            return next(err);
        }

        const opts = Hoek.applyToDefaults(value, options);

        try {
            const pres = require('require-all')(opts.cwd + opts.dirname);
            server.decorate('server', opts.prefix, pres);
            server.log(defaults.info, 'pre-requirements loaded.');

            return next();
        }
        catch (e) {

            return next(e);
        };
    });
};


exports.register.attributes = {
    pkg: require('../package.json')
};
