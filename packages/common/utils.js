export function normalizePath(filepath) {
    return filepath.replace(/\\\\/g, '/');
}

export function extractFilename(path) {
    const parts = path.split('/');
    return parts.slice(-2).join('/');
}