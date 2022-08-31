<!--
 * @Date: 2022-09-01 00:09:28
 * @LastEditTime: 2022-09-01 00:12:54
-->
# 服务架构

### 状态码

### 日志存储

### 数据格式
> 异常数据统一格式
- statusCode: `状态码`
- timestamp: `异常时间`
- path: `请求url`
- message: `异常信息`
```typescript
  {
    statusCode: number,
    timestamp: Date
    path: string,
    message: string
  }
```
