export function removeFromArray (array: any[], item: any) {
    const index = array.indexOf(item);
    if (index > -1)
        array.splice(index, 1)
}

