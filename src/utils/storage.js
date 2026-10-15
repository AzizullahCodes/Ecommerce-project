// localStorage se array nikalta hai, kuch na mile to khali array deta hai
export const getArrayFromStorage = (key) => {
  try {
    const data = JSON.parse(localStorage.getItem(key))
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}