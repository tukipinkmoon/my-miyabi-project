# おもいで写真 - 技術仕様書

## 🏗️ アーキテクチャ

```
┌─────────────────────────────────────────┐
│         フロントエンド（React）          │
│  - 写真アップロード                      │
│  - プレビュー表示                        │
│  - メッセージ編集UI                      │
└─────────────────┬───────────────────────┘
                  │
                  │ REST API / WebSocket
                  │
┌─────────────────▼───────────────────────┐
│        バックエンド（Serverless）        │
│  - 画像処理API                           │
│  - AI処理オーケストレーション            │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┴──────────┐
        │                    │
┌───────▼────────┐  ┌────────▼────────┐
│  Claude API    │  │   D-ID API      │
│ (メッセージ生成)│  │ (顔アニメーション)│
└────────────────┘  └─────────────────┘
        │                    │
        │           ┌────────▼────────┐
        │           │  ElevenLabs     │
        └───────────►  (音声合成)      │
                    └─────────────────┘
```

---

## 🔧 技術スタック詳細

### フロントエンド

#### Phase 1: Webアプリ（プロトタイプ）
```javascript
// package.json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.3.0",      // シンプルなスタイリング
    "@mediapipe/face_detection": "^0.4.1646425229",  // 顔検出
    "axios": "^1.6.0",             // API通信
    "react-dropzone": "^14.2.0"    // ファイルアップロード
  }
}
```

**主な画面:**
1. ホーム画面（写真選択ボタン）
2. 写真プレビュー画面（顔検出結果表示）
3. メッセージ編集画面
4. 動画生成・プレビュー画面
5. 完成動画表示・保存画面

---

### バックエンド

#### API Endpoints

```
POST /api/detect-face
- 入力: 画像ファイル
- 処理: 顔検出
- 出力: 顔の位置、数、信頼度

POST /api/generate-message
- 入力: 画像データ、顔の情報（年齢推定、性別など）
- 処理: Claude APIでメッセージ生成
- 出力: 提案メッセージ（3パターン）

POST /api/create-video
- 入力: 画像、メッセージテキスト
- 処理:
  1. 音声合成（ElevenLabs）
  2. 顔アニメーション（D-ID）
  3. 動画生成
- 出力: 動画URL（一時的）

GET /api/video/:id
- 動画のダウンロード
```

---

## 🤖 AI処理の詳細

### 1. 顔検出（MediaPipe）

```javascript
// フロントエンドで実行（プライバシー保護）
import { FaceDetection } from '@mediapipe/face_detection';

const detectFace = async (imageFile) => {
  const faceDetection = new FaceDetection({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
    }
  });

  faceDetection.setOptions({
    model: 'short',  // 近距離モデル（写真向け）
    minDetectionConfidence: 0.5
  });

  const results = await faceDetection.send({ image: imageFile });
  return results.detections;
};
```

### 2. メッセージ生成（Claude API）

```javascript
// バックエンドで実行
const generateMessage = async (imageData, faceInfo) => {
  const prompt = `
あなたは思い出の写真から温かいメッセージを生成するAIです。

写真の情報:
- 推定年代: ${faceInfo.estimatedAge}代
- 写真の雰囲気: ${faceInfo.mood}
- 白黒/カラー: ${imageData.isColor ? 'カラー' : '白黒'}

この写真の人物が、今を生きる誰かに向けて話しかけるとしたら、
どんな温かく、心に響く言葉をかけるでしょうか。

以下の3パターンでメッセージを生成してください:
1. 短く優しい言葉（10-15文字）
2. 励ましの言葉（20-30文字）
3. 思い出を語る言葉（30-40文字）

70代の方が聞いて心温まる、シンプルで美しい日本語で。
  `;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: prompt
    }]
  });

  return parseMessages(response.content);
};
```

### 3. 音声合成（ElevenLabs）

```javascript
const generateVoice = async (text, voiceSettings) => {
  const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/{voice_id}', {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': process.env.ELEVENLABS_API_KEY
    },
    body: JSON.stringify({
      text: text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.7,
        similarity_boost: 0.8,
        style: 0.3,  // 温かみのある声
        use_speaker_boost: true
      }
    })
  });

  return await response.arrayBuffer();
};
```

### 4. 顔アニメーション（D-ID）

```javascript
const createTalkingPhoto = async (imageUrl, audioUrl) => {
  // Step 1: トーク作成
  const response = await fetch('https://api.d-id.com/talks', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${process.env.DID_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      source_url: imageUrl,
      script: {
        type: 'audio',
        audio_url: audioUrl
      },
      config: {
        fluent: true,
        pad_audio: 0,
        stitch: true  // シームレスな動き
      }
    })
  });

  const { id } = await response.json();

  // Step 2: 処理完了を待つ
  let video_url;
  while (!video_url) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const statusResponse = await fetch(`https://api.d-id.com/talks/${id}`, {
      headers: {
        'Authorization': `Basic ${process.env.DID_API_KEY}`
      }
    });
    const data = await statusResponse.json();

    if (data.status === 'done') {
      video_url = data.result_url;
    } else if (data.status === 'error') {
      throw new Error('Video generation failed');
    }
  }

  return video_url;
};
```

---

## 🎨 UIデザイン原則

### 高齢者向けデザイン

1. **大きなボタン**
   - 最小サイズ: 60x60px
   - タップしやすい余白

2. **読みやすいフォント**
   - フォントサイズ: 最小18px
   - ゴシック体（Noto Sans JP）
   - 高コントラスト

3. **シンプルな言葉**
   - 「アップロード」→「写真を選ぶ」
   - 「生成」→「作る」
   - 「ダウンロード」→「保存する」

4. **視覚的フィードバック**
   - ローディング中は大きなアニメーション
   - 成功時は✓マーク
   - エラー時は優しい言葉で説明

5. **ステップ表示**
   ```
   ① 写真を選ぶ → ② メッセージ → ③ 動画を作る
       ●              ○              ○
   ```

---

## 📱 レスポンシブデザイン

```css
/* モバイルファースト */
.container {
  padding: 20px;
  max-width: 100%;
}

.button {
  width: 100%;
  min-height: 60px;
  font-size: 20px;
}

/* タブレット以上 */
@media (min-width: 768px) {
  .container {
    max-width: 600px;
    margin: 0 auto;
  }

  .button {
    width: auto;
    min-width: 200px;
  }
}
```

---

## 🔒 セキュリティ・プライバシー

### 画像処理のフロー

1. **アップロード**
   - HTTPS通信のみ
   - ファイルサイズ制限: 10MB
   - 対応形式: JPEG, PNG

2. **処理**
   - 一時ストレージ（メモリ内）
   - 処理完了後すぐ削除
   - ログに画像データを残さない

3. **動画生成**
   - 一時URL（24時間で失効）
   - ユーザーがダウンロード後、サーバーから削除

4. **データ保持**
   - サーバーには一切保存しない
   - ユーザーのデバイスにのみ保存

---

## 💰 コスト最適化

### API使用量の目安

1動画あたり:
- Claude API: ~$0.02（メッセージ生成）
- ElevenLabs: ~$0.05（音声合成）
- D-ID: ~$0.20（顔アニメーション）
- **合計: ~$0.27/動画**

月100動画で約$27
月1000動画で約$270

### 最適化案
1. キャッシング（同じ写真の再利用）
2. バッチ処理（複数リクエストをまとめる）
3. 無料枠の活用
4. オープンソース代替の検討（LivePortrait, Coqui TTS）

---

## 🚀 デプロイ戦略

### Phase 1: プロトタイプ
- Vercel（フロントエンド）
- Cloudflare Workers（API）
- 無料枠で運用

### Phase 2: 本番環境
- Vercel Pro（$20/月）
- AWS Lambda + S3
- CloudFront（CDN）

---

## 📊 モニタリング

### 追跡する指標
- 動画生成成功率
- 平均処理時間
- エラー発生率
- ユーザー満足度

### ツール
- Sentry（エラートラッキング）
- Google Analytics（利用状況）
- CloudWatch（サーバー監視）

---

**最終更新: 2025-11-24**
