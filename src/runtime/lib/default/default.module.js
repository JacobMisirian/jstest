const HassiumModule = require('../hassiumModule');
const hassiumNull = require('../types/hassiumNull');
const lib = require('../lib');

class DefaultModule extends HassiumModule {
    constructor() {
        super('_default');
        this.set_attrib('debug', new lib.HassiumInvokable(this, 'debug'));
        this.set_attrib('false', new lib.types.HassiumNumber(0));
        this.set_attrib('null', hassiumNull);
        this.set_attrib('println', new lib.HassiumInvokable(this, 'default_println'));
        this.set_attrib('true', new lib.types.HassiumNumber(1));
    }

    default_println(vm, mod, args) {
        args.forEach(x => console.log(x.toString_(vm, mod, {}).val));
    }

    debug(vm, mod, args) {
        console.log(require('util').inspect(vm._stack_frame._frames, { depth: null }));
    }
};

module.exports = new DefaultModule();
