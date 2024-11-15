export default {
  "PageLayout": {
    "menuNames": {
      "download": "Download",
      "document": "Docs",
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
        "forum": "Forum",
        "discord": "Discord",
        "githubDiscussion": "Github Discussion"
      }
    },
    "footer": {
      "languages": "Languages",
      "community": "Community and Support",
      "icons": {
        "github": "Github",
        "forum": "Forum",
        "discord": "Discord",
        "wechatHelp": "Rokid Support",
      }
    }
  },
  "LandingPage": {
    "title": "The XR-first Web Runtime",
    "features": [
      "Rendering applications in one space and to be interacted with",
      "Supports TypeScript natively, no need for compilation or configuration",
      "Supports Web APIs to make libraries like Three.js and Babylon.js work",
    ],
    "tooltip": {
      "XSML": "Extensible Spatial Marked Language",
      "SCSS": "Spatial Cascading Style Sheets",
      "comingSoon": "Coming Soon"
    },
    "buttons": {
      "downloadVscodeExtension": "Visual Studio Code Extension",
      "developerDocumentation": "Documentation",
      "learnMore": "Learn More",
      "usingTypeScriptInJSAR": "Learn about TypeScript in JSAR",
      "usingThreeJSInJSAR": "Using Three.js in JSAR",
      "usingBabylonInJSAR": "Using Babylon.js in JSAR",
      "applyForEarlyAccess": "Apply UPM for Early Access"
    },
    "intro": {
      "title": [
        "HTML can be used to",
        "describe 3D"
      ],
      "description": [
        "We need to recap the way we think about HTML.",
        "Any element in HTML could just be an object in 3D with zero depth, but it could be 3D.",
        "<code>z-index</code> is not only designed to represent the order of elements, but also the depth of elements in 3D.",
        "<code>translate3d()</code> is the true 3D transformation now!"
      ]
    },
    "typescript": {
      "title": "TypeScript Built-in",
      "description": "JSAR runtime can directly execute TypeScript code, developers is free to use TypeScript without any compilation or configuration.",
      "features": [
        "Use TypeScript with one-step simple configuration",
        "enjoy TypeScript's intelligent suggestions in Visual Studio Code",
        "Publish applications using TypeScript source code without the need for additional builds"
      ]
    },
    "threejs": {
      "title": "Using <link>Three.js</link>",
      "description": [
        "Three.js is most popular open-source 3D library in Web. It provides a range of APIs for developing 3D games and applications.",
        "Three.js developers is free to use it to build applications in JSAR."
      ]
    },
    "babylonjs": {
      "title": "Using <link>Babylon.js</link>",
      "description": [
        "Babylon.js is an open-source 3D rendering engine that supports multiple backends (WebGL, WebGPU, server-side, and native). It provides a range of game scene APIs for developing 3D games and applications.",
        "Babylon.js developers can be free to use this library in JSAR (with WebGL2 backend) to create rich WebXR contents and applications."
      ]
    },
    "unity": {
      "title": "Built with <link>Unity</link>",
      "description": [
        "The Web application running in JSAR can run inside Unity. We provide the JSAR UPM (Unity Package Manager) plugin, which allows you to implement the underlying data interfaces as needed, enabling you to run Web applications in your Unity project."
      ]
    },
    "bottom": {
      "title": "Ready to get started?",
    }
  },
  "PlaygroundPage": {
    "title": "PLAYGROUND",
    "description": [
      "This page is used to preview examples provided by the official/community. You can switch to different examples by clicking on the examples list on the left.",
    ],
    "otherEx": "Other Examples",
    "metadata": {
      "base": "Information",
      "xsmlCode": "XSML Code",
      "attributes": {
        "name": "Name",
        "repository": "Repository",
        "entryUrl": "Entry URL",
      }
    },
  },
  "ManualPages": {
    "version": "Version",
    "latest": "Latest",
    "toc": {
      "INTRODUCTION": "Introduction",
      "QUICK_START": "Quick Start",
      "PROJECT_CONFIGURATION": "Configuration",
      "PROJECT_SETUP": "Setup",
      "PROJECT_CREATE": "Create",
      "PROJECT_RUN": "Run",
      "PROJECT_BUILD": "Build",
      "PROJECT_WRITE_HTML": "Write HTML",
      "PROJECT_WRITE_XSML": "Write XSML",
      "BASIC_CONCEPTS": "Basic Concepts",
      "BASIC_CONCEPTS_SPACES": "Spaces",
      "BASIC_CONCEPTS_INPUT_SOURCES": "Input sources",
      "BASIC_CONCEPTS_RECAP_OF_HTML": "Recap of HTML",
      "SPACE_MINIAPPS": "Space Mini-Apps",
      "XSML": "XSML",
      "SCSS": "SCSS",
      "TYPESCRIPT": "TypeScript",
      "FEATURES": "Features",
      "FEATURES_TYPESCRIPT": "TypeScript support",
      "FEATURES_THREEJS": "Three.js support",
      "FEATURES_BABYLONJS": "Babylon.js support",
      "FEATURES_VANILLAJS": "Vanilla.js support",
      "FEATURES_MODULES": "Modules",
      "FEATURES_WEBWORKERS": "Web Workers",
      "FEATURES_WEBASSEMBLY": "WebAssembly",
      "FEATURES_AUDIO": "Audio system",
      "FEATURES_DEBUGGING": "Debugging",
      "MESHES_AND_MODELS": "Meshes and Models",
      "MATERIALS": "Materials",
      "ANIMATIONS": "Animations",
      "AUDIO": "Audio",
      "INPUT_EVENTS": "Input Events",
      "DEVTOOLS": "Tools",
      "DEVTOOLS_FEATURES": "Functionalities",
      "DEVTOOLS_GUI": "User Interface",
      "DEVTOOLS_PREVIEW": "Preview",
      "DEVTOOLS_DEBUGGING": "Debugging",
      "DEVTOOLS_PACKAGING": "Packaging",
      "REFERENCES": "References",
      "REFERENCES_WEB_API": "Web APIs",
      "REFERENCES_NODEJS_API": "Node APIs",
      "REFERENCES_JSAR_API": "JSAR APIs",
      "REFERENCES_WEBGL": "WebGL and extensions",
      "REFERENCES_WEBXR": "WebXR basis",
      "REFERENCES_WEBXR_INPUTSOURCES": "WebXR input sources",
      "REFERENCES_GRAPHICS_BACKENDS": "Graphics backends",
      "REFERENCES_RUNTIME_CONFIGURATION": "Runtime configuration",
      "REFERENCES_CACHING": "Resource caching",
      "REFERENCES_EMBEDDER_GUIDES": "Embedder guides",
      "REFERENCES_EMBEDDER_NATIVE_API": "Native APIs",
      "REFERENCES_EMBEDDER_UNITY_API": "Unity APIs",
      "REFERENCES_XSML": "XSML",
      "REFERENCES_SPATIAL_CSS": "SpatialCSS",
      "RUNTIME": "Runtime",
      "RUNTIME_BABYLONJS_APIS": "Babylon.js APIs",
      "RUNTIME_WEB_APIS": "Web APIs",
      "RUNTIME_NODEJS_APIS": "Node.js APIs",
      "RUNTIME_JSAR_APIS": "JSAR APIs",
      "RUNTIME_RESOURCE_CACHE": "Resource Cache",
      "RUNTIME_MODULE_SYSTEM": "Module System",
      "TUTORIALS": "Tutorials",
      "TUTORIALS_HELLOWORLD_THREEJS": "Hello world with Three.js",
      "TUTORIALS_HELLOWORLD_BABYLONJS": "Hello world with Babylon.js",
      "TUTORIALS_CREATE_MESHES": "Create meshes",
      "TUTORIALS_CREATE_MATERIALS": "Create materials",
      "TUTORIALS_HTTPS_REQUEST": "Send HTTPS request",
      "TUTORIALS_CONNECT_WEBSOCKET_SERVER": "WebSocket client",
      "INTEGRATE_RUNTIME_WITH_UNITY": "Integrate with Unity",
      "DELIVERY": "Delivery",
      "DELIVERY_ROKID_ARSTORE": "Rokid AR Store",
      "DELIVERY_JSAR_CANARY": "JSAR Canary",
      "CONTRIBUTING": "Contributing",
      "CONTRIBUTING_TO_JSAR": "Contributing to JSAR",
      "CONTRIBUTING_STYLE_GUIDE": "JSAR Style Guide",
      "API_REFERENCE": "API Reference",
    }
  }
}