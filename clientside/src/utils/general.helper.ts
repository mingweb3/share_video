export const isEmpty = (value: any): value is boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'number') return false
  if (Array.isArray(value)) return !value.length
  if (Object.prototype.toString.call(value) === '[object Date]') return false
  if (typeof value === 'object') return Object.keys(value).length === 0
  if (Object.prototype.toString.call(value) === '[object String]') return value === ''

  return false
}

/**
 * Cuts a given text to a specified number of words and adds ellipsis if needed.
 *
 * @param {string} txt - The input text to be shortened.
 * @param {number} num - The number of words to keep in the shortened text.
 * @returns {string} The shortened text with ellipsis if necessary.
 */
export const cutText = (txt: string, num: number): string => {
  const words = txt.split(' ')
  if (words.length <= num) {
    return txt
  }

  const truncatedWords = words.slice(0, num)
  return `${truncatedWords.join(' ')}...`
}

export function isActiveMenu(menuItemHref: string, pathname: string): boolean {
  if (menuItemHref.includes(pathname, 0) && pathname !== '/') {
    return true
  }
  return false
}
