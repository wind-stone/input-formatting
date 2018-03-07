export function format(valueArray, delimiterArray) {
  delimiterArray.forEach((delimiter) => {
    if (valueArray.length <= delimiter.index) {
      return
    }
    if (delimiter.index < valueArray.length) {
      valueArray.splice(delimiter.index, 0, delimiter.value)
    }
  })
  return valueArray.join('')
}

// 删除分隔符，返回输入的字符数组
export function getValueArray(str, delimiters) {
  const result = delimiters.reduce((result, delimiter) => {
    return replaceAll(result, delimiter)
  }, str).split('')
  return result
}

function replaceAll(str, character) {
  while (str.indexOf(character) > -1) {
    str = str.replace(character, '')
  }
  return str
}

export function error (msg) {
  console.error(`[input-foratting]: ${msg}`)
}
