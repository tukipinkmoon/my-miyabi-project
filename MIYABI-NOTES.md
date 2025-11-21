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
