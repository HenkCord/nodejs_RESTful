var sQuery = require('../utils/SimpleQuery');

module.exports = {
    findOne: function (where, cb) {
        sQuery(function (query) {
            return query.select().from('clients').where(where).limit(1);
        }, cb).fetchOne();
    },
    removeOne: function (where, cb) {
        sQuery(function (query) {
            return query('clients').del().where(where).limit(1);
        }, cb).result();
    }
};

