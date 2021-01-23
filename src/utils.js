export function pick_random(array) {
  const index = Math.floor(array.length * Math.random())
  return array[index]
}

export function sleep(ms) {
  return new Promise((fulfill) => {
    setTimeout(fulfill, ms)
  })
}
