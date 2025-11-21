# Miyabi 学習ノート 📚

Miyabiを使いながら学んだことを記録する日記です。

---

## 📖 基本情報

### Miyabiとは？
Miyabiは**AI駆動の自動開発フレームワーク**です。
- GitHubのIssueを作ると、AIエージェントが自動でコードを書いてくれる
- 7つのAIエージェントが協力して作業
- Pull Requestまで自動で作成

### セットアップが必要なタイミング
✅ **1回だけ（最初のみ）:**
- 新しいプロジェクトを作る時
- `npx miyabi init プロジェクト名`
- `npx miyabi setup`

❌ **毎日は不要:**
- 一度セットアップしたら、そのまま使い続けられる

### 日常的な使い方
1. **ステータス確認**: `npx miyabi status`
2. **Issue作成**: `gh issue create --title "タイトル" --body "説明"`
3. **AIエージェントが自動作業** → PR作成
4. **レビュー & マージ**

---

## 🚀 新しいプロジェクトの作り方

### 完全手順（初めてのプロジェクト）

```bash
# 1. デスクトップに移動（または好きな場所）
cd ~/Desktop

# 2. Miyabiプロジェクトを作成
npx miyabi init プロジェクト名

# 3. プロジェクトフォルダに移動
cd プロジェクト名

# 4. セットアップを実行
npx miyabi setup

# 5. VS Codeで開く
# VS Codeの File → Open Folder → プロジェクトを選択

# 6. ターミナルでClaude Codeを起動
claude
```

### GitHub Secretsの設定（AIエージェントを動かすため）

1. **Anthropic Console**でAPIキーを取得: https://console.anthropic.com/
2. **GitHub Secrets**に設定:
   - `https://github.com/ユーザー名/プロジェクト名/settings/secrets/actions`
   - 「New repository secret」をクリック
   - Name: `ANTHROPIC_API_KEY`
   - Secret: 取得したAPIキー

### 2つ目以降のプロジェクト（超速い！）

```bash
# Miyabiはキャッシュされているので超速い（3-5秒）
npx miyabi init 新しいプロジェクト名
cd 新しいプロジェクト名
npx miyabi setup

# GitHub Secretsは各プロジェクトごとに設定が必要
```

**重要:** Miyabi本体は1回だけダウンロード、あとはキャッシュから実行されるので速い！

---

## 📅 毎日の使い方ガイド

### 朝・作業開始時

```bash
# 1. VS Codeを開く（前日から開きっぱなしでもOK）
# ログアウト/ログイン不要！

# 2. ターミナルでClaude Codeを起動（必要な場合）
claude

# 3. プロジェクトのステータスを確認
npx miyabi status

# 4. 新しいIssueを確認
gh issue list
```

### 作業中

```bash
# やりたいことがあればIssueを作成
gh issue create --title "機能追加" --body "詳細な説明"

# AIエージェントが自動で作業してくれる
# 数分〜数十分待つ

# PRができたら確認
gh pr list
gh pr view 番号
```

### 夜・作業終了時

```bash
# 学習ノートを更新
# daily-log.txt に今日学んだことを書く
# Claude Codeに「更新して」と言う

# VS Codeは閉じてもOK、開きっぱなしでもOK
# 次回起動時も同じプロジェクトが開く
```

**ポイント:**
- ✅ VS Codeは毎日ログイン不要
- ✅ プロジェクトは開きっぱなしでOK
- ✅ Claude Codeも必要な時だけ起動すればOK

---

## 💰 料金・コストについて

### 完全無料で使えるもの

✅ **GitHub**: パブリックリポジトリは無料
✅ **GitHub Actions**: 月2,000分まで無料（十分）
✅ **VS Code**: 無料

### 有料のもの

#### 1. Claude Code（必須）
- **Proプラン**: $20/月
- **これで十分！** より高いプランは不要
- 無制限のチャット
- Claude Sonnet 4.5が使える

#### 2. Anthropic API（AIエージェント用）
- **従量課金制**: 使った分だけ
- **目安**: 1日 $0.10〜$1程度
- **月額**: $3〜$30程度（使用頻度による）
- 最初は$5の無料クレジットあり

**参考料金（Claude Sonnet 4）:**
- 入力: $3 / 1M tokens
- 出力: $15 / 1M tokens
- 1回のIssue処理で約$0.10〜$0.50

#### 3. GitHub（オプション）
- **Free**: パブリックリポジトリ無制限
- **Pro ($4/月)**: プライベートリポジトリも無制限
- 学習目的ならFreeで十分

### 月額コスト試算

**最小構成（学習目的）:**
- Claude Code Pro: $20/月
- Anthropic API: $5/月（週に数回使う程度）
- GitHub: $0（Free）
- **合計: 約$25/月（約3,500円）**

**積極的に使う場合:**
- Claude Code Pro: $20/月
- Anthropic API: $20/月（毎日数回使う）
- GitHub Pro: $4/月
- **合計: 約$44/月（約6,200円）**

**コスト削減のコツ:**
- AIエージェント（API）は必要な時だけ使う
- 手動でできることは自分でやる
- 複雑なタスクだけAIに任せる

---

## ⚡ Miyabiを使う上で大切なこと

### 必須の設定

1. **ANTHROPIC_API_KEY**
   - 各プロジェクトのGitHub Secretsに設定
   - これがないとAIエージェントが動かない
   - 設定場所: `Settings → Secrets and variables → Actions`

2. **GitHub認証**
   - `gh auth login` で1回ログインすればOK
   - 複数プロジェクトで共通

3. **Claude Code**
   - Proプラン（$20/月）に加入
   - ターミナルで `claude` コマンドが使える

### 効果的な使い方

#### Issueの書き方（重要！）

**良いIssueの例:**
```markdown
タイトル: ユーザー認証機能を追加

本文:
## 目的
ユーザーがログイン/ログアウトできるようにする

## 要件
- ログインページの作成
- JWT認証の実装
- ログイン状態の保持
- ログアウト機能

## 期待する結果
/login にアクセスするとログインフォームが表示され、
認証に成功すると /dashboard にリダイレクトされる
```

**悪いIssueの例:**
```
ログイン機能
```
→ 詳細が不明確、AIが何をすべきか分からない

#### AIエージェントとの付き合い方

✅ **任せるべきこと:**
- 定型的なコード生成
- テストの作成
- ドキュメント作成
- リファクタリング

❌ **自分でやるべきこと:**
- アーキテクチャの決定
- セキュリティの検討
- 最終的なレビュー
- デプロイ判断

### トラブルシューティング

**問題: AIエージェントが動かない**
→ ANTHROPIC_API_KEYを確認
→ GitHub Actionsのログを確認

**問題: PRが作成されない**
→ Issueのラベルを確認
→ `miyabi status` でステータス確認

**問題: コストが高い**
→ 複雑なタスクのみAIに任せる
→ 簡単な修正は手動で行う

### セキュリティ上の注意

⚠️ **絶対にやってはいけないこと:**
- APIキーをコードにハードコーディング
- `.env` ファイルをGitにコミット
- パスワードをIssueに書く

✅ **やるべきこと:**
- 機密情報はGitHub Secretsに保存
- `.gitignore` で `.env` を除外
- 定期的にAPIキーをローテーション

### バックアップ

📦 **重要なもの:**
- `MIYABI-NOTES.md` - 学習記録
- `src/` - ソースコード
- `.claude/` - エージェント設定

**バックアップ方法:**
- GitHubに自動的にバックアップされる
- ローカルにもコピーを保存推奨

---

## 💡 よく使うコマンド

```bash
# プロジェクトの状態を確認
npx miyabi status

# リアルタイムで監視
npx miyabi status --watch

# 新しいIssueを作成
gh issue create --title "やりたいこと" --body "詳細"

# Issueの一覧を見る
gh issue list

# 特定のIssueを見る
gh issue view 番号

# Pull Requestの一覧を見る
gh pr list

# GitHubで開く
gh repo view --web
```

---

## 📝 学習記録

### 2025-11-21（初日）

#### 今日学んだこと
- ✅ Miyabiプロジェクトのセットアップ方法
  - `npx miyabi init my-miyabi-project`
  - `npx miyabi setup`
- ✅ プロジェクトの構造
  - GitHubリポジトリが自動作成される
  - 46個のラベルが設定される
  - 14個のGitHub Actionsワークフローが配置される
- ✅ Issueの作り方
  - Issue = AIエージェントへの指示書
  - 「やりたいこと」を書く
  - AIが自動で作業してくれる
- ✅ VS Codeの使い方
  - 上の画面 = エディタ（ファイルを見る・編集する）
  - 下の画面 = ターミナル（Claude Codeとチャット、コマンド実行）
- ✅ Claude Codeとの対話
  - 日本語で質問できる
  - ファイルの読み書きができる
  - 一緒に学びながら進められる

#### やってみたこと
1. Miyabiプロジェクトの初期化
2. `miyabi status` でステータス確認
   - 結果: 2つのIssueが pending 状態
3. 初めてのIssue作成
   - Issue #2: 「Miyabi学習ノート（日記）を作成する」
   - ラベルが自動で付いた（phase:planning, priority:P2-Medium, state:pending）

#### 疑問点・わからなかったこと
- ✅ 解決: セットアップは毎日必要？ → 最初の1回だけでOK
- ✅ 解決: Issueとは？ → やりたいことを書くメモ
- ✅ 解決: README.mdはどこにある？ → プロジェクトフォルダのルートにある
- ⏳ 保留: AIエージェントの自動実行 → ANTHROPIC_API_KEYの設定が必要（後で設定予定）

#### 次にやりたいこと
- [ ] ANTHROPIC_API_KEYを設定してAIエージェントを動かす
- [ ] 簡単な機能（Hello World関数など）をIssueで作成してみる
- [ ] Pull Requestのレビュー & マージを体験する
- [ ] `.claude/` フォルダのエージェント設定を見てみる

#### メモ・気づき
- Claude Codeは日本語で会話できるので安心
- わからないことはすぐ聞ける
- 使いながら学ぶのが一番良い
- ファイルの場所や構造が最初は混乱したが、徐々に慣れてきた

---

### YYYY-MM-DD（日付）

#### 今日学んだこと
-

#### やってみたこと
-

#### 疑問点・わからなかったこと
-

#### 次にやりたいこと
-

#### メモ・気づき
-

---

## 🎯 Tips & Tricks

### 効率的なIssue作成
- **タイトル**: 簡潔に「何をするか」
- **本文**: 詳細な説明、期待する結果
- **例**:
  ```
  タイトル: Hello World関数を追加
  本文:
  src/index.tsにHello Worldを返す関数を作成してください。

  要件:
  - 関数名: sayHello
  - 戻り値: "Hello, World!"
  - テストも作成
  ```

### ラベルの意味
- **type:*** → 種類（bug, feature, docs, refactor, test）
- **priority:*** → 優先度（P0-Critical, P1-High, P2-Medium, P3-Low）
- **state:*** → 状態（pending, analyzing, implementing, reviewing, done, blocked, paused）
- **phase:*** → フェーズ（planning, design, development, review, deployment）
- **agent:*** → 担当エージェント（coordinator, codegen, review, issue, pr, deploy）

### トラブルシューティング
- コマンドが見つからない → パスを確認、`npx` を使う
- GitHub認証エラー → `gh auth login` で再認証
- APIキーエラー → リポジトリのSecretsに `ANTHROPIC_API_KEY` を設定

### 便利なショートカット
- VS Codeでファイルを開く: `Cmd + P` → ファイル名入力
- ターミナルを開く: `Cmd + J`
- 複数ターミナル: `Cmd + \` で分割

---

## 🔗 リンク集

### プロジェクト関連
- [GitHubリポジトリ](https://github.com/tukipinkmoon/my-miyabi-project)
- [Issues](https://github.com/tukipinkmoon/my-miyabi-project/issues)
- [Pull Requests](https://github.com/tukipinkmoon/my-miyabi-project/pulls)
- [Actions](https://github.com/tukipinkmoon/my-miyabi-project/actions)
- [Settings - Secrets](https://github.com/tukipinkmoon/my-miyabi-project/settings/secrets/actions)

### Miyabi関連
- [Miyabi Framework](https://github.com/ShunsukeHayashi/Miyabi)
- [NPM Package](https://www.npmjs.com/package/miyabi)

### Claude & Anthropic
- [Anthropic Console](https://console.anthropic.com/)
- [Claude Code Docs](https://docs.claude.com/en/docs/claude-code)

---

## 📊 進捗トラッカー

### 完了したこと
- [x] Miyabiプロジェクトのセットアップ
- [x] 基本的なコマンドの理解
- [x] Issueの作成方法
- [x] VS Codeの基本操作

### 進行中
- [ ] AIエージェントの設定（ANTHROPIC_API_KEY）
- [ ] 実際の機能開発

### 今後やりたいこと
- [ ] 自動化されたPRの体験
- [ ] エージェントの動作を理解する
- [ ] 自分のアイデアを実装する

---

**最終更新: 2025-11-21**

✨ このノートは毎日更新して、成長を記録していきましょう！
