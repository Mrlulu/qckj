import Mock from 'mockjs'
var home = {
  // 属性 id 是一个自增数，起始值为 1，每次增 1
  'id|+1': 1,
  'img1': 'http://lorempixel.com/480/480/food?@string',
  'img2': 'http://lorempixel.com/640/480/technics/?@string',
  // 'img3':'http://lorempixel.com/300/@natural(10,50)0/',
  'img3': '@locImg',
  'quantity': '@int10',
  'limit': '@natural(1,@quantity)',
  'title': '@ctitle(5,26)',
  'user': '@ctitle(3,6)',
  'price|10-999': 1,
  'coupon': '@coupon(@price)',
  'sold|1-9999': 1,
  'point': '@natural(5,999)00',
  'summary': '@cparagraph',
  'isLike|1-5': true,
  'isNew|1-5': true,
  'store|1': ['taobao', 'tmall']
}
Mock.mock('test', {
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'seckillList|15': [home],
  'freeList|15': [home],
  'colleList|6': [home]
})
Mock.mock('selected', {
  'count|100-9999': 1,
  'list|16': [home]
})
Mock.mock('list', {
  'count|10-299': 1,
  'list|10': [{
    'userName': '@userID',
    name: '@cname',
    date: '@now',
    content: '@cparagraph(1, 4)',
    phone: /^(1[35789])[0-9]{9}$/,
    address: '@county(true) @cword(2,4)@pick(["大道","路"]) @cword(2,4)@pick(["大厦","产业园","中心"])',
    'isDefault|1-6': true
  }]
})
Mock.Random.extend({
  constellation: function (date) {
    var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
    return this.pick(constellations)
  },
  userID() {
    return this.boolean() ? this.cword(2, 6) : this.word(4, 12)
  },
  int10(max = 9) {
    return this.natural(1, max) * 10
  },
  coupon(price) {
    return this.int10(Math.ceil(price / 20))
  },
  locImg(id) {
    if (id === 2) {
      return '/static/temp_img2/2Q (' + this.natural(1, 12) + ').jpg'
    } else {
      return '/static/temp_img1/9k (' + this.natural(1, 34) + ').jpg'
    }
  }
})
