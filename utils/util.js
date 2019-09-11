const HEADER_URLS = [
  'http://lc-d4bjfufj.cn-n1.lcfile.com/693fcd9cea9c87b1a31a/0.jpg',
  'http://lc-D4bjFUfJ.cn-n1.lcfile.com/18c623311545bde9ff8e/1.jpg',
  'http://lc-d4bjfufj.cn-n1.lcfile.com/a38291d876ddb8a6fa3f/2.jpg',
  'http://lc-d4bjfufj.cn-n1.lcfile.com/02d59d36dc20711776cb/3.jpg',
  'http://lc-d4bjfufj.cn-n1.lcfile.com/186604e04a700af5d855/4.jpg',
  'http://lc-d4bjfufj.cn-n1.lcfile.com/0fe311d0c1e0d144bdc1/5.jpg',
  'http://lc-d4bjfufj.cn-n1.lcfile.com/43ca883a607238ed3d7d/6.jpg',
  'http://lc-d4bjfufj.cn-n1.lcfile.com/b2ac0662bf7b67c6ae4d/7.jpg',
  'http://lc-d4bjfufj.cn-n1.lcfile.com/4eb7ec5053d7f6802c25/8.jpg',
  'http://lc-d4bjfufj.cn-n1.lcfile.com/f28f6b3214ed02d0741c/9.jpg',
]

export function generateUserIconByAuthor(author) {
  var authorUrl = HEADER_URLS[0]
  if (author != '') {
    var index = (author.charCodeAt(0) + author.charCodeAt(author.length -1)) % 10
    authorUrl = HEADER_URLS[index]
  }
  return authorUrl
}
module.exports = {
  generateUserIconByAuthor: generateUserIconByAuthor
}
