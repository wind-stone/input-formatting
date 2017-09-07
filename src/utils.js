export function formatter(valueArray, separatorIndexArray) {
  separatorIndexArray.forEach((separatorObject) => {
    if (valueArray.length <= separatorObject.index) {
      return
    }
    // 添加 分隔符
    if (separatorObject.index < valueArray.length) {
      valueArray.splice(separatorObject.index, 0, separatorObject.value)
    }
  })

  // 格式化后的值
  return valueArray.join('')
}