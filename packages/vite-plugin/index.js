import { injectDebugInfo } from '../common/injectDebugInfo.js';
import { normalizePath, extractFilename } from '../common/utils.js';

export function vitePluginLineCopy(targetTags = ['el-button'], options = {}) {
    return {
        name: 'line-copy-vite-plugin',
        enforce: 'pre',
        transform(code, id) {
            if (!id.endsWith('.vue')) return;
            const normalizedPath = normalizePath(id);
            const filename = extractFilename(normalizedPath);
            const newCode = injectDebugInfo(code, filename, targetTags, options);
            return { code: newCode, map: null };
        },
    };
}