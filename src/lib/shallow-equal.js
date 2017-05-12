/**
 * This module is a modified copy from react-redux (MIT).
 */

const hasOwn = Object.prototype.hasOwnProperty;

const is = (x, y) => {
    if (x === y) {
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
        /* eslint-disable no-self-compare */
        return x !== x && y !== y;
        /* eslint-enable no-self-compare */
    }
};

const shallowEqual = (objA, objB) => {
    if (is(objA, objB)) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (let i = 0; i < keysA.length; i++) {
        if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }

    return true;
};

export default shallowEqual;