import {
  setItem
} from '../../../api/chrome-storage'
import config from '../config'

const { storageNameSpace } = config

export default prevStore => {
  prevStore.subscribe((mutation, nextState) => {
    console.log('subscribe', mutation, nextState)
    if (mutation.type === 'ADD_ORIGIN') {
      setItem(storageNameSpace, nextState.map)
    }
  })
}
