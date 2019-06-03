class ExpectedToken {
    constructor(type, val, got) {
        this.type = type;
        this.val = val;
        this.got = got;
        this.toString = function() {
            return "Expected token of type " + type + " and value \"" + val + "\" but got " + got;
        }
    }
}

module.exports.ExpectedToken = ExpectedToken;
