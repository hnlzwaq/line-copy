const { injectDebugInfoToVueCode } = require('../common/injectDebugInfo');
const { normalizePath, extractFilename } = require('../common/utils');

module.exports = function (source) {
    const filename = extractFilename(normalizePath(this.resourcePath));
    const result = injectDebugInfoToVueCode(source, filename, ['el-button']);
    return result;
};