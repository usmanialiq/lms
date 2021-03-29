"use strict";

module.exports = (req) => {
    let page = parseInt(req.page),
        size = parseInt(req.size),
        query = {};
    query = req;
    if (page < 0 || page === 0) {
        page = 1;
    }
    if (size === null || size === undefined || size === NaN) {
        query.size = 10;
    }
    else if (size <= 10 && size !== 0) {
        query.size = 10;
    }
    else if (size >= 30) {
        query.size = 30;
    }
    else if (size === 0) {
        query.size = size;
    }
    if(query.size === undefined) {
        query.size = 10;
    }
    query.skip = query.size * (page - 1);
    query.limit = query.size;
    delete query.size;
    if (isNaN(query.skip)) {
        query.skip = 0;
    }
    return query;
};