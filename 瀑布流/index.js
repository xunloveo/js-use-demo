let items = document.querySelectorAll('.item')
let boxW = document.querySelector('#box').offsetWidth
if (items && items.length > 0) {
  let itemW = items[0].parentNode.offsetWidth
  let avg = (boxW / itemW) >> 0
  ;[...items].forEach((item, index) => {
    item.style.background = `#${Math.random()
      .toString(16)
      .substr(2, 6)}`
    item.style.height = `${(100 + Math.random() * 101) >> 0}px`
    let p = item.parentNode
    let d = (index / avg) >> 0
    let m = index % avg
    let l = m * itemW
    p.style.left = `${l}px`
    let poi = index - avg
    if (d > 0) {
      let t = parseFloat(items[poi].parentNode.style.top)
      let pH = items[poi].parentNode.offsetHeight
      p.style.top = `${t + pH}px`
    } else {
      p.style.top = '0'
    }
  })
}
