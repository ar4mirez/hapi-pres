'use strict';

exports.preA = {
    assign: 'preA',
    method: (request, reply) => {

        return reply(request.payload);
    }
};

exports.preC = {
    assign: 'preC',
    method: (request, reply) => {

        return reply(request.payload);
    }
};
