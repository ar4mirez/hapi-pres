'use strict';

exports.preB = {
    assign: 'preB',
    method: (request, reply) => {

        return reply(request.payload);
    }
};

exports.preD = {
    assign: 'preD',
    method: (request, reply) => {

        return reply(request.payload);
    }
};
