const helloObj = (data) => ({
  message: data.message,
  date: data.date,
  hour: data.time
}) //converte as informações para um JSON

module.exports = {
  helloObj
}
