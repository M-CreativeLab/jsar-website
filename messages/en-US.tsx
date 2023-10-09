export default {
  "PageLayout": {
    "menuNames": {
      "download": "Download",
      "document": "Documentation",
      "community": "Community"
    },
    "menuSubItems": {
      "download": {
        "vscodeExtension": "VSCode Extension",
        "JSARCanary": "JSAR Canary"
      },
      "document": {
        "manual": "Manual",
        "apiReference": "API Reference",
        "publish": "Publish",
        "playground": "Playground"
      },
      "community": {
        "forum": "Developer Forum",
        "githubDiscussion": "Github Discussion"
      }
    }
  },
  "LandingPage": {
    "title": "JSAR: A Web Runtime for Embeddable Space",
    "features": [
      "Supports Web-standard APIs, TypeScript and Babylon.js",
      "Space-based Security, applications run in the space isolation framework, without interfering with each other.",
      "Achieving rendering performance close to native by separating application layer"
    ],
    "tooltip": {
      "XSML": "Extensible Spatial Marked Language",
      "SCSS": "Spatial Cascading Style Sheets",
      "comingSoon": "Coming Soon"
    },
    "buttons": {
      "downloadVscodeExtension": "Visual Studio Code Extension",
      "developerDocumentation": "Developer Documentation",
      "learnMore": "Learn More",
      "usingTypeScriptInJSAR": "Using TypeScript in JSAR",
      "usingBabylonInJSAR": "Using Babylon.js in JSAR",
      "applyForEarlyAccess": "Apply UPM for Early Access"
    },
    "intro": {
      "title": [
        "Web-like",
        "but for Spatial Mini-Apps"
      ],
      "description": [
        "It restores the initial web development experience, with a what-you-see-is-what-you-get approach",
        "It introduces <tooltip>XSML</tooltip>, it's a HTML-like markup language to describe 3D structure.",
        "It introduces <tooltip >SCSS</tooltip>, it's a CSS-like language to describe the style of 3D space.",
        "Similarly, JSAR uses TypeScript / JavaScript as the scripting language."
      ]
    },
    "typescript": {
      "title": "TypeScript Built-in",
      "description": "JSAR runtime can directly parse TypeScript code when executing mini-apps, so developers can run TypeScript code without any compilation or configuration.",
      "features": [
        "Use TypeScript with one-step simple configuration",
        "enjoy TypeScript's intelligent suggestions in Visual Studio Code",
        "Publish applications using TypeScript source code without the need for additional builds"
      ]
    },
    "babylonjs": {
      "title": "Using <link>Babylon.js</link>",
      "description": [
        "Babylon.js is an open-source 3D rendering engine that supports multiple backends (WebGL, WebGPU, server-side, and native). It provides a range of game scene APIs for developing 3D games and applications.",
        "JSAR has implemented some of the interfaces of the Babylon.js <code>Engine</code>, allowing developers to directly use Babylon.js APIs for development (although there may be some partial support)."
      ]
    },
    "unity": {
      "title": "Built with <link>Unity</link>",
      "description": [
        "The spatial mini-apps developed using JSAR can run in any Unity scene. We provide the JSAR UPM (Unity Package Manager) plugin, which allows you to implement the underlying data interfaces as needed, enabling you to use JSAR spatial mini-applications in your Unity application."
      ]
    }
  },
  "ManualPages": {
    "version": "Version",
    "latest": "Latest",
  }
}