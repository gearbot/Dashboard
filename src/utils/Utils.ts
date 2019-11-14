export function removeFromArray (array: any[], item: any) {
    const index = array.indexOf(item);
    if (index > -1)
        array.splice(index, 1)
}

export function areArraysSame(a: any[] | readonly any[], b:any[] | readonly any[]) {
    if (a.length != b.length)
        return false;

    for (var i = 0, l=a.length; i < l; i++) {
        // Check if we have nested arrays
        if (a[i] instanceof Array && b[i] instanceof Array) {
            // recurse into the nested arrays
            if (!areArraysSame(a[i], b[i]))
                return false;
        }
        else if (a[i] != b[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}