export function removeFromArray (array: any[], item: any) {
    const index = array.indexOf(item);
    if (index > -1)
        array.splice(index, 1)
}

export function getCookie(name) {
    let end;
    const dc = document.cookie;
    const prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        let end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }

    return decodeURI(dc.substring(begin + prefix.length, end));
}