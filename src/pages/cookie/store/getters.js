/**
 * Created by mengqingshen on 2018/02/05.
 */
export default {
  domain (state) {
    return (new URL(state.url)).hostname
  },
  origin (state) {
    return (new URL(state.url)).origin
  }
}
