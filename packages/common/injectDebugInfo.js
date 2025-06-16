export function injectDebugInfoToVueCode(code, filename, tags = ['el-button'], options = {}) {
    const addLineNumber = options.addLineNumber || 0;
    const lines = code.split('\n');
    const tagRegex = new RegExp(`<(${tags.join('|')})(\\s[^>]*?)?(\/?>)(?!\\s*data-debug-filename)`);

    return lines.map((line, index) => {
        const match = tagRegex.exec(line);
        if (!match) return line;
        const tag = match[1];
        const insert = ` data-debug-tag=\"${tag}\" data-debug-filename=\"${filename}\" data-debug-line=\"${index + 1 + addLineNumber}\" v-line-copy `;
        const insertPos = line.indexOf(tag) + tag.length;
        return line.slice(0, insertPos) + insert + line.slice(insertPos);
    }).join('\n');
}