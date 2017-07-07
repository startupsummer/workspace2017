var parse = require('csso').syntax.parse;

function getInfo(postcssNode) {
    return {
        postcssNode: postcssNode
    };
}

function appendChildren(cssoNode, nodes) {
    cssoNode.children.fromArray(nodes.map(postcssToCsso));
    return cssoNode;
}

function parseToCsso(css, config, postcssNode) {
    var cssoNode;

    try {
        cssoNode = parse(css || '', config);
    } catch (e) {
        if (e.name === 'CssSyntaxError') {
            throw postcssNode.error(e.message, { index: e.offset });
        }

        throw e;
    }

    cssoNode.loc = getInfo(postcssNode);

    return cssoNode;
}

function postcssToCsso(node) {
    switch (node.type) {
        case 'root':
            return appendChildren(
                parseToCsso('', { context: 'stylesheet' }, node),
                node.nodes
            );

        case 'rule':
            return {
                type: 'Rule',
                loc: getInfo(node),
                selector: parseToCsso(node.selector, { context: 'selectorList' }, node),
                block: appendChildren(
                    parseToCsso('{}', { context: 'block' }, node),
                    node.nodes
                )
            };

        case 'atrule':
            var cssoNode = {
                type: 'Atrule',
                loc: getInfo(node),
                name: node.name,
                expression: node.params
                    ? parseToCsso(node.params, { context: 'atruleExpression', atrule: node.name }, node)
                    : null,
                block: null
            };

            if (node.nodes) {
                cssoNode.block = appendChildren(
                    parseToCsso('{}', { context: 'block' }, node),
                    node.nodes
                );
            }

            return cssoNode;

        case 'decl':
            return parseToCsso(
                (node.raws.before || '').trimLeft() + node.toString(),
                { context: 'declaration' },
                node
            );

        case 'comment':
            return {
                type: 'Comment',
                loc: getInfo(node),
                value: node.raws.left + node.text + node.raws.right
            };
    }
}

module.exports = postcssToCsso;
