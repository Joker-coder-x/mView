/**
 * @description 什么事情都不做
 */
export function noop() {}

/**
 * @todo 生成完善的类型检测函数
 * @param {String} type 需要生成检测函数的类型
 *        可选值 string|number|null|undefined|object|array|function|symbol|date|regexp
 * @returns {undefined|Function}
 */
export function isType(type) {
  type = type.trim();
  //强制首字母大写
  if (type.length > 0) {
    type = type.toLowerCase();
    //正则表达式需要两个字母大写 RegExp 比较特殊
    if (type === "regexp") {
      type = "RegExp";
    } else {
      type = type
        .split("")
        .map((c, index) => (index == 0 ? c.toUpperCase() : c))
        .join("");
    }
  } else {
    return;
  }
  const cache = isType.cache ? isType.cache : (isType.cache = {});
  //走缓存
  if (cache[type]) {
    return cache[type];
  }
  //用函数表达式 而不是函数声明 防止变量提升
  const handler = function(obj) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  };
  //第一次进行缓存
  cache[type] = handler;
  return handler;
}

//生成一些常用的检测类型
export const isString = isType("string");
export const isArray = isType("Array");
export const isDate = isType("date");
export const isReg = isType("RegExp");
export const isNull = isType("null");
export const isFunction = isType("function");
export const isUndefined = isType("undefined");
export const isPlainObject = isType("object");
export const isSymbol = isType("symbol");
export const isNumber = isType("number");

/**
 * @todo 一个对象是否被定义
 * @param {any} v
 * @returns {Boolean}
 */
export function isDef(v) {
  return v !== undefined && v !== null;
}

/**
 * @todo 判断某个对象是否为一个Promise或者thenable对象
 * @param {any} val
 * @returns
 */
export function isPromise(val) {
  return (
    isDef(val) &&
    typeof val.then === "function" &&
    typeof val.catch === "function"
  );
}

/**
 * @todo 判断obj是否是一个对象类型 检测粒度较大 Array等都会符合条件
 * @param {*} obj
 * @return {Boolean}
 * */
export function isObject(obj) {
  return obj !== null && typeof obj === "object";
}

/**
 * @todo 生成唯一标识
 * @returns {String}
 */
export function genrateUiniqueId() {
  let s = [];
  let hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  let uuid = s.join("");
  return uuid;
}

/**
 * @todo 删除对象属性
 * @return {Boolean}
 * */
export function deleteProp(obj, prop) {
  return Reflect.deleteProperty(obj, prop);
}

/**
 * @todo   获取obj对象自身的全部属性 不包含symbol
 * @param  {Object} obj
 * @return {Array}
 * */
export function ownKeys(obj) {
  return Object.keys(obj);
}

/**
 * @todo   判断某个自身是否具有某个属性
 * @param  {Object} obj
 * @return {Array}
 * */
export function hasOwn(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * @todo 防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(func, wait, immediate) {
  let timeout;

  return function() {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
  };
}

/**
 * @description 合并对象,如果产生属性冲突才优先采用dest目标上的属性
 * @param {Objject} src  源对象 只能是一个存粹的对象
 * @param {Object} dest  目标对象 只能是一个存粹的对象
 * @param {Array}  exculde 哪些属性不优先采用dest对象上的
 * @returns {Object}
 */
export function mergeOptions(src, dest, exculde = []) {
  if (!isPlainObject(src) || !isPlainObject(dest)) {
    return;
  }
  if (!isArray(exculde)) {
    throw new TypeError("第三个参数必须是个Array类型");
  }

  const obj = {};

  for (const key in src) {
    if (Object.hasOwnProperty.call(src, key)) {
      obj[key] = src[key];
    }
  }
  for (const key in dest) {
    if (Object.hasOwnProperty.call(dest, key)) {
      if (exculde.indexOf(key) === -1) {
        obj[key] = dest[key];
      }
    }
  }

  return obj;
}

/**
 * @todo 将css的属性值，转变为rgb格式的对像
 * @param {*} color
 * @param {*} a
 * @returns
 */
export function fromHex(color, a = 1) {
  var t = {},
    bits = color.length == 4 ? 4 : 8,
    mask = (1 << bits) - 1;
  color = Number("0x" + color.substr(1));
  if (isNaN(color)) {
    return null; // Color
  }
  ["b", "g", "r"].forEach(function(x) {
    var c = color & mask;
    color >>= bits;
    t[x] = bits == 4 ? 17 * c : c;
  });
  t.a = a;
  return t; // Color
}

/**
 * @todo  得到一个更亮或者更暗的值，通过一个给定的十六进制颜色值（比如#F06D06,或者没有#）
 * @param {type} col
 * */
export function lightenDarkenColor(col, amt) {
  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);
  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

/**
 * @todo JSON拷贝
 * @param {*} obj
 * @returns
 */
export function jsonClone(obj) {
  if (!isObject(obj)) {
    return obj;
  } else {
    return JSON.parse(JSON.stringify(obj));
  }
}

/**
 * @todo 深拷贝
 * @param {*} src
 * @returns {*}
 */
export function deepClone(src) {
  if (!isObject(src) || isReg(src)) {
    return src;
  }

  let obj;

  if (isDate(src)) {
    obj = new Date();
    obj.setTime(src.getTime());
  } else if (src instanceof Map) {
    obj = new Map();
    for (const [key, value] of src.entries()) {
      obj.set(key, deepClone(value));
    }
  } else if (src instanceof Set) {
    obj = new Set();
    for (const [key, value] of src.entries()) {
      obj.add(key, deepClone(value));
    }
  } else if (src instanceof Promise) {
    obj = new Promise((resolve, reject) => {
      src.then(
        v => resolve(v),
        r => reject(r)
      );
    });
  } else {
    obj = Array.isArray(src) ? [] : {};

    Reflect.ownKeys(src).forEach(key => {
      const value = src[key];
      obj[key] = isObject(value) ? deepClone(value) : value;
    });
  }

  return obj;
}

/**
 * @description 交换数组中两个元素的位置
 * @param {Array} arr
 * @param {Number} indexA
 * @param {Number} indexB
 * @returns {Array}
 */
export function exchangeItemByIndexOfArray(arr, indexA, indexB) {
  let res = arr;

  if (!Array.isArray(arr)) {
    return res;
  }

  const len = arr.length;

  if (
    indexA >= 0 &&
    indexB >= 0 &&
    indexA < len &&
    indexB < len &&
    indexA != indexB
  ) {
    const a = arr[indexA],
      b = arr[indexB];

    res = arr.map((item, index) => {
      if (index == indexA) {
        return b;
      } else if (index == indexB) {
        return a;
      } else {
        return item;
      }
    });
  }
  return res;
}