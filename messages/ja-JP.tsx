export default {
  "PageLayout": {
    "menuNames": {
      "download": "ダウンロード",
      "document": "ドキュメンテーション",
      "community": "コミュニティ"
    },
    "menuSubItems": {
      "download": {
        "vscodeExtension": "VSCode 拡張機能",
        "JSARCanary": "JSAR キャナリー"
      },
      "document": {
        "manual": "マニュアル",
        "apiReference": "API リファレンス",
        "publish": "公開",
        "playground": "プレイグラウンド"
      },
      "community": {
        "forum": "開発者フォーラム",
        "githubDiscussion": "GitHub ディスカッション"
      }
    },
    "footer": {
      "languages": "言語",
      "community": "コミュニティ"
    }
  },
  "LandingPage": {
    "title": "JSAR: 埋め込み可能な空間のためのWebランタイム",
    "features": [
      "Web 標準 API、TypeScript、Babylon.js をサポート",
      "空間ベースのセキュリティ、アプリケーションは空間分離フレームワークで実行され、お互いに干渉しない",
      "アプリケーションレイヤーを分離することで、ネイティブに近いレンダリング性能を実現"
    ],
    "tooltip": {
      "XSML": "拡張可能な空間マークアップ言語",
      "SCSS": "空間カスケーディングスタイルシート",
      "comingSoon": "近日公開"
    },
    "buttons": {
      "downloadVscodeExtension": "Visual Studio Code 拡張機能",
      "developerDocumentation": "開発者ドキュメンテーション",
      "learnMore": "詳細情報",
      "usingTypeScriptInJSAR": "JSARでTypeScriptを使用する",
      "usingBabylonInJSAR": "JSARでBabylon.jsを使用する",
      "applyForEarlyAccess": "早期アクセスの申し込み"
    },
    "intro": {
      "title": [
        "Webのように",
        "しかし、空間ミニアプリ用"
      ],
      "description": [
        "それは初期のWeb開発体験を復元し、見たままになります",
        "それは <tooltip>XSML</tooltip> を導入しています、これはコンポーネントの3D構造を記述するためのHTMLのようなマークアップ言語です。",
        "それは <tooltip >SCSS</tooltip> を導入しています、これはコンポーネントの3Dスタイルを記述するためのCSSのような言語です。",
        "同様に、JSARはスクリプト言語としてTypeScript / JavaScriptを使用します。"
      ]
    },
    "typescript": {
      "title": "TypeScript組み込み",
      "description": "JSARランタイムは、ミニアプリを実行する際にTypeScriptコードを直接解析できるため、開発者はTypeScriptコードをコンパイルせずに実行できます。",
      "features": [
        "簡単な設定でTypeScriptを使用できます",
        "Visual Studio CodeでTypeScriptのインテリジェントな提案を活用",
        "TypeScriptソースコードを使用してアプリケーションを公開し、追加のビルドは不要"
      ]
    },
    "babylonjs": {
      "title": "<link>Babylon.js</link>を使用する",
      "description": [
        "Babylon.jsは、複数のバックエンド（WebGL、WebGPU、サーバーサイド、ネイティブ）をサポートするオープンソースの3Dレンダリングエンジンです。3Dゲームとアプリケーションを開発するためのゲームシーンAPIを提供しています。",
        "JSARはBabylon.jsの一部のインターフェースを実装しており、開発者はBabylon.jsのAPIを直接使用できます（一部のサポートがあるかもしれません）。"
      ]
    },
    "unity": {
      "title": "<link>Unity</link>を使用して構築",
      "description": [
        "JSARを使用して開発された空間ミニアプリは、任意のUnityシーンで実行できます。JSAR UPM（Unity Package Manager）プラグインを提供しており、必要に応じて基本的なデータインターフェースを実装できます。これにより、UnityアプリケーションでJSAR空間ミニアプリを使用できます。"
      ]
    }
  },
  "ManualPages": {
    "version": "バージョン",
    "latest": "最新版",
  }
}
