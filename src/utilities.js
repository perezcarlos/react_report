export const encodeObjectToQuery = function (object) {
    var parts = [];
    for (var i in object) {
        if (object.hasOwnProperty(i)) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(object[i]));
        }
    }

    return parts.join("&")
};