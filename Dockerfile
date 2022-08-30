# 选择使用的nodejs版本
FROM node:16.13.2
# 设置环境变量
ENV NODE_ENV=production
# 设置docker中的路径地址
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
#安装相关依赖
RUN yarn install --production --silent  --registry=https://registry.npmmirror.com && mv node_modules ../

COPY . .

EXPOSE 3000

RUN chown -R node /usr/src/app

USER node

CMD ["node", "dist/main"]

