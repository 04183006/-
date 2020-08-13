import request from './network.js'

// 请求轮播图数据
export function getHomeLBT() {
  return request({
    url: '/chart/findall'
  })
} 

//请求新闻数据
export function getHomeNews() {
  return request({
    url: '/news/findall'
  })
} 

//请求top10热点接口
export function getTopTen() {
  return request({
    url: '/information/getTen'
  })
} 

//请求得分top10接口
export function getScoreTen() {
  return request({
    url: '/user/scoreOften'
  })
} 