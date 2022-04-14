/**
 * Created by PanJiaChen on 16/11/18.
 */
import moment from 'moment'

/**
  * Parse the time to string
  * @param {(Object|string|number)} time
  * @param {string} cFormat
  * @returns {string | null}
  */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  if (!time) return ''
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
  * @param {number} time
  * @param {string} option
  * @returns {string}
  */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
       1 +
       '月' +
       d.getDate() +
       '日' +
       d.getHours() +
       '时' +
       d.getMinutes() +
       '分'
    )
  }
}

/**
  * Get time object
  * @param {any} time
  * @returns {Number}
  */
export function getDateObj(time) {
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  return date
}

/**
  * Calculate the time difference
  * @param {any} start 开始时间
  * @param {any} end 结束时间
  * @param {string} cFormat 时间格式化
  * @return {string | null} 返回时间差
  */
export function apartTime(start, end, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{d}天{h}小时{i}分钟{s}秒'

  const startTime = getDateObj(start).getTime()
  const endTime = getDateObj(end).getTime()
  const apart = endTime - startTime
  // 计算出相差天数
  const d = Math.floor(apart / (24 * 3600 * 1000))

  // 计算出小时数
  const leave1 = apart % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  const h = Math.floor(leave1 / (3600 * 1000))

  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  const i = Math.floor(leave2 / (60 * 1000))

  // 计算相差秒数
  const leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  const s = Math.round(leave3 / 1000)

  const formatObj = { d, h, i, s }
  const formatFilter = format.split('{').filter(item => { // 过滤掉为0的项
    return formatObj[item[0]] !== 0
  }).join('{')
  const time_str = formatFilter.replace(/{([ymdhisa])+}/g, (result, key) => {
    return formatObj[key]
  })
  return time_str
}

/**
  * 将时间转化成为天时分秒等格式
  * @param { any } time 传入时间
  * @param { String } format 时间格式
  * @param { String } unit 时间单位
  */
export function convertTime(time, format = '{d}天{h}小时{m}分钟{s}秒', unit = 's') {
  if (!time) return ''
  if (arguments.length === 0) {
    return null
  }
  if (time <= 0) return time
  const time_s = unit === 'ms' ? Math.floor(time / 1000) : time
  // 获取毫秒
  let ms = unit === 'ms' ? time % 1000 : 0
  // 获取天数
  const d = Math.floor(time_s / (24 * 3600))
  // 获取小时
  let h = Math.floor(time_s % (24 * 3600) / 3600)
  // 获取分钟
  let m = Math.floor(time_s % 3600 / 60)
  // 获取秒
  let s = (time_s % 3600 % 60).toFixed(0)
  // 根据format进行判断
  if (!/d+/g.test(format)) {
    h += d * 24
  }
  if (!/h+/g.test(format)) {
    m += h * 60
  }
  if (!/m+/g.test(format.replace('ms', ''))) {
    s += m * 60
  }
  if (!/s+/g.test(format)) {
    ms += s * 1000
  }
  const formatObj = { ms, d, h, m, s }
  const formatFilter = format.split('{').filter(item => { // 过滤掉为0的项
    return formatObj[item[0]] !== 0
  }).join('{')
  const time_str = formatFilter.replace(/{([ymdhisa])+}/g, (result, key) => {
    return formatObj[key]
  })
  return time_str
}

/**
  * @param {string} url
  * @returns {Object}
  */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
  * @param {string} input value
  * @returns {number} output value
  */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  // 我修改了var to let,使用的人多测一下
  let s = str.length
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
  * @param {Array} actual
  * @returns {Array}
  */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
  * @param {Object} json
  * @returns {Array}
  */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    }),
  ).join('&')
}

/**
  * @param {string} url
  * @returns {Object}
  */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
       decodeURIComponent(search)
         .replace(/"/g, '\\"')
         .replace(/&/g, '","')
         .replace(/=/g, '":"')
         .replace(/\+/g, ' ') +
       '"}',
  )
}

/**
  * @param {string} val
  * @returns {string}
  */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
  * Merges two objects, giving the last one precedence
  * @param {Object} target
  * @param {(Object|Array)} source
  * @returns {Object}
  */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
  * @param {HTMLElement} element
  * @param {string} className
  */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
       classString.substr(0, nameIndex) +
       classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
  * @param {string} type
  * @returns {Date}
  */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
  * @param {Function} func
  * @param {number} wait
  * @param {boolean} immediate
  * @return {*}
  */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
  * This is just a simple version of deep copy
  * Has a lot of edge cases bug
  * If you want to use a perfect deep copy, use lodash's _.cloneDeep
  * @param {Object} source
  * @returns {Object}
  */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
  * @param {Array} arr
  * @returns {Array}
  */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
  * @returns {string}
  */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
  * Check if an element has a class
  * @param {HTMLElement} elm
  * @param {string} cls
  * @returns {boolean}
  */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
  * Add class to element
  * @param {HTMLElement} elm
  * @param {string} cls
  */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
  * Remove class from element
  * @param {HTMLElement} elm
  * @param {string} cls
  */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
  * flat array
  * 树形结构转成数组
  * @param {object}
  */
export function getTreeList(tree) {
  const res = []
  let temp = [].concat(tree)
  while (temp.length) {
    const item = temp.shift()
    item.children && (temp = temp.concat(item.children))
    res.push(item)
  }
  return res
}
/**
  * 如果传参对象的value是空,直接去掉这个传参
  * @param {Object} data 可能含有value为0的值
  * @return {*}
  */
export function deleteEmptyValue(data) {
  for (const key in data) {
    if (data[key] === '') {
      delete data[key]
    }
  }
  return data
}
/**
  * 获取唯一uuid
  */
export function getUuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`
}

/**
  * 获取当月日期的第一天的时间戳/传入的时间格式,获取现在日期的时间戳/传入的时间格式
  * @param {String} dateFormat 传入时间格式 如果是小x的话就是毫秒的时间戳,其他格式按照传入的具体格式显示
  */
export function monthTimeStamp(dateFormat) {
  return {
    firstDayOftheM: moment().startOf('month').format(dateFormat),
    dayOfTheM: moment().format(dateFormat),
  }
}

/**
  * 判断当前浏览器类型
  * @param {String} key 浏览器类型
  * @return { Boolean } 返回是否为该浏览器类型
  */
export function judgeBrowser(key) {
  const regular = {
    ie: /(?:ms|\()(ie)\s([\w\.]+)|trident|(edge|edgios|edga|edg)/i,
    firefox: /firefox\/([\d.]+)/i,
    chrome: /chrome\/([\d.]+)/i,
  }
  return regular[key] ? regular[key].test(window.navigator.userAgent) : false
}
/**
  * 本地保存文件并导出
  * @param { Object } Obj 导出文件参数对象
  * @param { Blob } file 文件资源
  * @param { String } fileName 文件名称(注意：包含后缀)
  */
export function loacalSaveFile({ file, fileName, option = { type: 'application/vnd.ms-excel' }}) {
  const ieKit = judgeBrowser('ie')
  const blobData = new Blob([file], option) // 生成 Blob文件
  if (ieKit && navigator.msSaveBlob) {
    navigator.msSaveBlob && navigator.msSaveBlob(blobData, fileName)
  } else {
    // 其他
    const save_link = document.createElement('a')
    const url = URL.createObjectURL(file) // 创建url
    save_link.href = url
    save_link.download = fileName
    document.body.appendChild(save_link)
    save_link.click()
    setTimeout(() => {
      document.body.removeChild(save_link)
      window.URL.revokeObjectURL(url) // 回收url
    }, 0)
  }
}
/**
  * 获取禁言剩余数
  * @param { Date } nowTime 当前时间
  * @param { Date } endTime 禁言截止时间
  */
export function forbidTime(nowTime, endTime) {
  if (!endTime) {
    return ''
  }
  const res = moment(endTime * 1000).diff(moment(nowTime), 'seconds')
  return +res > 0 ? `剩余${apartTime(nowTime, endTime)}` : ''
}
/**
  * 格式化钱，默认基数是100
  * @param amount {Number/String}   要格式化的金钱
  * @param base   {Number}          格式化基数,默认为100
  * @returns {number}
  */
export function formatMoney(amount = 0, base = 100) {
  if (!amount) {
    return 0
  }
  if (base === 1) {
    return amount
  }
  if (parseInt(amount) === Number(amount)) {
    return Number(amount) / base
  }
  return (Math.floor(Number(amount)) / base).toFixed(2)
}

/**
 * base64转可用formdata上传的文件
 * @param { String } base64Url base64的url
 */
export function convertBase64UrlToBlob(base64Url) {
  const bytes = window.atob(base64Url.split(',')[1])
  const array = []
  for (let i = 0; i < bytes.length; i++) {
    array.push(bytes.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], { type: 'image/jpeg' })
}

/**
  * 获取视频封面dataURL的base64
  * @param { String } url 视频url
  */
export function getVideoBase64(url) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    const attr = ['crossOrigin', 'autoplay', 'src']
    const values = ['anonymous', 'autoplay', url]
    for (let i = 0; i < attr.length; i++) {
      video.setAttribute(attr[i], values[i])
    }
    video.addEventListener('loadeddata', () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
      resolve(canvas.toDataURL('image/jpeg'))
    })
  })
}

/**
  * 拿到当月第一天和当天,需要YYYY-MM-DD HH:mm:ss格式
  */
export function monthDate() {
  return {
    mFirst: monthTimeStamp('YYYY-MM-DD 00:00:00').firstDayOftheM,
    mToday: monthTimeStamp('YYYY-MM-DD 23:59:59').dayOfTheM,
  }
}

