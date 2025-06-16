export function mountDebugInfo(el) {
    let timeoutId;
    let tooltip = window.tooltip;
    let tooltipLabel = window.tooltipLabel;
    let tooltipValue = window.tooltipValue;

    if (!window.tooltip) {
        window.tooltip = document.createElement('div');
        window.tooltipLabel = document.createElement('div');
        window.tooltipValue = document.createElement('div');
        window.tooltip.appendChild(window.tooltipLabel);
        window.tooltip.appendChild(window.tooltipValue);
        document.body.appendChild(window.tooltip);

        tooltip = window.tooltip;
        tooltipLabel = window.tooltipLabel;
        tooltipValue = window.tooltipValue;

        {
            tooltip.style.position = 'fixed';
            tooltip.style.padding = '10px 20px';
            tooltip.style.fontSize = '1.2em';
            tooltip.style.backgroundColor = 'rgba(247,194,255,0.9)'; // 黄色背景，半透明
            tooltip.style.borderRadius = '3px'; // 圆边
            tooltip.style.left = '50%'; // 水平居中
            tooltip.style.transform = 'translateX(-50%)'; // 修正水平居中位置
            tooltip.style.top = '5px'; // 固定在屏幕中上位置
            tooltip.style.color = '#000000';
            tooltip.style.zIndex = '10000';
            tooltip.style.opacity = '0';
            tooltip.style.transition = 'opacity 0.3s ease-in-out';
            tooltip.style.display = 'flex';
            tooltip.style.visibility = 'hidden';

            tooltipLabel.style.padding = '0 5px';

            tooltipValue.style.padding = '0 5px';
        }
    }
    /**
     * 显示复制成功的提示信息
     * @param {string} label - 复制的提示
     * @param {string} value - 复制的内容
     * @param {MouseEvent} e - 鼠标事件对象
     * @param {boolean } select - 是否全选内容
     */
    const showTooltip = (label, value, e, select = false) => {
        // 设置提示框内容
        tooltipLabel.textContent = `${label}`;
        tooltipValue.textContent = `${value}`;
        tooltipValue.contentEditable = 'false';
        if (select) {
            tooltipValue.contentEditable = 'true';
            tooltipValue.focus({preventScroll: true});
            const range = document.createRange();
            const selection = window.getSelection();
            // 设置选中从第 2 个字符开始，到第 6 个字符结束的内容
            range.setStart(tooltipValue.firstChild, 0);
            range.setEnd(tooltipValue.firstChild, value.length);
            // 清除当前选区
            selection.removeAllRanges();
            // 将新的 Range 对象添加到选区中
            selection.addRange(range);

        }
        // 显示提示框
        tooltip.style.visibility = 'visible';
        // 等待一帧，确保样式更新后再改变 opacity
        requestAnimationFrame(() => {
            tooltip.style.opacity = '1';
        });

        // 清除之前的定时器
        clearTimeout(timeoutId);
        // 一段时间后开始隐藏提示框
        timeoutId = setTimeout(() => {
            tooltip.style.opacity = '0';
            // 等待过渡动画完成后隐藏提示框
            setTimeout(() => {
                tooltip.style.visibility = 'hidden';
            }, 300);
        }, select ? 3000 : 1000);
    };

    /**
     * 处理鼠标移入事件
     * @param {MouseEvent} e - 鼠标事件对象
     */
    const handleTooltip = async (e) => {
        // 只有当 Ctrl 键按下时，才执行复制操作
        if (!e.ctrlKey) return;

        // 从元素属性中获取调试文件名和行号
        const filename = el.getAttribute('data-debug-filename');
        const line = el.getAttribute('data-debug-line');
        const tag = el.getAttribute('data-debug-tag');

        // 如果文件名和行号都存在，执行复制到剪贴板
        if (filename && line) {
            // 拼接成 "filename:line" 格式的字符串
            const clipContent = `${filename}:${line}`;
            const text = `${tag} -> ${filename}:${line}`;

            try {
                // 使用 Clipboard API copy
                if (navigator.clipboard) {
                    await navigator.clipboard.writeText(clipContent);
                } else {// 兼容性处理 copy
                    const textarea = document.createElement('textarea');
                    textarea.value = clipContent;
                    textarea.style.position = 'absolute';
                    textarea.style.left = '-9999px';
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                }
                // 从前铁板板获取数据
                if (navigator.clipboard) {
                    const clipboardText = await navigator.clipboard.readText();
                    if (clipboardText === clipContent) {
                        showTooltip(`Copied 已复制: `, ` ${tag} -> ${clipboardText}`, e);
                    } else {
                        showTooltip(`Ctrl + C :`, ` ${clipContent}`, e, true);
                    }
                } else {
                    // 创建一个隐藏的 textarea 元素
                    const textarea = document.createElement('textarea');
                    textarea.style.position = 'absolute';
                    textarea.style.left = '-9999px';
                    document.body.appendChild(textarea);
                    // 聚焦到 textarea 元素
                    textarea.focus();
                    // 执行粘贴命令
                    if (document.execCommand('paste')) {
                        // 获取粘贴的文本
                        const clipboardText = textarea.value;
                        // 移除 textarea 元素
                        document.body.removeChild(textarea);
                        if (clipboardText === clipContent) {
                            showTooltip(`Copied 已复:`, ` ${tag} -> ${clipboardText}`, e);
                        } else {
                            showTooltip(`Ctrl + C :`, ` ${clipContent}`, e, true);
                        }
                    } else {
                        showTooltip(`Ctrl + C :`, ` ${clipContent}`, e, true);
                    }
                }
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }

            // 控制台打印提示信息，方便调试确认复制成功
            console.log(`请手工复制 : ${text}`);
        }
    };

    // 绑定鼠标移入事件监听器
    el.addEventListener('mouseover', handleTooltip);
}