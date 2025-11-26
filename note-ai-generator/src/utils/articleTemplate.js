// note記事テンプレート生成

export function generateArticle(repoData) {
  const { name, description, readme, owner, topics } = repoData

  // READMEから主要な機能を抽出（簡易版）
  const features = extractFeatures(readme)

  return `# ${name}を見つけました

最近、ふと思うんです。

AIツールがこんなに増えて、でも実際に全部試すのは難しくて。
本当に自分に合うものを見つけるのって、意外と大変だなって。

そんな時、GitHubを見ていたら素敵なツールに出会いました。

## ${name}との出会い

${owner.login}さんが作られた「${name}」というツール。

${description ? `「${description}」` : 'README を読んだ瞬間、「これは！」と思いました。'}

設計書を見てみると...

なんというか、開発者の方の思いが伝わってくるんです。

${features.length > 0 ? `
## こんな機能があるみたい

READMEから読み取れる主な機能：

${features.map(f => `- ${f}`).join('\n')}

` : ''}

まるで、私が「こんな機能があったらいいな」って思っていたことを、
先回りして形にしてくれたみたいな。

## もし使うとしたら...

想像してみました。

もし私がこのツールを使うとしたら、きっと...

朝のあの時間に。
いつも「時間がないな」って思っているあの瞬間に。

このツールがあれば、もっとスムーズにできるんじゃないかな。

帰り道、ふと思いついたアイデアも、
家に着く前に形にできるかもしれない。

## 開発者の思い

${topics.length > 0 ? `
このツールは${topics.slice(0, 3).join('、')}といった技術で作られているそうです。` : ''}

GitHubのページを見ていると、
一つ一つの機能に、こだわりを感じるんです。

「使う人のことを、本当に考えているんだな」って。

そういうツールって、使う前からワクワクしますよね。

## まとめ

まだ実際には使っていないけれど、
設計書を読んだだけで、もう期待感でいっぱいです。

こういう、「誰かの困りごとを解決したい」という思いから生まれたツールに出会えると、
なんだか嬉しくなります。

${owner.login}さん、素敵なツールを作ってくれてありがとうございます。

近いうちに、実際に使ってみたいと思います。

---

**リポジトリ:** ${repoData.url}

※この記事は設計書やREADMEを読んで書いた紹介記事です。実際の使用感は、ツールを試してからまた記事にしますね。
`
}

function extractFeatures(readme) {
  if (!readme) return []

  const features = []
  const lines = readme.split('\n')

  // 箇条書きの項目を抽出（簡易版）
  for (const line of lines) {
    if (line.trim().match(/^[-*]\s+(.+)/) && line.length < 100) {
      const match = line.trim().match(/^[-*]\s+(.+)/)
      if (match && !match[1].includes('[') && !match[1].includes('http')) {
        features.push(match[1])
        if (features.length >= 5) break
      }
    }
  }

  return features
}

export function customizeArticle(article, customizations) {
  let result = article

  // ユーザーのカスタマイズを適用
  if (customizations.intro) {
    result = customizations.intro + '\n\n' + result
  }

  if (customizations.tone === 'casual') {
    result = result.replace(/です。/g, 'だと思います。')
    result = result.replace(/ます。/g, 'ますね。')
  }

  return result
}
