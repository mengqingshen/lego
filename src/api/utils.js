/**
 * 将字面量模式的正则文本，转换为字符串模式的
 * 即，将其中的 \ 替换为 \\，因为 \ 在字符串中也有转译功能
 * 
 * @param {string} literalStr 字面量模式的正则文本
 * @return {string} 字符串模式的正则
 */
function getStringModeOfRegExp (literalStr) {
	return literalStr.replace('\\', "\\\\")
}

export {
	getStringModeOfRegExp
}