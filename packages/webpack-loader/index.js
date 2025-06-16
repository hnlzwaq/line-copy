const { injectDebugInfo } = require('../common/injectDebugInfo');
const { normalizePath, extractFilename } = require('../common/utils');

module.exports = function (source) {
    const filename = extractFilename(normalizePath(this.resourcePath));
    const result = injectDebugInfo(source, filename, ['el-button']);
    return result;
};