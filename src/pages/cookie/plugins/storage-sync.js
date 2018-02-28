import {
  setItem
} from '../../../api/chrome-storage'
import config from '../config'
import {
  ADD_CHEATER,
  ADD_ORIGIN
} from '../store/mutation-types'

const { storageNameSpace } = config

export default prevStore => {
  prevStore.subscribe((mutation, nextState) => {
    console.log('subscribe', mutation, nextState)
    const mutationTypes = [
      ADD_CHEATER,
      ADD_ORIGIN
    ]
    if (mutationTypes.includes(mutation.type)) {
      setItem(storageNameSpace, nextState.map)
    }
  })
}
