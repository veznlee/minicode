Page({
  data: {
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }],
    arrayNum: [1, 2, 3, 4, 5, 1, 2, 3, 4]
  },
  tapName(event) {
    console.log(event)
  },
  tapBlock(event){
    console.log(0)
  }
})