const { HassiumObject } = require('../hassiumObject');
const lib = require('../lib');

module.exports = class HassiumNumber extends HassiumObject {
    constructor(val) {
        super();
        this.val = val;

        this.set_attrib('_add', new lib.HassiumInvokable(this, 'number_add'));
        this.set_attrib('_divide', new lib.HassiumInvokable(this, 'number_divide'));
        this.set_attrib('_equal', new lib.HassiumInvokable(this, 'number_equal'));
        this.set_attrib('_greater', new lib.HassiumInvokable(this, 'number_greater'));
        this.set_attrib('_greater_or_equal', new lib.HassiumInvokable(this, 'number_greater_or_equal'));
        this.set_attrib('_lesser', new lib.HassiumInvokable(this, 'number_lesser'));
        this.set_attrib('_lesser_or_equal', new lib.HassiumInvokable(this, 'number_lesser_or_equal'));
        this.set_attrib('_logical_and', new lib.HassiumInvokable(this, 'number_logical_and'));
        this.set_attrib('_logical_or', new lib.HassiumInvokable(this, 'number_logical_or'));
        this.set_attrib('_modulus', new lib.HassiumInvokable(this, 'number_modulus'));
        this.set_attrib('_multiply', new lib.HassiumInvokable(this, 'number_multiply'));
        this.set_attrib('_subtract', new lib.HassiumInvokable(this, 'number_subtract'));
        this.set_attrib('toString', new lib.HassiumInvokable(this, 'number_toString'));
    }

    number_add(vm, mod, args) {
        return new HassiumNumber(this.val + args[0].val);
    }

    number_divide(vm, mod, args) {
        return new HassiumNumber(this.val / args[0].val);
    }

    number_equal(vm, mod, args) {
        return new HassiumNumber(this.val === args[0].val ? 1 : 0);
    }

    number_greater(vm, mod, args) {
        return new HassiumNumber(this.val > args[0].val ? 1 : 0);
    }

    number_greater_or_equal(vm, mod, args) {
        return new HassiumNumber(this.val >= args[0].val ? 1 : 0);
    }

    number_lesser(vm, mod, args) {
        return new HassiumNumber(this.val < args[0].val ? 1 : 0);
    }

    number_lesser_or_equal(vm, mod, args) {
        return new HassiumNumber(this.val <= args[0].val ? 1 : 0);
    }

    number_logical_and(vm, mod, args) {
        return new HassiumNumber(this.val != 0 && args[0].val != 0 ? 1 : 0);
    }

    number_logical_or(vm, mod, args) {
        return new HassiumNumber(this.val != 0 || args[0].val != 0 ? 1 : 0);
    }

    number_modulus(vm, mod, args) {
        return new HassiumNumber(this.val % args[0].val);
    }

    number_multiply(vm, mod, args) {
        return new HassiumNumber(this.val * args[0].val);
    }

    number_subtract(vm, mod, args) {
        return new HassiumNumber(this.val - args[0].val);
    }

    number_toString(vm, mod, args) {
        return new lib.types.HassiumString(this.val.toString());
    }
}