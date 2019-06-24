let data = [
  {
    name: 'A',
    child: [
      {
        name: 'A-1',
        child: [
          { name: 'A-1-1', child: [{ name: 'A-1-1-1' }] },
          { name: 'A-1-2' }
        ]
      },
      {
        name: 'A-2',
        child: [{ name: 'A-2-1', name: 'A-2-2' }]
      }
    ]
  },
  {
    name: 'B',
    child: [
      {
        name: 'B-1',
        child: [{ name: 'B-1-1', child: [{ name: 'B-1-1-1' }] }]
      },
      {
        name: 'B-2',
        child: [{ name: 'B-2-1' }]
      }
    ]
  },
  {
    name: 'C',
    child: [
      {
        name: 'C-1',
        child: [{ name: 'C-1-1', child: [{ name: 'C-1-1-1' }] }]
      },
      {
        name: 'C-2',
        child: [{ name: 'C-2-1' }]
      }
    ]
  }
]

$(function() {
  function createTree(data) {
    let str = '<ul>'
    data.forEach(item => {
      if (item.child && item.child.length > 0) {
        str += `<li><span>+</span>${item.name}`
        str += createTree(item.child)
      } else {
        str += `<li>${item.name}`
      }
      str += '</li>'
    })
    str += '</ul>'
    return str
  }
  $('#lists').append(createTree(data))

  // 事件
  $('#lists ul li').on('click', function(e) {
    e.stopPropagation()

    if ($(e.target).has('ul').length) {
      if (
        $(e.target)
          .find('ul')
          .is(':visible')
      ) {
        $(e.target)
          .find('ul')
          .hide()
          .end()
          .find('span')
          .html('+')
      } else {
        $(e.target)
          .find('ul')
          .show()
          .end()
          .find('span')
          .html('-')
      }
    }
  })

  $('#lists ul li ul').hide()
})
