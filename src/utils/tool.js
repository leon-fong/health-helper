export const  floatMul = (a, b) =>{
  let c = 0,
    d = a.toString(),
    e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) {}
  try {
    c += e.split('.')[1].length
  } catch (f) {}
  return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c)
}
