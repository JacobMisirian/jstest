const { HassiumObject } = require('../hassiumObject');

module.exports = class HassiumString extends HassiumObject {
    constructor(val) {
        super();
        this.val = val;
    }
}
