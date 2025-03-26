#!/bin/bash

# 交互式输入版本号
echo -n "请输入版本号 (如: 1.0.0): "
read VERSION

# 检查输入是否为空
if [ -z "$VERSION" ]; then
  echo "❌ 版本号不能为空！请重新运行脚本并输入版本号。"
  exit 1
fi

IMAGE_NAME="tva-frontend"
REGISTRY="swr.cn-north-4.myhuaweicloud.com/weipengcheng"

echo "🚀 开始构建前端项目..."
pnpm run build:pro || { echo "❌ 前端构建失败！"; exit 1; }

echo "📦 构建多架构 Docker 镜像..."
docker build --platform linux/amd64 -t ${IMAGE_NAME}:${VERSION} . || { echo "❌ Docker 镜像构建失败！"; exit 1; }

# 标记镜像
echo "🏷️  标记镜像..."
docker tag ${IMAGE_NAME}:${VERSION} ${REGISTRY}/${IMAGE_NAME}:${VERSION}

# 让用户确认是否推送
echo -n "是否推送镜像到华为云？(y/N): "
read CONFIRM
if [[ "$CONFIRM" =~ ^[Yy]$ ]]; then
  echo "📤 推送镜像到华为云..."
  docker push ${REGISTRY}/${IMAGE_NAME}:${VERSION} || { echo "❌ 镜像推送失败！"; exit 1; }
  echo "✅ 推送完成: ${REGISTRY}/${IMAGE_NAME}:${VERSION}"
else
  echo "❌ 取消推送。"
fi
