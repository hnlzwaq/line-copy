export function injectDebugInfo(code, filename, targetTags = ['el-button'], options = {addLineNumber: 0}) {
    const addLineNumber = options.addLineNumber || 0;
    // 将代码按行切分，方便逐行处理
    const lines = code.split('\n');

    // 构造匹配标签的正则表达式，支持自闭合标签
    const tagRegex = new RegExp(`<(${targetTags.join('|')})(\\s[^>]*?)(\/?>)(?!\\s*data-debug-filename)`);

    // 遍历每一行，查找标签并注入属性
    const newLines = lines.map((line, index) => {
        const match = tagRegex.exec(line);
        if (!match) return line; // 如果不匹配标签，原样返回

        const tag = match[1]; // 标签名，如 el-button
        const attrs = match[2] || ''; // 标签内已有的属性
        const closing = match[3]; // 标签结束部分，可能是 '>' 或 '/>'

        const fullDebugInfo = ` data-debug-tag="${tag}"  data-debug-filename="${filename}" data-debug-line="${index + 1 + addLineNumber}" onmouseover="handleShowDebugInfo" `;
        const insertPos = line.indexOf(tag) + tag.length
        const fullLine = line.substring(0, insertPos) + fullDebugInfo + line.substring(insertPos);

        return fullLine;
    });

    // 返回修改后的代码
    return newLines.join('\n') ;

}