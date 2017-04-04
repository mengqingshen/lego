/**
 * 将字面量模式的正则文本，转换为字符串模式的
 * 即，将其中的 \ 替换为 \\，因为 \ 在字符串中也有转译功能
 * 
 * @param {string} literalStr 字面量模式的正则文本
 * @return {string} 字符串模式的正则
 */

import extension from './chrome-extension'

function fireResize (size) {
	extension.emitToCurrentTab('resize', { size })
}
function getStringModeOfRegExp(literalStr) {
	return literalStr.replace('\\', "\\\\")
}

function isObject(it) {
	return Object.prototype.toString.call(it) === '[object Object]'
}

function isFunction(it) {
	return Object.prototype.toString.call(it) === '[object Function]'
}

function isArray(it) {
	return Object.prototype.toString.call(it) === '[object Array]'
}

export {
	getStringModeOfRegExp,
	isObject,
	isFunction,
	isArray,
	fireResize
}