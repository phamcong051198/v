export function getLastElements(arr, countEvent: number) {
  const count = arr.length % countEvent || countEvent
  return arr.slice(-count)
}
