import { v4 as uuidv4 } from 'uuid'
// 生成一个随机字符串，且每次执行都不能发生变化，游客身份持久存储
export const getUUID = () => {
  // 先从本地存储获取uuid（查看本地是否有）
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  // 如果没有
  if (!uuid_token) {
    // 生成临时游客身份
    uuid_token = uuidv4()
    localStorage.setItem('UUIDTOEKN', uuid_token)
  }
  // 切记有返回值，没有返回值是undefined
  return uuid_token
}
