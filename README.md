<!--
 * @Date: 2022-08-28 14:44:57
 * @LastEditTime: 2022-09-22 01:06:56
-->

# BEING ALIVE

> 这个项目是为了证明「活着」，寻找自我的价值感。

---

> 想要的东西

```
期望可以做真实的自己。
能够自由的表达。
不用束手束脚。
不需要看着他人的眼色行事。
远行时那句「永远不要含着不甘入眠」是对去他妈的糟糕生活重拳反击。
```

> 这个项目要做什么

```
后台系统：能够添加任何我想添加的功能。
每个文件都会有着完善的说明，为巩固自己所学的内容，如果能帮助到其他人更好。
```

---

# 架构

[说明](./record/framework.md)

# 功能

### 2022/08/30

- [x] 项目基础：基于 `docker-compose` 环境搭建进行容器编排，集成 mongodb、nginx。[搭建说明](./record/base-nginx-mongodb-docker.config.md)

### 2022/08/31

- [x] 项目基础：基于`winston`处理日志，持久化存储。 [说明](./record/base-logger.md)
- [x] 项目基础：基于`nestjs` `过滤器`统一异常返回数据结构。 [说明](./record/base-unified-response.md#异常数据结构处理)

### 2022/09/01

- [x] 项目基础：基于`nestjs` `拦截器`的统一数据返回格式处理。[说明](./record/base-unified-response.md#正常数据结构处理)
- [x] 业务开发：创建账号、登陆，生成 JWT 用于身份鉴权。[说明](./record/base-jwt.md)

### 2022/09/19

- [x] 项目基础：权限管理控制 RBAC 0 。 [说明](./record/base-rbac.md)

### 2022/09/20

- [x] 业务开发：tag module，增删改查

### 2022/09/21

- [x] 文章部分：增删改查 、标签绑定

### TODO

- [ ] 分页查看
