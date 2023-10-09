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
        "JSARCanary": "JSAR Canary"
      },
      "document": {
        "manual": "開發者指南",
        "apiReference": "API 文件",
        "publish": "發佈",
        "playground": "線上體驗"
      },
      "community": {
        "forum": "開發者論壇",
        "githubDiscussion": "Github 討論區"
      }
    }
  },
  "LandingPage": {
    "title": "空間小程式：可嵌入空間的 Web 運行時",
    "features": [
      "支援 Web 標準 API、TypeScript 及 Babylon.js",
      "空間運行安全，空間小程式運行在空間隔離框架中，互不干擾",
      "透過應用層與渲染層代碼邏輯分離，實現接近原生的渲染性能"
    ],
    "tooltip": {
      "XSML": "可擴展空間標記語言（Extensible Spatial Marked Language）",
      "SCSS": "空間層級樣式表（Spatial Cascading Style Sheets）"
    },
    "buttons": {
      "downloadVscodeExtension": "下載 VSCode 擴充套件",
      "developerDocumentation": "開發者文件",
      "learnMore": "瞭解更多",
      "usingTypeScriptInJSAR": "在 JSAR 中使用 TypeScript",
      "usingBabylonInJSAR": "在 JSAR 中使用 Babylon.js",
      "applyForEarlyAccess": "申請 JSAR UPM 試用"
    },
    "intro": {
      "title": [
        "如 Web 一般",
        "但用於空間小程式開發"
      ],
      "description": [
        "空間小程式還原最初的 Web 開發體驗，所見即所得。",
        "我們引入了 <tooltip>XSML</tooltip>，它是一種類似於 HTML 的語言，用於描述組件的空間結構。",
        "我們引入了 <tooltip >SCSS</tooltip>，它是一種類似於 CSS 的語言，用於描述組件的空間樣式。",
        "同樣地，JSAR 使用 TypeScript / JavaScript 作為空間小程式的腳本語言。"
      ]
    },
    "typescript": {
      "title": "內建 TypeScript",
      "description": "JSAR 運行時在執行小程式時，可直接解析 TypeScript 代碼，因此開發者無需任何編譯和配置即可運行 TypeScript 代碼。",
      "features": [
        "簡單一步配置即可使用 TypeScript",
        "在 Visual Studio Code 中享受 TypeScript 的智慧提示",
        "透過 TypeScript 原始碼進行應用程式發佈，無需額外構建"
      ]
    },
  }
}
