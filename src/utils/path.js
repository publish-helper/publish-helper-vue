

export const getObjType = (obj) => {
    let toString = Object.prototype.toString;
    let map = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object"
    };
    if (obj instanceof Element) {
        return "element";
    }
    return map[toString.call(obj)]

};
