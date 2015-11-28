'use strict';

function transpileNewTarget()
{
    return {
        visitor: {
            MetaProperty(path) {
                if (path.isMetaProperty() && path.node.meta.name == 'new' && path.node.property.name == 'target') {
                    path.replaceWithSourceString('this.constructor');
                }
            }
        }
    };
}

module.exports = transpileNewTarget;
