export default {
  "PageLayout": {
    "menuNames": {
      "download": "ダウンロード",
      "document": "ドキュメント",
      "community": "コミュニティ"
    },
    "menuSubItems": {
      "download": {
        "vscodeExtension": "VSCode 拡張機能",
        "JSARCanary": "JSAR キャナリー"
      },
      "document": {
        "manual": "開発者ガイド",
        "apiReference": "API ドキュメント",
        "publish": "公開",
        "playground": "オンライン体験"
      },
      "community": {
        "forum": "開発者フォーラム",
        "githubDiscussion": "GitHub ディスカッション"
      }
    }
  },
  "LandingPage": {
    "title": "スペースミニアプリ：スペースに埋め込めるWebランタイム",
    "features": [
      "Web標準API、TypeScript、Babylon.jsをサポート",
      "スペースランタイムで実行され、相互に干渉しないスペースミニアプリ",
      "アプリケーション層とレンダリング層のコードロジックを分離し、ネイティブに近いレンダリング性能を実現"
    ],
    "tooltip": {
      "XSML": "拡張可能な空間マークアップ言語（Extensible Spatial Marked Language）",
      "SCSS": "スペースカスケーディングスタイルシート（Spatial Cascading Style Sheets）"
    },
    "buttons": {
      "downloadVscodeExtension": "VSCode 拡張機能をダウンロード",
      "developerDocumentation": "開発者ドキュメント",
      "learnMore": "詳細を見る",
      "usingTypeScriptInJSAR": "JSARでTypeScriptを使用する",
      "usingBabylonInJSAR": "JSARでBabylon.jsを使用する",
      "applyForEarlyAccess": "JSAR UPMの早期アクセスを申請する"
    },
    "intro": {
      "title": [
        "Webと同様",
        "ただし、スペースミニアプリの開発用"
      ],
      "description": [
        "スペースミニアプリは、最初のWeb開発体験を再現し、見たままになります。",
        "<tooltip>XSML</tooltip>というHTMLに似た言語を導入し、コンポーネントのスペース構造を記述します。",
        "<tooltip>SCSS</tooltip>と呼ばれるCSSに似た言語も導入され、コンポーネントのスペーススタイルを記述します。",
        "同様に、JSARではスペースミニアプリのスクリプト言語としてTypeScript/JavaScriptが使用されます。"
      ]
    },
    "typescript": {
      "title": "組み込みのTypeScript",
      "description": "JSARランタイムは、ミニアプリを実行する際にTypeScriptコードを直接解析できるため、開発者はTypeScriptコードをコンパイルせずに実行できます。",
      "features": [
        "簡単な設定でTypeScriptを使用できます",
        "Visual Studio CodeでTypeScriptのインテリジェントな提案を活用",
        "TypeScriptソースコードを使用してアプリケーションを公開し、追加のビルドは不要"
      ]
    },
  }
}
