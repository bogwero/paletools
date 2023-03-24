import { isIterable } from "./iterable";

export function* chunks(array, chunkSize) {
    for (let index = 0; index < array.length; index += chunkSize) {
        yield array.slice(index, index + chunkSize);
    }
}

export function range(start, stop, step = 1) {
    return Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
    );
}

export function toArray(enumerable) {
    if (enumerable instanceof Array
        || Array.isArray(enumerable)) return enumerable;

    if (enumerable instanceof EAIterator || isIterable(enumerable)) return Array.prototype.slice.call(enumerable);

    return flattenArray([enumerable]);
}
export function toDictionary(enumerable, keySelector) {
    const dictionary = {};

    for (let item of enumerable) {
        const key = keySelector(item);
        dictionary[key] = item;
    }

    return dictionary;
}

export function flattenArray(arrayOfArrays) {
    return [].concat(...arrayOfArrays);
}

export function groupBy(input, groupFunc, selector) {
    return input.reduce((acc, currentValue) => {
        let groupKey = groupFunc(currentValue);
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(selector(currentValue));
        return acc;
    }, {});
};