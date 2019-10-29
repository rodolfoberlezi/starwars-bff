module.exports = (data) => {
  const message = `Be welcome ${data.visitor}`
  const today = new Date()

  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear()

  const hour = today.getHours()
  const minutes = today.getMinutes()

  const date = `${year}-${month}-${day}`
  const time = `${hour}:${minutes}`

  return {
    message,
    date,
    time
  } //retorna as informações de negócio
}