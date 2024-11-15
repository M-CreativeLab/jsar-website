export default {
  "PageLayout": {
    "menuNames": {
      "download": "下载",
      "document": "文档",
      "community": "社区"
    },
    "menuSubItems": {
      "download": {
        "vscodeExtension": "VSCode 插件",
        "JSARCanary": "Play WebXR"
      },
      "document": {
        "manual": "手册",
        "apiReference": "API 参考",
        "publish": "发布",
        "playground": "Playground"
      },
      "community": {
        "forum": "论坛",
        "discord": "Discord",
        "githubDiscussion": "Github 讨论"
      }
    },
    "footer": {
      "languages": "语言",
      "community": "社区和支持",
      "icons": {
        "github": "Github",
        "forum": "论坛",
        "discord": "Discord",
        "wechatHelp": "Rokid 支持"
      }
    }
  },
  "LandingPage": {
    "title": "面向 XR 设计的 Web 运行时",
    "features": [
      "在同一个空间中渲染不同应用，并与之互动",
      "原生支持 TypeScript，无需编译或配置",
      "支持 Web API，使得 Three.js 和 Babylon.js 等都可以正常工作"
    ],
    "tooltip": {
      "XSML": "可扩展空间标记语言",
      "SCSS": "空间层叠样式表",
      "comingSoon": "即将推出"
    },
    "buttons": {
      "downloadVscodeExtension": "Visual Studio Code 插件",
      "developerDocumentation": "开发者文档",
      "learnMore": "了解更多",
      "usingTypeScriptInJSAR": "了解 JSAR 中的 TypeScript",
      "usingThreeJSInJSAR": "在 JSAR 中使用 Three.js",
      "usingBabylonInJSAR": "在 JSAR 中使用 Babylon.js",
      "applyForEarlyAccess": "申请 UPM 提前访问"
    },
    "intro": {
      "title": [
        "HTML 可以用于",
        "描述空间"
      ],
      "description": [
        "我们需要重新思考 HTML 的概念。",
        "HTML 中的任何元素都可以是一个具有零深度的 3D 对象，但它可以是 3D 的。",
        "<code>z-index</code> 不仅代表元素的顺序，还可以表示元素在 3D 中的深度。",
        "<code>translate3d()</code> 现在是真正的 3D 变换！"
      ]
    },
    "typescript": {
      "title": "内置 TypeScript",
      "description": "JSAR 运行时可以直接执行 TypeScript 代码，开发者可以自由使用 TypeScript 而无需额外的编译或配置。",
      "features": [
        "只需一步简单配置即可使用 TypeScript",
        "在 Visual Studio Code 中享受 TypeScript 的智能建议",
        "无需额外构建即可使用 TypeScript 源代码发布应用"
      ]
    },
    "threejs": {
      "title": "使用 <link>Three.js</link>",
      "description": [
        "Three.js 是 Web 中最受欢迎的开源 3D 库。它提供了一系列 API 用于开发 3D 游戏和应用。",
        "Three.js 开发者可以自由地在 JSAR 中使用它来构建应用。"
      ]
    },
    "babylonjs": {
      "title": "使用 <link>Babylon.js</link>",
      "description": [
        "Babylon.js 是一个开源的 3D 渲染引擎，支持多种后端 (WebGL、WebGPU、服务端和本地)。它提供了一系列游戏场景 API，用于开发 3D 游戏和应用。",
        "Babylon.js 开发者可以在 JSAR 中使用该库 (支持 WebGL2 后端) 来创建丰富的 WebXR 内容和应用。"
      ]
    },
    "unity": {
      "title": "基于 <link>Unity</link> 构建",
      "description": [
        "运行在 JSAR 中的 Web 应用可以在 Unity 中运行。我们提供了 JSAR UPM (Unity Package Manager) 插件，允许您根据需要实现底层数据接口，从而可以在您的 Unity 项目中运行 Web 应用。"
      ]
    },
    "bottom": {
      "title": "准备好开始了吗？"
    }
  },
  "PlaygroundPage": {
    "title": "演示场",
    "description": [
      "此页面用于预览官方/社区提供的示例。您可以通过左侧的示例列表切换到不同的示例。"
    ],
    "otherEx": "其他示例",
    "metadata": {
      "base": "信息",
      "xsmlCode": "XSML 代码",
      "attributes": {
        "name": "名称",
        "repository": "代码仓库",
        "entryUrl": "入口 URL"
      }
    }
  },
  "ManualPages": {
    "version": "版本",
    "latest": "最新",
    "toc": {
      "INTRODUCTION": "简介",
      "QUICK_START": "快速开始",
      "PROJECT_CONFIGURATION": "配置",
      "PROJECT_SETUP": "设置",
      "PROJECT_CREATE": "创建",
      "PROJECT_RUN": "运行",
      "PROJECT_BUILD": "构建",
      "PROJECT_WRITE_HTML": "编写 HTML",
      "PROJECT_WRITE_XSML": "编写 XSML",
      "BASIC_CONCEPTS": "基本概念",
      "BASIC_CONCEPTS_SPACES": "空间",
      "BASIC_CONCEPTS_INPUT_SOURCES": "输入系统",
      "BASIC_CONCEPTS_RECAP_OF_HTML": "重新看待 HTML",
      "SPACE_MINIAPPS": "空间小程序",
      "XSML": "XSML",
      "SCSS": "SCSS",
      "TYPESCRIPT": "TypeScript",
      "FEATURES": "特性",
      "FEATURES_TYPESCRIPT": "TypeScript 支持",
      "FEATURES_THREEJS": "Three.js 支持",
      "FEATURES_BABYLONJS": "Babylon.js 支持",
      "FEATURES_VANILLAJS": "Vanilla.js 支持",
      "FEATURES_MODULES": "模块",
      "FEATURES_WEBWORKERS": "Web Workers",
      "FEATURES_WEBASSEMBLY": "WebAssembly",
      "FEATURES_AUDIO": "音频系统",
      "FEATURES_DEBUGGING": "调试",
      "MESHES_AND_MODELS": "网格和模型",
      "MATERIALS": "材质",
      "ANIMATIONS": "动画",
      "AUDIO": "音频",
      "INPUT_EVENTS": "输入事件",
      "DEVTOOLS": "开发工具",
      "DEVTOOLS_FEATURES": "功能",
      "DEVTOOLS_GUI": "用户界面",
      "DEVTOOLS_PREVIEW": "预览",
      "DEVTOOLS_DEBUGGING": "调试",
      "DEVTOOLS_PACKAGING": "打包",
      "REFERENCES": "参考",
      "REFERENCES_WEB_API": "Web APIs",
      "REFERENCES_NODEJS_API": "Node APIs",
      "REFERENCES_JSAR_API": "JSAR APIs",
      "REFERENCES_WEBGL": "WebGL 和扩展",
      "REFERENCES_WEBXR": "WebXR 基础",
      "REFERENCES_WEBXR_INPUTSOURCES": "WebXR 输入源",
      "REFERENCES_GRAPHICS_BACKENDS": "图形后端",
      "REFERENCES_RUNTIME_CONFIGURATION": "运行时配置",
      "REFERENCES_CACHING": "资源缓存",
      "REFERENCES_EMBEDDER_GUIDES": "集成指南",
      "REFERENCES_EMBEDDER_NATIVE_API": "本地 API",
      "REFERENCES_EMBEDDER_UNITY_API": "Unity API",
      "REFERENCES_XSML": "XSML",
      "REFERENCES_SPATIAL_CSS": "SpatialCSS",
      "RUNTIME": "运行时",
      "RUNTIME_BABYLONJS_APIS": "Babylon.js APIs",
      "RUNTIME_WEB_APIS": "Web APIs",
      "RUNTIME_NODEJS_APIS": "Node.js APIs",
      "RUNTIME_JSAR_APIS": "JSAR APIs",
      "RUNTIME_RESOURCE_CACHE": "资源缓存",
      "RUNTIME_MODULE_SYSTEM": "模块系统",
      "TUTORIALS": "教程",
      "TUTORIALS_HELLOWORLD_THREEJS": "你好 Three.js",
      "TUTORIALS_HELLOWORLD_BABYLONJS": "你好 Babylon.js",
      "TUTORIALS_CREATE_MESHES": "创建网格",
      "TUTORIALS_CREATE_MATERIALS": "创建材质",
      "TUTORIALS_HTTPS_REQUEST": "发送 HTTPS 请求",
      "TUTORIALS_CONNECT_WEBSOCKET_SERVER": "WebSocket 客户端",
      "INTEGRATE_RUNTIME_WITH_UNITY": "与 Unity 集成",
      "DELIVERY": "发布",
      "DELIVERY_ROKID_ARSTORE": "Rokid AR 商店",
      "DELIVERY_JSAR_CANARY": "JSAR Canary",
      "CONTRIBUTING": "贡献",
      "CONTRIBUTING_TO_JSAR": "为 JSAR 贡献",
      "CONTRIBUTING_STYLE_GUIDE": "JSAR 风格指南",
      "API_REFERENCE": "API 参考"
    }
  }
}
