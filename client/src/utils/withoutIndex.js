import { chain } from 'lodash'
export default (array, index) => chain(array).omit(index).map().value()
