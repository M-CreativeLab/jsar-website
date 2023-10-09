export default {
  "PageLayout": {
    "menuNames": {
      "download": "下載",
      "document": "文檔",
      "community": "社群"
    },
    "menuSubItems": {
      "download": {
        "vscodeExtension": "VSCode 擴充套件",
        "JSARCanary": "JSAR 測試版"
      },
      "document": {
        "manual": "手冊",
        "apiReference": "API 參考",
        "publish": "發佈",
        "playground": "線上體驗"
      },
      "community": {
        "forum": "開發者論壇",
        "githubDiscussion": "GitHub 討論區"
      }
    },
    "footer": {
      "languages": "語言",
      "community": "社群"
    }
  },
  "LandingPage": {
    "title": "JSAR：可嵌入空間的 Web 執行時",
    "features": [
      "支援 Web 標準 API、TypeScript 和 Babylon.js",
      "空間安全性，應用程式在空間隔離框架中運行，互不干擾",
      "透過分離應用程式層實現接近原生的渲染效能"
    ],
    "tooltip": {
      "XSML": "可擴展空間標記語言",
      "SCSS": "空間層疊樣式表",
      "comingSoon": "即將推出"
    },
    "buttons": {
      "downloadVscodeExtension": "Visual Studio Code 擴充套件",
      "developerDocumentation": "開發者文件",
      "learnMore": "了解更多",
      "usingTypeScriptInJSAR": "在 JSAR 中使用 TypeScript",
      "usingBabylonInJSAR": "在 JSAR 中使用 Babylon.js",
      "applyForEarlyAccess": "申請早期存取"
    },
    "intro": {
      "title": [
        "類似 Web",
        "但針對空間小應用"
      ],
      "description": [
        "它恢復了最初的 Web 開發體驗，以所見即所得的方式呈現",
        "引入了 <tooltip>XSML</tooltip>，這是一種類似 HTML 的標記語言，用於描述 3D 空間結構。",
        "引入了 <tooltip >SCSS</tooltip>，這是一種類似 CSS 的語言，用於描述 3D 空間的風格。",
        "同樣地，JSAR 使用 TypeScript / JavaScript 作為腳本語言。"
      ]
    },
    "typescript": {
      "title": "內建 TypeScript",
      "description": "JSAR 執行時在執行小應用程式時，可直接解析 TypeScript 代碼，因此開發者無需任何編譯或配置。",
      "features": [
        "使用簡單的一步配置使用 TypeScript",
        "在 Visual Studio Code 中享受 TypeScript 的智慧建議",
        "使用 TypeScript 原始碼發佈應用程式，無需額外建置"
      ]
    },
    "babylonjs": {
      "title": "使用 <link>Babylon.js</link>",
      "description": [
        "Babylon.js 是一個開源的 3D 渲染引擎，支援多個後端（WebGL、WebGPU、伺服器端和本地端）。它提供了一系列的遊戲場景 API，可用於開發 3D 遊戲和應用程式。",
        "JSAR 實現了 Babylon.js <code>Engine</code> 的一些介面，允許開發者直接使用 Babylon.js 的 API 進行開發（儘管可能存在部分支援）。"
      ]
    },
    "unity": {
      "title": "使用 <link>Unity</link> 構建",
      "description": [
        "使用 JSAR 開發的空間小應用程式可以在任何 Unity 場景中運行。我們提供了 JSAR UPM（Unity 套件管理器）插件，允許您根據需要實現底層數據介面，以在您的 Unity 應用程式中使用 JSAR 空間小應用程式。"
      ]
    }
  },
  "ManualPages": {
    "version": "版本",
    "latest": "最新版"
  }
}
