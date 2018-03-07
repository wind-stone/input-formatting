export function format(options, delimiterArray) {
  let valueArray = getValueArray(options.initialValue, options.delimiters)
  if (!delimiterArray) {
    delimiterArray = getDelimiterArray(options)
  }
  const maxValueLen = options.format.length - delimiterArray.length
  if (valueArray.length > maxValueLen) {
    valueArray = valueArray.slice(0, maxValueLen)
  }
  delimiterArray.forEach(delimiter => {
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

export function getDelimiterArray(options) {
  const delimiters = options.delimiters
  const delimiterArray = []
  options.format.split('').forEach((delimiter, index) => {
    if (delimiters.indexOf(delimiter) > -1) {
      delimiterArray.push({
        index,
        value: delimiter
      })
    }
  })
  return delimiterArray
}

export function error (msg) {
  console.error(`[input-foratting]: ${msg}`)
}
