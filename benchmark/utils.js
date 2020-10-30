const { readFileSync } = require('fs');

module.exports = {
    getData: () => {
        return JSON.parse(readFileSync('benchmark/data.json').toString('utf-8'));
    },
};
