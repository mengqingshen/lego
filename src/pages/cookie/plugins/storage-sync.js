import _ from 'lodash'
import {
  setItem
} from '../../../api/chrome-storage'
import config from '../config'

const { storageNameSpace } = config

export default prevStore => {
  prevStore.subscribe((mutation, nextState) => {
    if (mutation.type.includes('SYNC_')) {
      const map = _.cloneDeep(nextState.map)
      map.forEach((originItem) => {
        originItem.cheaterList.forEach(cheater => {
          cheater.cookies = cheater.cookies.map(({ name }) => ({ name }))
        })
      })

      setItem(storageNameSpace, map)
    }
  })
}
