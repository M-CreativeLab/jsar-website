export default {
  "PageLayout": {
    "menuNames": {
      "download": "下载",
      "document": "文档",
      "community": "社区"
    },
    "menuSubItems": {
      "download": {
        "vscodeExtension": "VSCode 拓展",
        "JSARCanary": "JSAR Canary"
      },
      "document": {
        "manual": "开发者指南",
        "apiReference": "API 文档",
        "publish": "发布",
        "playground": "在线体验"
      },
      "community": {
        "forum": "开发者论坛",
        "discord": "Discord",
        "githubDiscussion": "Github Discussion"
      }
    },
    "footer": {
      "languages": "多语言",
      "community": "社区 & 支持",
      "icons": {
        "github": "Github",
        "forum": "论坛",
        "discord": "Discord",
        "wechatHelp": "获取开发者支持",
      }
    }
  },
  "LandingPage": {
    "title": "空间小程序：可嵌入空间的 Web 运行时",
    "features": [
      "支持 Web-standard APIs、TypeScript 以及 Babylon.js",
      "空间运行安全，空间小程序运行在空间隔离框架中，互不干扰",
      "通过应用层与渲染层代码逻辑分离，实现接近原生的渲染性能"
    ],
    "tooltip": {
      "XSML": "Extensible Spatial Marked Language，即可扩展空间标记语言",
      "SCSS": "Spatial Cascading Style Sheets，即空间层叠样式表",
      "comingSoon": "即将开放"
    },
    "buttons": {
      "downloadVscodeExtension": "下载 VSCode 拓展",
      "developerDocumentation": "开发者文档",
      "learnMore": "了解更多",
      "usingTypeScriptInJSAR": "在 JSAR 中使用 TypeScript",
      "usingBabylonInJSAR": "在 JSAR 中使用 Babylon.js",
      "applyForEarlyAccess": "申请 JSAR UPM 试用"
    },
    "intro": {
      "title": [
        "如 Web 一般",
        "但用于空间小程序开发"
      ],
      "description": [
        "空间小程序还原最开始的 Web 开发体验，并所见即所得。",
        "我们引入了 <tooltip>XSML</tooltip>，它是一种类似于 HTML 的语言，用于描述组件的空间结构。",
        "我们引入了 <tooltip >SCSS</tooltip>，它是一种类似于 CSS 的语言，用于描述组件的空间样式。",
        "同样地，JSAR 使用 TypeScript / JavaScript 作为空间小程序的脚本语言。"
      ]
    },
    "typescript": {
      "title": "TypeScript 内置",
      "description": "JSAR 运行时在执行小程序时，可直接解析 TypeScript 代码，因此开发者无需任何编译和配置即可运行 TypeScript 代码。",
      "features": [
        "简单一步配置即可使用 TypeScript",
        "在 Visual Studio Code 中享受 TypeScript 的智能提示",
        "通过 TypeScript 源码进行应用发布，无需额外构建"
      ]
    },
    "babylonjs": {
      "title": "使用 <link>Babylon.js</link>",
      "description": [
        "Babylon.js 是一个支持多后端（WebGL、WebGPU、服务端以及 Native）的开源 3D 渲染引擎，它提供了一系列的游戏场景 API，可用于开发 3D 游戏和应用。",
        "JSAR 实现了 Babylon.js <code>Engine</code> 部分的接口，因此开发者可直接使用 Babylon.js 的 API 进行开发（不过还存在不完全支持的情况）。"
      ]
    },
    "unity": {
      "title": "与 <link>Unity</link> 一同构建",
      "description": [
        "使用 JSAR 开发的空间小程序可以在任何一个 Unity 场景中运行，我们提供了 JSAR UPM 插件，按需实现底层数据接口，即可在你的 Unity 应用中使用 JSAR 空间小程序。"
      ]
    }
  },
  "PlaygroundPage": {
    "title": "在线演示",
    "description": [
      "该页面用于预览官方/社区提供的示例，您可以通过点击左侧的示例列表来切换不同的示例。",
      "注：首次加载可能需要较长时间，请耐心等待。"
    ],
    "metadata": {
      "base": "基础信息",
      "xsml": "XSML代码",
      "attributes": {
        "name": "名称",
        "repository": "代码仓库",
        "entryUrl": "入口文件",
      }
    },
  },
  "ManualPages": {
    "version": "版本",
    "latest": "最新",
    "toc": {
      "INTRODUCTION": "介绍",
      "QUICK_START": "快速入门",
      "PROJECT_CONFIGURATION": "配置环境",
      "PROJECT_CREATE": "创建项目",
      "PROJECT_RUN": "运行",
      "PROJECT_BUILD": "打包",
      "BASIC_CONCEPTS": "基础概念",
      "SPACE_MINIAPPS": "空间小程序",
      "XSML": "XSML",
      "SCSS": "SCSS",
      "TYPESCRIPT": "TypeScript",
      "FEATURES": "基础功能",
      "MESHES_AND_MODELS": "网格与模型",
      "MATERIALS": "材质",
      "ANIMATIONS": "动画",
      "AUDIO": "音频",
      "INPUT_EVENTS": "输入事件",
      "DEVTOOLS": "开发者工具",
      "DEVTOOLS_FEATURES": "功能",
      "DEVTOOLS_GUI": "界面",
      "DEVTOOLS_PREVIEW": "预览",
      "DEVTOOLS_DEBUGGING": "调试",
      "DEVTOOLS_PACKAGING": "打包",
      "RUNTIME": "运行时",
      "RUNTIME_BABYLONJS_APIS": "Babylon.js APIs",
      "RUNTIME_WEB_APIS": "Web APIs",
      "RUNTIME_NODEJS_APIS": "Node.js APIs",
      "RUNTIME_JSAR_APIS": "JSAR APIs",
      "RUNTIME_RESOURCE_CACHE": "资源缓存",
      "RUNTIME_MODULE_SYSTEM": "模块系统",
      "DELIVERY": "发布与分发",
      "DELIVERY_ROKID_ARSTORE": "Rokid AR 商店",
      "DELIVERY_JSAR_CANARY": "JSAR Canary",
      "API_REFERENCE": "API Reference",
    }
  }
}