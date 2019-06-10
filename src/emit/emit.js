const { HassiumObject, InstType } = require('../runtime/hassiumObject');
const { HassiumString } = require('../runtime/lib/lib');
const { NodeType } = require('./../node');
const SymbolTable = require('./symbolTable');

module.exports = class Emit {
    constructor(ast) {
        this.ast = ast;
        this.label_id = 0;
        this.module = new HassiumObject();
        this.emit_stack = [ this.module ];
        this.table = new SymbolTable();
    }

    accept(node) {
        switch (node.type) {
            case NodeType.ARRAY_DECL:
                return this.accept_array_decl(node);
            case NodeType.ASSIGN:
                return this.accept_assign(node);
            case NodeType.ATTRIB_ACCESS:
                return this.accept_attrib_access(node);
            case NodeType.BIN_OP:
                return this.accept_bin_op(node);
            case NodeType.BLOCK:
                return this.accept_block(node);
            case NodeType.CHAR:
                return this.accept_char(node);
            case NodeType.CLASS:
                return this.accept_class(node);
            case NodeType.EXPR_STMT:
                return this.accept_expr_stmt(node);
            case NodeType.FOR:
                return this.accept_for(node);
            case NodeType.FUNC_CALL:
                return this.accept_func_call(node);
            case NodeType.FUNC_DECL:
                return this.accept_func_decl(node);
            case NodeType.ID:
                return this.accept_id(node);
            case NodeType.IF:
                return this.accept_if(node);
            case NodeType.INT:
                return this.accept_int(node);
            case NodeType.RETURN:
                return this.accept_return(node);
            case NodeType.STRING:
                return this.accept_string(node);
            case NodeType.SUBSCRIPT:
                return this.accept_subscript(node);
            case NodeType.UNARY_OP:
                return this.accept_unary_op(node);
            case NodeType.WHILE:
                return this.accept_while(node);
        }
    }

    accept_array_decl(node) {

    }

    accept_assign(node) {

    }

    accept_attrib_access(node) {
        this.accept(node.children.target);
        this.emit(InstType.LOAD_ATTRIB, { attrib: node.children.attrib }, node.src);
    }

    accept_bin_op(node) {
        this.accept(node.children.right);
        this.accept(node.children.left);
        this.emit(InstType.BIN_OP, { type: node.children.type }, node.src);
    }

    accept_block(node) {
        let self = this;
        node.children.nodes.forEach(function(node) {
            self.accept(node);
        });
    }

    accept_break(node) {

    }

    accept_char(node) {

    }

    accept_class(node) {

    }

    accept_continue(node) {

    }

    accept_expr_stmt(node) {
        this.accept(node.children.expr);
        this.emit(InstType.POP, {}, node.src);
    }

    accept_for(node) {
        let body_label = this.next_label();
        let end_label = this.next_label();

        this.accept(node.children.init_stmt);
        this.emit_label(body_label);
        this.accept(node.children.expr);
        this.emit(InstType.JUMP_IF_FALSE, { label: end_label }, node.src);
        this.accept(node.children.body);
        this.accept(node.children.rep_stmt);
        this.emit(InstType.JUMP, { label: body_label }, node.src);
        this.emit_label(end_label);
    }

    accept_func_call(node) {
        let self = this;
        node.children.args.forEach(function(arg) {
            self.accept(arg);
        });
        this.accept(node.children.target);
        this.emit(InstType.CALL, { arg_count: node.children.args.length }, node.src);
    }

    accept_func_decl(node) {

    }

    accept_id(node) {

    }

    accept_if(node) {
        let else_label = this.next_label();
        let end_label = this.next_label();

        this.accept(node.children.expr);
        this.emit(InstType.JUMP_IF_FALSE, { label: else_label }, node.src);
        this.accept(node.children.body);
        this.emit(InstType.JUMP, { label: end_label }, node.src);
        this.emit_label(else_label);
        if (node.children.else_body) {
            this.accept(node.children.else_body);
        }
        this.emit_label(end_label);
    }

    accept_int(node) {
    }

    accept_return(node) {
        this.accept(node.children.expr);
        this.emit(InstType.RETURN, {}, node.src);
    }

    accept_string(node) {

    }

    accept_subscript(node) {

    }

    accept_unary_op(node) {
        this.accept(node.children.target);
        this.emit(InstType.UNARY_OP, {}, node.src);
    }

    accept_while(node) {
        let body_label = this.next_label();
        let end_label = this.next_label();

        this.emit_label(body_label);
        this.accept(node.children.expr);
        this.emit(InstType.JUMP_IF_FALSE, { label: end_label }, node.src);
        this.accept(node.children.body);
        this.emit(InstType.JUMP, { label: body_label }, node.src);
        this.emit_label(end_label);
    }

    compile() {
        let self = this;
        this.ast.children.nodes.forEach(function(node) {
            self.accept(node);
        });
    }

    emit(type, args, src) {
        this.emit_stack[this.emit_stack.length - 1].emit(type, args, src);
    }

    emit_label(id) {
        this.emit_stack[this.emit_stack.length - 1].emit_label(id);
    }

    next_label() {
        return this.label_id++;
    }
};
