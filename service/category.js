import request from './network.js'

// 请求分类数据
export function getCateData() {
  return request({
    url: '/information/findall'
  })
}

//请求评论数据



