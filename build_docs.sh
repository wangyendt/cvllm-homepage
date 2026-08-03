#!/bin/bash

# 安装必要的依赖
pip install sphinx sphinx-rtd-theme recommonmark sphinx-markdown-tables

# 进入算法文档目录
cd algorithms_docs

# 构建HTML文档
make html

# 创建algorithms目录（如果不存在）
mkdir -p ../algorithms

# 复制构建好的文档到algorithms目录
cp -r _build/html/* ../algorithms/

echo "文档构建完成！" 