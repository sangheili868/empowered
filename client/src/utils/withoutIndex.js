import { cloneDeep } from 'lodash'
export default (array, index) => {
  const clone = cloneDeep(array)
  clone.splice(index, 1)
  return clone
}
