import {
  setItem
} from '../../../api/chrome-storage'
import config from '../config'

const { storageNameSpace } = config

export default prevStore => {
  prevStore.subscribe((mutation, nextState) => {
    if (mutation.type.includes('SYNC_')) {
      setItem(storageNameSpace, nextState.map)
      console.log(mutation.type, nextState.map)
    }
  })
}
