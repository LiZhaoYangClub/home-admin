import illustration0 from '/@/icons/illustration0.svg?component'
import illustration1 from '/@/icons/illustration1.svg?component'
import illustration2 from '/@/icons/illustration2.svg?component'
import illustration3 from '/@/icons/illustration3.svg?component'
import illustration4 from '/@/icons/illustration4.svg?component'
import illustration5 from '/@/icons/illustration5.svg?component'
import illustration6 from '/@/icons/illustration6.svg?component'

/** Show a different background every day */
const currentWeek = computed(() => {
  switch (String(new Date().getDay())) {
    case '0':
      return illustration0
    case '1':
      return illustration1
    case '2':
      return illustration2
    case '3':
      return illustration3
    case '4':
      return illustration4
    case '5':
      return illustration5
    case '6':
      return illustration6
    default:
      return illustration4
  }
})

export default currentWeek