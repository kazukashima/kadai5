# =======================================
# Makefile for React + Vite + Firebase
# =======================================

# ==== 変数 ====
BUILD_DIR=dist

# ==== 開発用 ====
# 開発サーバーを起動
dev:
	npm run dev

# ==== ビルド ====
# TypeScriptのビルドとViteビルドをまとめて実行
build:
	npm run build

# ==== 静的チェック ====
# ESLintでコードの構文をチェック
lint:
	npm run lint

# ==== デプロイ ====
# Firebase Hosting へデプロイ（Hostingのみ）
deploy:
	npm run build
	firebase deploy --only hosting

# ==== 一括リリース ====
# テスト・ビルド・デプロイをまとめて実行
release: lint build deploy

# Makefile

test:
	npm run test

