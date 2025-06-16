export default {
    mounted(el) {
        el.addEventListener('mouseover', async (e) => {
            if (!e.ctrlKey) return;
            const filename = el.getAttribute('data-debug-filename');
            const line = el.getAttribute('data-debug-line');
            const tag = el.getAttribute('data-debug-tag');
            if (filename && line) {
                const clip = `${filename}:${line}`;
                try {
                    await navigator.clipboard.writeText(clip);
                    console.log(`Copied: ${tag} -> ${clip}`);
                } catch (err) {
                    console.error('Copy failed:', err);
                }
            }
        });
    }
};