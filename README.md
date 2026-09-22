# StarPoints

配向依存相互作用を持つ二次元粒子系から、準周期構造が自己組織化する条件を探索するブラウザベースの研究ワークベンチです。

## 開発

```bash
npm install
npm run dev
```

## プロダクションビルド

```bash
npm run build
```

現在のプロトタイプには、円形容器内のライブ粒子描画、5回対称パッチ表示、回折像・回転秩序表示、モデルパラメータ編集、再生制御、JSON設定出力が含まれます。

## GitHub Pages への公開

このリポジトリには `.github/workflows/pages.yml` が含まれています。GitHub上で次の設定を一度だけ行ってください。

1. リポジトリの **Settings → Pages** を開く。
2. **Build and deployment → Source** で **GitHub Actions** を選ぶ（`Deploy from a branch` は選ばない）。
3. `main`（または現在利用している既定ブランチ）へ変更をマージする。
4. **Actions → Deploy to GitHub Pages** が成功したら、同ワークフローの `deploy` ジョブに表示されるURLを開く。

プロジェクトPagesの `/starPoints/` のようなサブパスでも動作するよう、ブラウザ向けアセットは相対URLで参照しています。リポジトリが非公開の場合は、利用中のGitHubプランでPagesの公開が許可されていることも確認してください。
