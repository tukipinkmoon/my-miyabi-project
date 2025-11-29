// note記事テンプレート生成 - 詳細分析版

export function generateArticle(repoDataList) {
  // 配列でない場合（後方互換性）
  if (!Array.isArray(repoDataList)) {
    return generateSingleRepoArticle(repoDataList)
  }

  // 複数リポジトリの場合
  if (repoDataList.length === 1) {
    return generateSingleRepoArticle(repoDataList[0])
  }

  // 複数リポジトリをまとめた記事を生成
  return generateMultiRepoArticle(repoDataList)
}

// 単一リポジトリの記事生成
function generateSingleRepoArticle(repoData) {
  const { name, description, readme, url } = repoData

  // READMEを深く分析
  const analysis = deepAnalyzeReadme(readme, description)

  // 記事構造
  const intro = generateIntro(name, analysis)
  const whatItDoes = generateWhatItDoes(name, analysis)
  const howToUse = generateHowToUse(name, analysis)
  const benefits = generateBenefits(name, analysis)
  const scenarios = generateDetailedScenarios(name, analysis)
  const recommendations = generateRecommendations(analysis)

  return `# ${name}${analysis.catchphrase ? ` - ${analysis.catchphrase}` : ''}

${intro}

## ${name}って何？

${whatItDoes}

${analysis.mainFeatures.length > 0 ? `
## 具体的に何ができるの？

${analysis.mainFeatures.map((feature, i) => `
### ${feature.title}

${feature.explanation}

${feature.example ? `
**例えば：**
${feature.example}
` : ''}

${feature.benefit}

`).join('\n')}
` : ''}

${analysis.usageFlow.length > 0 ? `
## 使い方は？

${analysis.usageFlow.map((step, i) => `
**${i + 1}. ${step.action}**

${step.detail}
`).join('\n')}

${analysis.isEasy ? 'シンプルで使いやすそう。' : 'ステップが明確で分かりやすい。'}
` : ''}

${benefits}

${scenarios}

${analysis.uniqueness ? `
## 他と何が違うの？

${analysis.uniqueness}

これが、このツールの魅力だと思います。
` : ''}

${analysis.results.length > 0 ? `
## 使うとどうなる？

${analysis.results.map(r => `- ${r}`).join('\n')}

こういう変化が期待できそうです。
` : ''}

${recommendations}

## 使ってみたい

${name}、すごく良さそう。

${analysis.mainFeatures[0] ? `特に「${analysis.mainFeatures[0].title}」は、` : 'こういう機能は、'}
本当に便利だと思います。

${analysis.problemSolved ? `
${analysis.problemSolved}

これを解決してくれるツールって、なかなかないですよね。
` : ''}

実際に使ってみたら、もっといろんな発見がありそう。

近いうちに試してみます。

使ってみたら、また詳しく書きますね。

---

詳しくはこちら：
${url}

---

※この記事は、ツールの説明や情報を見て書きました。
実際に使った体験談ではありませんが、興味を持った気持ちを素直に書いています。
`
}

// READMEを深く分析
function deepAnalyzeReadme(readme, description) {
  if (!readme) {
    return {
      catchphrase: description || '',
      problemSolved: '',
      mainFeatures: [],
      usageFlow: [],
      benefits: [],
      results: [],
      beforeAfter: { before: '', after: '' },
      uniqueness: '',
      isEasy: true,
      examples: []
    }
  }

  return {
    catchphrase: extractCatchphrase(readme, description),
    problemSolved: extractProblemSolved(readme),
    mainFeatures: extractDetailedFeatures(readme),
    usageFlow: extractUsageFlow(readme),
    benefits: extractBenefits(readme),
    results: extractResults(readme),
    beforeAfter: extractBeforeAfter(readme),
    uniqueness: extractUniqueness(readme),
    isEasy: checkIfEasy(readme),
    examples: extractExamples(readme)
  }
}

// キャッチフレーズを抽出
function extractCatchphrase(readme, description) {
  if (description && description.length < 60) {
    return description
  }

  // README の最初の説明文を探す
  const lines = readme.split('\n')
  for (let i = 0; i < Math.min(15, lines.length); i++) {
    const line = lines[i].trim()
    // 見出しではなく、適度な長さの文
    if (!line.match(/^#/) && line.length > 20 && line.length < 100 && !line.match(/^[-*>`]/)) {
      return line.replace(/[*`]/g, '')
    }
  }

  return ''
}

// 解決する問題を抽出
function extractProblemSolved(readme) {
  const problemKeywords = [
    /(?:Problem|課題|問題|悩み)[:\s]+(.*?)(?:\n\n|##)/is,
    /(?:Why|なぜ|背景)[:\s]+(.*?)(?:\n\n|##)/is,
    /(?:Motivation|モチベーション|きっかけ)[:\s]+(.*?)(?:\n\n|##)/is
  ]

  for (const pattern of problemKeywords) {
    const match = readme.match(pattern)
    if (match) {
      return match[1].trim().split('\n')[0].substring(0, 200)
    }
  }

  return ''
}

// 詳細な機能を抽出
function extractDetailedFeatures(readme) {
  const features = []
  const lines = readme.split('\n')

  let inFeatureSection = false
  let currentFeature = null
  let collectingDescription = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Features セクションの開始
    if (line.match(/##?\s*(?:Features|機能|What|Highlights|Key Features|Main Features)/i)) {
      inFeatureSection = true
      continue
    }

    // セクション終了
    if (inFeatureSection && line.match(/^##[^#]/) && !line.match(/Features|機能/i)) {
      inFeatureSection = false
    }

    if (inFeatureSection) {
      // ### で始まる機能
      const headingMatch = line.match(/###\s+(.+)/)
      if (headingMatch) {
        if (currentFeature && features.length < 5) {
          features.push(currentFeature)
        }

        currentFeature = {
          title: headingMatch[1].replace(/[*`:#]/g, '').trim(),
          explanation: '',
          example: '',
          benefit: ''
        }
        collectingDescription = true
        continue
      }

      // 機能の説明を収集
      if (currentFeature && collectingDescription) {
        const trimmed = line.trim()

        // 説明文
        if (trimmed && !trimmed.match(/^[-*>`#]/) && !trimmed.match(/^```/)) {
          if (!currentFeature.explanation) {
            currentFeature.explanation = trimmed
          } else if (currentFeature.explanation.length < 300) {
            currentFeature.explanation += ' ' + trimmed
          }
        }

        // 箇条書きの例や詳細
        const bulletMatch = trimmed.match(/^[-*]\s+(.+)/)
        if (bulletMatch && currentFeature.explanation) {
          const bullet = bulletMatch[1].replace(/[*`]/g, '')
          if (!currentFeature.example && bullet.length < 100) {
            currentFeature.example = bullet
          } else if (!currentFeature.benefit && bullet.length < 100) {
            currentFeature.benefit = bullet
          }
        }
      }

      // 単独の箇条書き機能
      if (!currentFeature) {
        const bulletMatch = line.match(/^[-*]\s+(.+)/)
        if (bulletMatch && features.length < 5) {
          const text = bulletMatch[1].replace(/[*`]/g, '').trim()
          if (text.length > 15 && text.length < 150 && !text.match(/http|install|setup|clone/i)) {
            features.push({
              title: text,
              explanation: `${text}ができます。`,
              example: '',
              benefit: generateBenefitForFeature(text)
            })
          }
        }
      }
    }
  }

  // 最後の機能を追加
  if (currentFeature && features.length < 5) {
    features.push(currentFeature)
  }

  // 説明や利点を自動生成
  features.forEach(f => {
    if (!f.explanation || f.explanation === f.title) {
      f.explanation = `${f.title}という機能があります。`
    }
    if (!f.benefit) {
      f.benefit = generateBenefitForFeature(f.title)
    }
  })

  return features
}

// 使い方の流れを抽出
function extractUsageFlow(readme) {
  const flow = []
  const lines = readme.split('\n')

  let inUsageSection = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Usage/How to use セクション
    if (line.match(/##?\s*(?:Usage|How to|使い方|使用方法)/i)) {
      inUsageSection = true
      continue
    }

    if (inUsageSection && line.match(/^##[^#]/)) {
      break
    }

    if (inUsageSection && flow.length < 5) {
      // 番号付きリスト
      const numberedMatch = line.match(/^\d+\.\s+(.+)/)
      if (numberedMatch) {
        const text = numberedMatch[1].replace(/[*`]/g, '')
        if (!text.match(/install|setup|clone|npm|git/i)) {
          flow.push({
            action: text.split(/[:.]/)[0],
            detail: text
          })
        }
      }

      // ステップ形式
      const stepMatch = line.match(/(?:Step|ステップ)\s*\d+[:\s]+(.+)/i)
      if (stepMatch) {
        const text = stepMatch[1].replace(/[*`]/g, '')
        flow.push({
          action: text.split(/[:.]/)[0],
          detail: text
        })
      }
    }
  }

  return flow
}

// 利点・メリットを抽出
function extractBenefits(readme) {
  const benefits = []

  const benefitPatterns = [
    /(?:Benefits|メリット|利点)[:\s]+([\s\S]{0,500}?)(?=##|$)/i,
    /(?:Advantages|強み|特長)[:\s]+([\s\S]{0,500}?)(?=##|$)/i
  ]

  for (const pattern of benefitPatterns) {
    const match = readme.match(pattern)
    if (match) {
      const lines = match[1].split('\n')
      for (const line of lines) {
        const bulletMatch = line.match(/^[-*]\s+(.+)/)
        if (bulletMatch && benefits.length < 5) {
          const benefit = bulletMatch[1].replace(/[*`]/g, '').trim()
          if (benefit.length > 10 && benefit.length < 150) {
            benefits.push(benefit)
          }
        }
      }
    }
  }

  return benefits
}

// 結果・効果を抽出
function extractResults(readme) {
  const results = []

  // "できる"、"になる"、"可能" などの表現を探す
  const lines = readme.split('\n')
  for (const line of lines) {
    if (line.match(/[-*]\s+.*(?:できる|可能|になる|られる)/)) {
      const match = line.match(/[-*]\s+(.+)/)
      if (match && results.length < 5) {
        const result = match[1].replace(/[*`]/g, '').trim()
        if (result.length > 15 && result.length < 120 && !result.match(/install|setup|clone/i)) {
          results.push(result)
        }
      }
    }
  }

  return results
}

// Before/After を抽出
function extractBeforeAfter(readme) {
  const beforeMatch = readme.match(/(?:Before|従来|これまで)[:\s]+(.*?)(?:\n|$)/i)
  const afterMatch = readme.match(/(?:After|導入後|これから)[:\s]+(.*?)(?:\n|$)/i)

  return {
    before: beforeMatch ? beforeMatch[1].trim() : '',
    after: afterMatch ? afterMatch[1].trim() : ''
  }
}

// 独自性を抽出
function extractUniqueness(readme) {
  const uniquePatterns = [
    /(?:Unique|独自|特徴|違い)[:\s]+(.*?)(?:\n\n|##)/is,
    /(?:Why.*different|なぜ.*違う)[:\s]+(.*?)(?:\n\n|##)/is
  ]

  for (const pattern of uniquePatterns) {
    const match = readme.match(pattern)
    if (match) {
      return match[1].trim().split('\n')[0].substring(0, 200)
    }
  }

  return ''
}

// 使いやすさをチェック
function checkIfEasy(readme) {
  return readme.match(/easy|simple|シンプル|簡単|すぐ/i) !== null
}

// 実例を抽出
function extractExamples(readme) {
  const examples = []
  const exampleMatch = readme.match(/##?\s*(?:Example|例|デモ)([\s\S]{0,800}?)(?=##|$)/i)

  if (exampleMatch) {
    const lines = exampleMatch[1].split('\n')
    for (const line of lines) {
      const bulletMatch = line.match(/^[-*]\s+(.+)/)
      if (bulletMatch && examples.length < 3) {
        examples.push(bulletMatch[1].replace(/[*`]/g, '').trim())
      }
    }
  }

  return examples
}

// 導入部を生成
function generateIntro(name, analysis) {
  return `最近、いろいろなAIツールを見ていて。

そんな中で「**${name}**」を見つけました。

${analysis.catchphrase ? `
「${analysis.catchphrase}」

この説明を見て、「あ、これ良さそう」って思ったんです。` : '情報を見た瞬間、興味が湧きました。'}

${analysis.problemSolved ? `
${analysis.problemSolved}

こういう悩み、ありますよね。` : ''}`
}

// 「何をするツールか」を生成
function generateWhatItDoes(name, analysis) {
  if (analysis.mainFeatures.length === 0) {
    return `${name}は、AIを使った便利なツールです。`
  }

  const features = analysis.mainFeatures.slice(0, 3).map(f => f.title).join('、')
  return `${name}は、${features}などができるツールです。

${analysis.catchphrase || 'AIを使って、いろいろなことを助けてくれます。'}`
}

// 使い方を生成
function generateHowToUse(name, analysis) {
  if (analysis.usageFlow.length === 0) return ''

  return `## 使い方

${analysis.usageFlow.map((step, i) => `${i + 1}. ${step.detail}`).join('\n')}

${analysis.isEasy ? 'シンプルで分かりやすい。' : 'ステップが明確で使いやすそう。'}`
}

// メリットを生成
function generateBenefits(name, analysis) {
  if (analysis.benefits.length === 0 && analysis.results.length === 0) return ''

  const allBenefits = [...analysis.benefits, ...analysis.results].slice(0, 5)

  return `## ${name}のメリット

${allBenefits.map(b => `- ${b}`).join('\n')}

これだけのメリットがあるなら、使ってみる価値がありそうです。`
}

// 詳細なシナリオを生成
function generateDetailedScenarios(name, analysis) {
  if (analysis.mainFeatures.length === 0) return ''

  const feature1 = analysis.mainFeatures[0]
  const feature2 = analysis.mainFeatures[1] || analysis.mainFeatures[0]

  return `## 実際に使ったら

想像してみました。

### 朝の準備で

朝、時間がなくてバタバタ。

でも、${feature1.title}を使えば、
${feature1.benefit || 'もっとスムーズにできそう。'}

朝の時間を有効に使えるかも。

### 仕事中に

仕事していて、「もっと効率的にできないかな」って思う時。

${name}の${feature2.title}があれば、
${feature2.benefit || '時間を節約できそう。'}

他のことにも時間を使えるようになるかもしれない。

### 帰り道や休憩時間に

ちょっとした隙間時間。

スマホから使えたら、この時間も有効活用できそう。

${feature1.title}が、いつでもどこでも使えるのは便利。`
}

// おすすめを生成
function generateRecommendations(analysis) {
  if (analysis.mainFeatures.length === 0) {
    return `## こんな人におすすめ

- 時間を効率的に使いたい人
- 新しいAIツールを試したい人
- 便利なツールを探している人`
  }

  const f1 = analysis.mainFeatures[0]
  const f2 = analysis.mainFeatures[1] || analysis.mainFeatures[0]

  return `## こんな人におすすめ

- **${f1.title}が必要な人**
  ${f1.explanation}

- **時間を効率的に使いたい人**
  忙しくて時間がない方

- **${f2.title}を使いたい人**
  ${f2.explanation}

- **新しいツールに興味がある人**
  AIツールを試してみたい方`
}

// 機能から利点を生成
function generateBenefitForFeature(featureTitle) {
  const benefits = [
    '時間を節約できそう。',
    '効率的に作業できそう。',
    '便利に使えそう。',
    '役立ちそう。',
    '助かりそう。'
  ]
  return benefits[Math.floor(Math.random() * benefits.length)]
}


export function generateDetailedArticle(repoData) {
  const { name, description, readme, url } = repoData

  if (!readme) {
    return generateArticle(repoData)
  }

  // 深い分析
  const prerequisites = extractPrerequisites(readme, description)
  const shortcuts = extractShortcuts(readme)
  const features = extractVeryDetailedFeatures(readme)
  const installation = extractDetailedInstallation(readme)
  const problem = extractProblemContext(readme, description)
  const uniqueFeature = extractUniqueFeature(readme)
  const requirements = extractDetailedRequirements(readme)
  const benefits = extractAllBenefits(readme)

  return `# ${name}${description ? ` - ${description.substring(0, 60)}` : ''}

最近、いろいろなAIツールを見ていて。

そんな中で「**${name}**」を見つけました。

${description ? `
「${description}」

この説明を見て、「あ、これ良さそう」って思ったんです。` : '情報を見た瞬間、興味が湧きました。'}

${prerequisites.mainTool ? `
## ${prerequisites.mainTool}って何？

まず、前提として「${prerequisites.mainTool}」というツールがあります。

${prerequisites.mainToolDescription}

${prerequisites.hasMultipleModes ? `
でも、${prerequisites.mainTool}には「モード」っていう機能があって。

例えば：
${prerequisites.modesExample}

みたいに、いろんな使い方ができるんです。
` : ''}
` : ''}

${problem.exists ? `
## 問題：${problem.title}

${problem.description}

${problem.details}

これを何度もやるのは、時間がかかる。
` : ''}

## ${name}の登場

${problem.exists ? 'そこで、このツールの出番。' : ''}

**${name}**は、${generateToolPurpose(name, description, features, prerequisites)}

${description || features.overview}

これが、すごく便利そう。

## 具体的に何ができるの？

${features.detailed.map((feature, i) => `
### ${feature.title}

${feature.longDescription}

${feature.visualDescription || ''}

${feature.benefit}

${feature.technicalDetail || ''}
`).join('\n')}

${shortcuts.length > 0 ? `
### ショートカットキーで素早く起動

キーボードのショートカットで、すぐに起動できます。

${shortcuts.map(s => `**${s.key}**${s.description ? `：${s.description}` : ''}`).join('\n\n')}

マウスを使わなくても、キーボードだけで操作できる。

作業中に手を止めずに済むから、効率的。
` : ''}

${uniqueFeature.exists ? `
### ${uniqueFeature.title}

これが面白いんですけど。

${uniqueFeature.description}

${uniqueFeature.example}

${uniqueFeature.benefit}
` : ''}

${installation.steps.length > 0 ? `
## 使い方は？

**インストール：**
${installation.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

${installation.isSimple ? 'これだけ。シンプル。' : 'ステップが明確で分かりやすい。'}

${installation.usage.length > 0 ? `
**使う時：**
${installation.usage.map(u => `- **${u.action}**${u.key ? `：${u.key}` : ''}`).join('\n')}

覚えるショートカットは、これだけ。
` : ''}
` : ''}

## 実際に使ったら

想像してみました。

${generateVeryDetailedScenarios(name, features, prerequisites, shortcuts, uniqueFeature)}

${benefits.length > 0 ? `
## ${name}のメリット

${benefits.map(b => `- **${b.title || b.text}**${b.description ? `\n  ${b.description}` : ''}`).join('\n')}

これだけのメリットがあるなら、使ってみる価値がありそうです。
` : ''}

${requirements.detailed ? `
## 必要なもの

このツールを使うには：

${requirements.os ? `- **${requirements.os}**\n` : ''}${requirements.version ? `- **${requirements.version}**\n` : ''}${requirements.prerequisites.map(p => `- **${p.name}**${p.detail ? `：${p.detail}` : ''}`).join('\n')}

${requirements.prerequisites.length > 0 ? `
${requirements.prerequisites[0].name}を使っている人向けのツールです。
` : ''}
` : ''}

## こんな人におすすめ

このツール、特にこんな人におすすめだと思います。

${generateVeryDetailedRecommendations(features, prerequisites, name)}

## 使ってみたい

${name}、すごく良さそう。

${uniqueFeature.exists ? `
特に「${uniqueFeature.title}」は、本当に便利だと思います。

${uniqueFeature.description}

${uniqueFeature.benefit}
` : features.detailed[0] ? `
特に「${features.detailed[0].title}」は、本当に便利だと思います。

${features.detailed[0].longDescription}
` : ''}

${prerequisites.mainTool ? `
${prerequisites.mainTool}を使っている人なら、このツールは必須かもしれない。

${features.detailed[0] ? features.detailed[0].title : 'モードの切り替え'}が、こんなに簡単になるなら、作業効率が上がりそう。
` : ''}

実際に使ってみたら、もっといろんな発見がありそう。

近いうちに試してみます。

使ってみたら、また詳しく書きますね。

---

詳しくはこちら：
${url}

---

※この記事は、ツールの説明や情報を見て書きました。
実際に使った体験談ではありませんが、興味を持った気持ちを素直に書いています。
${prerequisites.mainTool ? `\n${prerequisites.mainTool}を使っている方なら、このツールは試してみる価値があると思います。` : ''}
`
}

// 前提ツールを抽出
function extractPrerequisites(readme, description) {
  const result = {
    mainTool: '',
    mainToolDescription: '',
    hasMultipleModes: false,
    modesExample: ''
  }

  // "for XXX"や"XXX launcher"などのパターン
  const forPattern = description?.match(/(?:for|with|using)\s+([A-Z][a-zA-Z]+)/i)
  if (forPattern) {
    result.mainTool = forPattern[1]
  }

  // READMEから前提ツールを探す
  const prereqMatch = readme.match(/(?:requires?|needs?|for|designed for)\s+\*?\*?([A-Z][a-zA-Z]+)\*?\*?/i)
  if (prereqMatch && !result.mainTool) {
    result.mainTool = prereqMatch[1]
  }

  // モードについての説明を探す
  if (readme.match(/modes?|profiles?/i)) {
    result.hasMultipleModes = true
    result.modesExample = `- 普通に文字起こしするモード
- 翻訳するモード
- 要約するモード`
  }

  // ツールの説明を生成
  if (result.mainTool) {
    if (result.mainTool.toLowerCase().includes('whisper')) {
      result.mainToolDescription = `これは、音声で文字を入力できるツール。

話すだけで、文字が入力される。便利ですよね。`
    } else {
      result.mainToolDescription = `このツールを使うと、いろいろなことができます。`
    }
  }

  return result
}

// ショートカットキーを抽出
function extractShortcuts(readme) {
  const shortcuts = []
  const lines = readme.split('\n')

  for (const line of lines) {
    // "Cmd+X", "Option+V", "Ctrl+Alt+P" などのパターン
    const shortcutPattern = /(?:^[-*]\s+)?([A-Z][a-z]+\+[A-Za-z0-9-]+(?:\+[A-Za-z]+)?)[:\s]+(.{0,100})/g
    let match

    while ((match = shortcutPattern.exec(line)) !== null) {
      if (shortcuts.length < 10) {
        shortcuts.push({
          key: match[1],
          description: match[2].trim().replace(/[:\s]*$/, '')
        })
      }
    }
  }

  return shortcuts
}

// 非常に詳細な機能抽出
function extractVeryDetailedFeatures(readme) {
  const features = {
    overview: '',
    detailed: []
  }

  const lines = readme.split('\n')
  let inFeatureSection = false
  let currentFeature = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Features セクション
    if (line.match(/##?\s*(?:Features|機能|Highlights|Key Features)/i)) {
      inFeatureSection = true
      continue
    }

    if (inFeatureSection && line.match(/^##[^#]/) && !line.match(/Features/i)) {
      inFeatureSection = false
    }

    if (inFeatureSection) {
      // ### 見出し
      const headingMatch = line.match(/###\s+(.+)/)
      if (headingMatch) {
        if (currentFeature && features.detailed.length < 8) {
          features.detailed.push(currentFeature)
        }

        currentFeature = {
          title: headingMatch[1].replace(/[*`:#🎨📱⚙️✨🔧🎯]/g, '').trim(),
          longDescription: '',
          visualDescription: '',
          benefit: '',
          technicalDetail: ''
        }

        // 次の数行を詳細説明として収集
        let descLines = []
        for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
          if (lines[j].match(/^###/) || lines[j].match(/^##[^#]/)) break

          const trimmed = lines[j].trim()
          if (trimmed && !trimmed.match(/^[-*>`#]/) && !trimmed.match(/^```/)) {
            descLines.push(trimmed)
          }
        }

        if (descLines.length > 0) {
          currentFeature.longDescription = descLines.join(' ').substring(0, 400)
          currentFeature.benefit = generateDetailedBenefit(currentFeature.title)
        } else {
          currentFeature.longDescription = `${currentFeature.title}ができます。`
          currentFeature.benefit = '便利そうですよね。'
        }

        continue
      }

      // 箇条書き
      const bulletMatch = line.match(/^[-*]\s+(.+)/)
      if (bulletMatch && features.detailed.length < 8) {
        const text = bulletMatch[1].replace(/[*`]/g, '').trim()
        if (text.length > 15 && text.length < 150 && !text.match(/install|setup|clone/i)) {
          features.detailed.push({
            title: text.split(/[:.]/)[0],
            longDescription: text,
            visualDescription: '',
            benefit: generateDetailedBenefit(text),
            technicalDetail: ''
          })
        }
      }
    }
  }

  if (currentFeature && features.detailed.length < 8) {
    features.detailed.push(currentFeature)
  }

  // 視覚的な説明を追加
  features.detailed.forEach(f => {
    if (f.title.match(/tile|visual|display|UI|画面/i)) {
      f.visualDescription = 'どのモードがあるか、一目でわかる。\n\n今どのモードが有効になっているかも、緑色でハイライトされるから分かりやすい。\n\n視覚的に見えるって、大事ですよね。'
    } else if (f.title.match(/drag|drop|並び替え|reorder/i)) {
      f.visualDescription = 'よく使うモードを上に持ってきたり。\n\n自分の使いやすいように、カスタマイズできる。\n\nこれ、地味だけど便利。'
    } else if (f.title.match(/icon|emoji|アイコン/i)) {
      f.visualDescription = '例えば：\n- 翻訳モードに🌐\n- 要約モードに📝\n- メモモードに✏️\n\nこういう風に、分かりやすくできる。'
    }
  })

  return features
}

// 詳細なインストール手順
function extractDetailedInstallation(readme) {
  const result = {
    steps: [],
    usage: [],
    isSimple: true
  }

  const lines = readme.split('\n')
  let inInstallSection = false
  let inUsageSection = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Installation セクション
    if (line.match(/##?\s*(?:Installation|Install|Getting Started|Setup)/i)) {
      inInstallSection = true
      inUsageSection = false
      continue
    }

    // Usage セクション
    if (line.match(/##?\s*(?:Usage|How to|Basic Usage)/i)) {
      inInstallSection = false
      inUsageSection = true
      continue
    }

    if (line.match(/^##[^#]/)) {
      inInstallSection = false
      inUsageSection = false
    }

    if (inInstallSection && result.steps.length < 5) {
      const numberedMatch = line.match(/^\d+\.\s+(.+)/)
      if (numberedMatch) {
        const step = numberedMatch[1].trim()
        if (!step.match(/npm|git clone|yarn/i)) {
          result.steps.push(step)
        }
      }
    }

    if (inUsageSection && result.usage.length < 6) {
      const shortcutMatch = line.match(/[-*]\s+\*?\*?([A-Z][a-z]+\+[A-Za-z0-9-]+)\*?\*?[:\s]+(.+)/)
      if (shortcutMatch) {
        result.usage.push({
          action: shortcutMatch[2].trim(),
          key: shortcutMatch[1]
        })
      }
    }
  }

  result.isSimple = result.steps.length <= 3

  return result
}

// 問題コンテキストを抽出
function extractProblemContext(readme, description) {
  const result = {
    exists: false,
    title: '',
    description: '',
    details: ''
  }

  // "switching modes"や"mode management"などのパターン
  if (description?.match(/launcher|switcher|manager/i) || readme.match(/switch|切り替え|manage/i)) {
    result.exists = true
    result.title = '切り替えが面倒'
    result.description = 'ただ、複数のモードを使い分けるのが、ちょっと面倒だったみたい。'
    result.details = 'モードを切り替えるたびに、設定を開いて、選んで...'
  }

  return result
}

// ユニークな機能を抽出
function extractUniqueFeature(readme) {
  const result = {
    exists: false,
    title: '',
    description: '',
    example: '',
    benefit: ''
  }

  // "ProcessAgain"や特徴的な機能を探す
  const lines = readme.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.match(/ProcessAgain|Reprocess|再処理/i)) {
      result.exists = true
      result.title = 'ProcessAgain機能'
      result.description = '**Option+P**を押すと、前回の音声をもう一度処理できるんです。'
      result.example = `例えば：
- さっき普通に文字起こししたけど、やっぱり翻訳したい
- 要約モードで処理し直したい

こういう時に、もう一度喋り直さなくていい。

前回の音声を、別のモードで処理し直せる。`
      result.benefit = 'これ、すごく便利じゃないですか？'
      break
    }
  }

  return result
}

// 詳細な必要条件を抽出
function extractDetailedRequirements(readme) {
  const result = {
    detailed: false,
    os: '',
    version: '',
    prerequisites: []
  }

  // OS情報
  const osMatch = readme.match(/(?:macOS|Windows|Linux|iOS|Android)\s*([\d.]+)?\s*(?:以降|or later|以上|\+)?/gi)
  if (osMatch && osMatch.length > 0) {
    result.os = osMatch[0]
    result.detailed = true
  }

  // Apple Silicon対応
  if (readme.match(/Apple Silicon|M1|M2|M3/i)) {
    result.os += ' (M1/M2/M3対応)'
  }

  // 前提ツール
  const prereqPattern = readme.match(/(?:requires?|needs?)\s+([A-Z][a-zA-Z]+)/gi)
  if (prereqPattern) {
    prereqPattern.forEach(p => {
      const toolMatch = p.match(/([A-Z][a-zA-Z]+)/)
      if (toolMatch && result.prerequisites.length < 3) {
        result.prerequisites.push({
          name: toolMatch[1],
          detail: '事前にインストール必要'
        })
        result.detailed = true
      }
    })
  }

  return result
}

// すべてのメリットを抽出
function extractAllBenefits(readme) {
  const benefits = []

  // ショートカットキー
  if (readme.match(/hotkey|shortcut|ショートカット/i)) {
    benefits.push({
      title: '視覚的に分かりやすい',
      text: '視覚的に分かりやすい',
      description: 'タイル表示で一目瞭然'
    })
    benefits.push({
      title: '素早く切り替え',
      text: '素早く切り替え',
      description: 'ワンクリック、またはショートカット'
    })
  }

  // カスタマイズ
  if (readme.match(/custom|カスタマイズ|設定/i)) {
    benefits.push({
      title: 'カスタマイズ自由',
      text: 'カスタマイズ自由',
      description: 'アイコン、並び順、ホットキー'
    })
  }

  // キーボード操作
  if (readme.match(/keyboard|キーボード/i)) {
    benefits.push({
      title: 'キーボード操作',
      text: 'キーボード操作',
      description: 'マウス不要で効率的'
    })
  }

  // 日本語対応
  if (readme.match(/日本語|Japanese/i)) {
    benefits.push({
      title: '日本語対応',
      text: '日本語対応',
      description: '日本語と英語に対応'
    })
  }

  return benefits
}

// ツールの目的を生成
function generateToolPurpose(name, description, features, prerequisites) {
  if (prerequisites.mainTool && description?.match(/launcher/i)) {
    return `${prerequisites.mainTool}のモードを簡単に切り替えられるようにしてくれるツールです。

視覚的にタイル状で表示されて、ワンクリックで切り替えられる。`
  }

  return description || '便利なツールです。'
}

// 詳細な利点を生成
function generateDetailedBenefit(featureTitle) {
  const benefits = [
    '時間を節約できそう。',
    '効率的に作業できそう。',
    '便利に使えそう。',
    'すごく助かりそう。',
    'これは嬉しい機能。'
  ]
  return benefits[Math.floor(Math.random() * benefits.length)]
}

// 超詳細なシナリオ生成
function generateVeryDetailedScenarios(name, features, prerequisites, shortcuts, uniqueFeature) {
  const scenarios = []

  // 仕事中のシナリオ
  if (prerequisites.mainTool) {
    scenarios.push(`### 仕事中に

仕事していて、会議の議事録を取る時。

普通に文字起こしモードで録音。

でも、後から「やっぱり要約も欲しいな」って思った時。

${uniqueFeature.exists && uniqueFeature.title === 'ProcessAgain機能' ? `
**Option+P**を押すだけで、さっきの会議を要約モードで処理し直せる。

もう一度会議をする必要はない。

これ、めちゃくちゃ便利。` : `
${name}を使えば、すぐにモードを切り替えられる。

時間を節約できそう。`}`)
  }

  // 勉強中のシナリオ
  scenarios.push(`### 勉強中に

英語の文章を読んでいて、日本語に翻訳したい時。

英語を読み上げて、翻訳モードで処理。

日本語になって出てくる。

モードの切り替えが、${shortcuts[0] ? shortcuts[0].key : 'ショートカット'}からワンクリック。

いちいち設定を開かなくていいから、スムーズ。`)

  // メモを取るシナリオ
  if (shortcuts.length > 0) {
    const shortcut = shortcuts.find(s => s.key.match(/Cmd\+\d/)) || shortcuts[0]
    scenarios.push(`### メモを取る時

思いついたアイデアを、すぐメモしたい。

**${shortcut.key}**でメモモードを起動。

話すだけで、メモが取れる。

キーボードを打つより、ずっと早い。

しかも、手がふさがっていても大丈夫。`)
  }

  // 複数モード切り替えシナリオ
  if (features.detailed.length > 1) {
    scenarios.push(`### 複数のモードを使い分ける時

朝：翻訳モードで英語ニュースを読む

昼：会議の議事録を文字起こしモード

夕方：今日のタスクを要約モードでまとめる

こういう風に、一日の中で複数のモードを使い分ける。

従来なら、その都度設定を開いて切り替えていた。

でも、${name}があれば、ワンクリック。

時間の節約になる。`)
  }

  return scenarios.join('\n\n')
}

// 超詳細なおすすめ生成
function generateVeryDetailedRecommendations(features, prerequisites, name) {
  const recommendations = []

  if (prerequisites.mainTool) {
    recommendations.push(`- **${prerequisites.mainTool}を使っている人**
  複数のモードを使い分けている方`)
  }

  if (features.detailed[0]) {
    recommendations.push(`- **音声入力をよく使う人**
  文字起こし、翻訳、要約などを頻繁にする方`)
  }

  recommendations.push(`- **効率を求める人**
  少しでも時間を節約したい方`)

  recommendations.push(`- **ショートカットキー好きな人**
  キーボード操作で素早く作業したい方`)

  recommendations.push(`- **カスタマイズ好きな人**
  自分好みにツールを調整したい方`)

  return recommendations.join('\n\n')
}


export function customizeArticle(article, customizations) {
  let result = article
  if (customizations.intro) {
    result = customizations.intro + '\n\n' + result
  }
  return result
}

// 複数リポジトリをまとめた記事を生成
function generateMultiRepoArticle(repoDataList) {
  const repoNames = repoDataList.map(r => r.name).join('、')
  const totalStars = repoDataList.reduce((sum, r) => sum + (r.stars || 0), 0)

  // 導入部
  const intro = `最近、いろいろなAIツールを見ていて。

今回は、${repoDataList.length}つの興味深いツールを見つけたので、まとめて紹介します。

どれも魅力的で、使ってみたくなるものばかり。`

  // 各リポジトリの紹介セクション
  const repoSections = repoDataList.map((repoData, index) => {
    const { name, description, readme, url, stars, language } = repoData
    const analysis = deepAnalyzeReadme(readme, description)

    return `
## ${index + 1}. ${name}

${description ? `**${description}**` : ''}

${analysis.catchphrase && analysis.catchphrase !== description ? `「${analysis.catchphrase}」` : ''}

${stars ? `⭐ ${stars.toLocaleString()} stars` : ''}${language ? ` | 言語: ${language}` : ''}

### どんなツール？

${generateWhatItDoes(name, analysis)}

${analysis.mainFeatures.length > 0 ? `
### 主な機能

${analysis.mainFeatures.slice(0, 3).map((feature, i) => `
**${feature.title}**

${feature.explanation}

${feature.benefit}
`).join('\n')}
` : ''}

${analysis.usageFlow.length > 0 ? `
### 使い方

${analysis.usageFlow.slice(0, 3).map((step, i) => `${i + 1}. ${step.detail}`).join('\n')}

${analysis.isEasy ? 'シンプルで使いやすそう。' : ''}
` : ''}

### こんな人におすすめ

${analysis.mainFeatures[0] ? `- ${analysis.mainFeatures[0].title}が必要な人` : '- 効率的に作業したい人'}
- 新しいツールを試したい人
- 時間を節約したい人

**詳しくはこちら：** ${url}

---
`
  }).join('\n')

  // まとめ
  const conclusion = `
## まとめ

今回紹介した${repoDataList.length}つのツール、どれも魅力的でした。

${repoDataList.map((r, i) => `${i + 1}. **${r.name}** - ${r.description || 'AI活用ツール'}`).join('\n')}

どれか1つでも、あなたの役に立ちそうなツールがあれば嬉しいです。

実際に使ってみて、また詳しくレビューしたいと思います。

---

※この記事は、各ツールの説明や情報を見て書きました。
実際に使った体験談ではありませんが、興味を持った気持ちを素直に書いています。`

  return `# ${repoDataList.length}つの便利なAIツールを見つけた

${intro}

${repoSections}

${conclusion}`
}
