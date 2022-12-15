// 格式化时间
export function formatTime(time) {
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
}

// 比较时间
export function compareTime(time) {
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let now = new Date()
  let nowYear = now.getFullYear()
  let nowMonth = now.getMonth() + 1
  let nowDay = now.getDate()
  let nowHour = now.getHours()
  let nowMinute = now.getMinutes()
  if (year < nowYear) {
    return true
  } else if (year == nowYear) {
    if (month < nowMonth) {
      return true
    } else if (month == nowMonth) {
      if (day < nowDay) {
        return true
      } else if (day == nowDay) {
        if (hour < nowHour) {
          return true
        } else if (hour == nowHour) {
          if (minute < nowMinute) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      } else {
        return false
      }
    } else {
      return false
    }
  } else {
    return false
  }
}