// Claude APIは使用しません - MDファイルから直接記事を生成

/**
 * GitHubリポジトリのURLからowner/repo形式を抽出
 */
function parseGitHubUrl(url) {
  const regex = /github\.com\/([^\/]+)\/([^\/]+)/
  const match = url.match(regex)

  if (!match) {
    throw new Error('有効なGitHubリポジトリのURLを入力してください')
  }

  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/, '')
  }
}

/**
 * リポジトリ内の全てのmdファイルを検索
 */
async function findMarkdownFiles(owner, repo) {
  try {
    // ツリーAPIでファイル一覧を取得
    const treeResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`
    )

    if (!treeResponse.ok) {
      // mainがない場合はmasterを試す
      const masterTreeResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/git/trees/master?recursive=1`
      )
      if (!masterTreeResponse.ok) {
        return []
      }
      const treeData = await masterTreeResponse.json()
      return treeData.tree
        .filter(item => item.path.endsWith('.md') && item.type === 'blob')
        .map(item => item.path)
    }

    const treeData = await treeResponse.json()
    return treeData.tree
      .filter(item => item.path.endsWith('.md') && item.type === 'blob')
      .map(item => item.path)
  } catch (error) {
    console.warn('mdファイル検索失敗:', error)
    return []
  }
}

/**
 * 特定のファイルの内容を取得
 */
async function fetchFileContent(owner, repo, path) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3.raw'
        }
      }
    )
    if (response.ok) {
      return await response.text()
    }
  } catch (error) {
    console.warn(`ファイル取得失敗 (${path}):`, error)
  }
  return ''
}

/**
 * GitHub APIでリポジトリ情報を取得
 */
async function fetchRepoInfo(owner, repo) {
  try {
    // リポジトリの基本情報を取得
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
    if (!repoResponse.ok) {
      throw new Error('リポジトリが見つかりませんでした')
    }
    const repoData = await repoResponse.json()

    // 言語情報を取得
    const languagesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`)
    const languages = await languagesResponse.json()

    // mdファイルを検索
    const mdFiles = await findMarkdownFiles(owner, repo)
    console.log('見つかったmdファイル:', mdFiles)

    // 重要なファイルを優先的に取得
    const importantFiles = []
    const maxFiles = 5 // 最大5ファイルまで
    const maxCharsPerFile = 3000 // 1ファイルあたり3000文字まで

    // README.mdを最優先
    if (mdFiles.includes('README.md')) {
      importantFiles.push('README.md')
    }

    // docs/配下のファイルを優先
    const docsFiles = mdFiles.filter(f => f.startsWith('docs/') && !importantFiles.includes(f))
    importantFiles.push(...docsFiles.slice(0, 3))

    // ルートディレクトリの他のmdファイル
    const rootFiles = mdFiles.filter(f =>
      !f.includes('/') &&
      f !== 'README.md' &&
      !importantFiles.includes(f)
    )
    importantFiles.push(...rootFiles.slice(0, maxFiles - importantFiles.length))

    // ファイル内容を取得
    const fileContents = {}
    for (const filePath of importantFiles.slice(0, maxFiles)) {
      const content = await fetchFileContent(owner, repo, filePath)
      if (content) {
        fileContents[filePath] = content.substring(0, maxCharsPerFile)
      }
    }

    return {
      name: repoData.name,
      fullName: repoData.full_name,
      description: repoData.description || '',
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      language: repoData.language,
      languages: Object.keys(languages),
      topics: repoData.topics || [],
      homepage: repoData.homepage || '',
      createdAt: repoData.created_at,
      updatedAt: repoData.updated_at,
      files: fileContents,
      url: repoData.html_url
    }
  } catch (error) {
    throw new Error(`リポジトリ情報の取得に失敗しました: ${error.message}`)
  }
}

/**
 * MDファイルから記事を生成（テンプレートベース）
 */
function generateArticleFromMD(repoInfo, articleStyle = 'formal') {
  const { name, description, files, url, stars, language } = repoInfo

  // MDファイルの内容を整形
  const mdContent = Object.entries(files)
    .map(([path, content]) => `### ${path}\n\n${content.substring(0, 1000)}${content.length > 1000 ? '...' : ''}`)
    .join('\n\n')

  if (articleStyle === 'personal') {
    // 個人的な記事スタイル
    return generatePersonalArticle(repoInfo, mdContent)
  } else {
    // 正式な記事スタイル
    return generateFormalArticle(repoInfo, mdContent)
  }
}

/**
 * 正式な記事を生成（第三者視点）
 */
function generateFormalArticle(repoInfo, mdContent) {
  const { name, description, url, stars, language } = repoInfo

  return `# ${name} - ${description || 'GitHubプロジェクト紹介'}

## 概要

${name}は、${description || 'オープンソースプロジェクト'}です。

⭐ Stars: ${stars?.toLocaleString() || '0'} | 言語: ${language || '不明'}

## 主な特徴

${mdContent ? `
ドキュメントから読み取った主な特徴：

${mdContent}
` : 'このプロジェクトには詳細なドキュメントが含まれています。'}

## 使用シーン

このツールは以下のような場面で活用できます：

- 開発プロジェクトでの利用
- 学習・教育目的での活用
- 実務での効率化

## 技術的な特徴

- 使用言語: ${language || '各種言語'}
- GitHubでオープンソースとして公開
- コミュニティによる活発な開発

## まとめ

${name}は、${description || 'プロジェクト'}として注目に値するツールです。

詳細については、公式リポジトリをご確認ください。

🔗 リポジトリURL: ${url}

---

※この記事は、GitHubリポジトリの情報をもとに自動生成されました。
`
}

/**
 * 個人的な記事を生成（私視点）
 */
function generatePersonalArticle(repoInfo, mdContent) {
  const { name, description, url, stars, language } = repoInfo

  return `# ${name}を見つけた

## 発見のきっかけ

最近、GitHubでいろいろなプロジェクトを見ていて。

そんな中で「**${name}**」を見つけました。

${description ? `**「${description}」**` : ''}

この説明を見て、「あ、これ良さそう」って思ったんです。

⭐ ${stars?.toLocaleString() || '0'} stars | ${language || '言語情報なし'}

## どんなプロジェクト？

${mdContent ? `
ドキュメントを読んでみたら、こんな感じでした：

${mdContent}

なるほど、と思いました。
` : 'ドキュメントを見て、興味深いプロジェクトだと感じました。'}

## 私が注目したポイント

このプロジェクトで特に気になったのは：

- **使いやすさ**：シンプルで分かりやすい設計
- **実用性**：実際の開発で役立ちそう
- **コミュニティ**：活発に開発されている様子

## 実際に使ってみたい場面

想像してみました。

### 仕事で

プロジェクトの開発中に、このツールがあれば便利そう。

効率化できる部分がありそうです。

### 個人開発で

自分のプロジェクトでも試してみたい。

新しい技術を学ぶ良いきっかけになりそう。

## まとめ

${name}、すごく良さそう。

実際に使ってみたら、もっといろんな発見がありそうです。

近いうちに試してみます。

使ってみたら、また詳しく書きますね。

---

詳しくはこちら：
${url}

---

※この記事は、GitHubリポジトリの情報を見て書きました。
実際に使った体験談ではありませんが、興味を持った気持ちを素直に書いています。
`
}

/**
 * メイン関数：記事を生成
 */
export async function generateArticle(repoUrl, githubToken, articleStyle = 'formal') {
  // URLをパース
  const { owner, repo } = parseGitHubUrl(repoUrl)

  // リポジトリ情報を取得
  const repoInfo = await fetchRepoInfo(owner, repo)

  // MDファイルから記事を生成（テンプレートベース）
  const article = generateArticleFromMD(repoInfo, articleStyle)

  return article
}
