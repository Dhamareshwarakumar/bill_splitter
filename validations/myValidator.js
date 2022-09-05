exports.isEmpty = value => value === undefined || value === null || typeof value === 'object' && Object.keys(value).length === 0 || typeof value === 'string' && value.trim().length === 0;

// TODO: Test This once
exports.trimmer = data => {
    if (typeof data === 'object') {
        for (let key in data) {
            if (typeof data[key] === 'string') {
                data[key] = data[key].trim();
            }
        }
    } else if (typeof data === 'string') {
        data = data.trim();
    }

    return data;
}