(function(){

	function has(prop, obj) {
		return Object.prototype.hasOwnProperty.call(obj, prop)
	}

	function toPairs(obj) {
		var pairs = []
		for (var prop in obj) {
			if (has(prop, obj)) {
				pairs[pairs.length] = [prop, obj[prop]]
			}
		}
		return pairs
	}

	function sortBy(fn, list) {
		return Array.prototype.slice.call(list, 0).sort(function(a, b) {
			var aa = fn(a)
			var bb = fn(b)
			return aa < bb ? -1 : aa > bb ? 1 : 0
		})
	}

	function createStrHash(str) {
		var hash = 0
		var i
		var chr
		if (str.length === 0) {
			return hash
		}
		for (i = 0; i < str.length; i++) {
			chr = str.charCodeAt(i)
			hash = ((hash << 5) - hash) + chr
			hash |= 0
		}
		return hash
	}

	function getVarType(testvar) {
		var typeStr = Object.prototype.toString.call(testvar)
		return typeStr.replace(/\[object (.*?)\]/, '$1')
	}

	function createValueStr(value) {
		var valueType = getVarType(value)
		var valueStr
		if (valueType === 'Object') {
			valueStr = valueType + createObjStr(value)
		} else if (valueType === 'Array') {
			valueStr = valueType + value.map(createValueStr).join(',')
		} else {
			valueStr = valueType + value
		}
		return valueStr
	}

	function createObjStr(obj) {
		var objPairs = toPairs(obj)
		var sorted = sortBy(function(pair){ return pair[0] }, objPairs)
		var objStr = sorted.reduce(function(acc, pair) {
			var key = pair[0]
			var value = pair[1]
			var valueStr = createValueStr(value)
			return acc + key + valueStr
		}, '')
		return objStr
	}

	function slimObjectHash(obj) {
		var objStr = createObjStr(obj)
		return createStrHash(objStr)
	}

	if (
		typeof module !== 'undefined'
		&& typeof module.exports !== 'undefined'
	) {
		module.exports = slimObjectHash
	} else {
		window.slimObjectHash = slimObjectHash
	}

}).call(this)