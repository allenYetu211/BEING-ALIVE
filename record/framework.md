<!--
 * @Date: 2022-09-01 00:09:28
 * @LastEditTime: 2022-09-01 01:16:21
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
- status: `响应描述` `succeed` | `error`

#### 异常数据结构

```typescript
  {
    statusCode: number,
    timestamp: Date
    path: string,
    message: string,
    status: `error`
  }
```

#### 正常数据结构

```typescript
{
  data: any,
  status:  `succeed`
}
```
