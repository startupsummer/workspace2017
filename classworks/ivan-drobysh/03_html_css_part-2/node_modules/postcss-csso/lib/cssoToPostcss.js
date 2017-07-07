var postcss = require('postcss');
var translate = require('csso').syntax.translate;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var DEFAULT_RAWS = {
    before: '',
    after: '',
    between: '',
    semicolon: false,
    left: '',
    right: ''
};
var ROOT_RAWS = {
    semicolon: true
};
var DECL_RAWS = {
    before: '',
    after: '',
    between: ':',
    important: '!important'
};

function clone(source) {
    var result = Object.create(Object.getPrototypeOf(source));

    for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
            result[key] = source[key];
        }
    }

    return result;
}

function listToPostcss(list, used) {
    var result = [];
    var before = '';

    list.each(function(node) {
        if (node.type === 'Raw' || node.type === 'Space') {
            // attach raw and spaces to next node
            before += node.value;
        } else {
            var postcssNode = cssoToPostcss(node, used);

            if (before !== '') {
                postcssNode.raws = clone(postcssNode.raws);
                postcssNode.raws.before = before;
                before = '';
            }

            result.push(postcssNode);
        }
    });

    return result;
}

function cssoToPostcss(node, used) {
    var postcssNode = node.loc ? node.loc.postcssNode : null;

    if (postcssNode) {
        // used is null when WeakSet is not supported
        if (used === null || used.has(postcssNode)) {
            // make node clone if it's already used in resulting tree
            postcssNode = clone(postcssNode);
        } else {
            used.add(postcssNode);
        }
    }

    switch (node.type) {
        case 'StyleSheet':
            if (!postcssNode) {
                postcssNode = postcss.root();
            }

            postcssNode.raws = ROOT_RAWS;
            postcssNode.nodes = listToPostcss(node.children, used);

            break;

        case 'Atrule':
            if (!postcssNode) {
                postcssNode = postcss.atRule();
            }

            postcssNode.raws = DEFAULT_RAWS;
            postcssNode.name = node.name;
            postcssNode.params = node.expression ? translate(node.expression) : '';
            postcssNode.nodes = node.block ? listToPostcss(node.block.children, used) : undefined;

            break;

        case 'Rule':
            if (!postcssNode) {
                postcssNode = postcss.rule();
            }

            postcssNode.raws = DEFAULT_RAWS;
            postcssNode.selector = translate(node.selector);
            postcssNode.nodes = listToPostcss(node.block.children, used);

            break;

        case 'Declaration':
            if (!postcssNode) {
                postcssNode = postcss.decl();
            }

            if (typeof node.important === 'string') {
                postcssNode.raws = clone(DECL_RAWS);
                postcssNode.raws.important = '!' + node.important;
            } else {
                postcssNode.raws = DECL_RAWS;
            }

            postcssNode.prop = node.property;
            postcssNode.value = translate(node.value);
            postcssNode.important = Boolean(node.important);

            break;

        case 'Comment':
            if (!postcssNode) {
                postcssNode = postcss.comment();
            }

            postcssNode.raws = DEFAULT_RAWS;
            postcssNode.text = node.value;

            break;
    }

    return postcssNode;
};

module.exports = function(node) {
    var result;
    var used = null;

    // node.js 0.10 doesn't support for WeakSet -> always clone nodes
    if (typeof WeakSet === 'function') {
        // use weak set to avoid using the same original postcss node twice
        // in resulting tree, since nodes are changing on tree building
        used = new WeakSet();
    }

    result = cssoToPostcss(node, used);

    return result;
};
