# 使用 Nginx 作为基础镜像
FROM  nginx:alpine

# 复制构建好的前端静态文件到 Nginx 目录
COPY dist /usr/share/nginx/html

# 复制 Nginx 配置文件（如果需要）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口 80
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
