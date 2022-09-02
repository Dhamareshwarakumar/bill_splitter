exports.isEmpty = value => value === undefined || value === null || typeof value === 'object' && Object.keys(value).length === 0 || typeof value === 'string' && value.trim().length === 0;

exports.trimmer = object => {
    const trimmedObject = {};
    Object.keys(object).forEach(key => {
        trimmedObject[key] = object[key].trim();
    }
    );
    return trimmedObject;
}