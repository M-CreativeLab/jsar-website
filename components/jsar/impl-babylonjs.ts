import {
  SpatialDocumentImpl,
  DOMParser,
  NativeDocument,
  NativeEngine,
  RequestManager,
  ResourceLoader,
  UserAgent,
  UserAgentInit,
  JSARDOM,
  MediaPlayerConstructor,
  MediaPlayerBackend,
  cdp,
  XRSessionBackend,
  XRSessionBackendInit,
  JSARInputEvent,
} from '@yodaos-jsar/dom';
import 'babylonjs';

interface EngineOnBabylonjs extends BABYLON.Engine, EventTarget { }
class EngineOnBabylonjs extends BABYLON.Engine implements NativeEngine {
}

function canParseURL(url: string) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

class HeadlessResourceLoader implements ResourceLoader {
  fetch(url: string, options: { accept?: string; cookieJar?: any; referrer?: string; }, returnsAs: 'string'): Promise<string>;
  fetch(url: string, options: { accept?: string; cookieJar?: any; referrer?: string; }, returnsAs: 'json'): Promise<object>;
  fetch(url: string, options: { accept?: string; cookieJar?: any; referrer?: string; }, returnsAs: 'arraybuffer'): Promise<ArrayBuffer>;
  fetch<T = string | object | ArrayBuffer>(url: string, options: { accept?: string; cookieJar?: any; referrer?: string; }, returnsAs?: 'string' | 'json' | 'arraybuffer'): Promise<T>;
  fetch(url: string, options: { accept?: string; cookieJar?: any; referrer?: string; }, returnsAs?: 'string' | 'json' | 'arraybuffer'): Promise<object | ArrayBuffer | string> {
    if (!canParseURL(url)) {
      throw new TypeError('Invalid URL');
    }
    const urlObj = new URL(url);
    if (urlObj.protocol === 'file:') {
      throw new TypeError('file: protocol is not supported');
    } else {
      return fetch(url, options)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error(`The request to ${url} failed with status ${resp.status}`);
          }
          if (returnsAs === 'string') {
            return resp.text();
          } else if (returnsAs === 'json') {
            return resp.json();
          } else if (returnsAs === 'arraybuffer') {
            return resp.arrayBuffer();
          }
        });
    }
  }
}

/**
 * This is a MediaPlayerBackend implementation for Babylon.js. Which is a MediaPlayerBackend 
 * implementation based on HTMLAudioElement.
 */
class AudioPlayerOnBabylonjs implements MediaPlayerBackend {
  private _audioInstance: HTMLAudioElement;

  constructor() {
    this._audioInstance = new Audio();
  }
  load(buffer: ArrayBuffer | ArrayBufferView, onloaded: () => void): void {
    this._audioInstance.src = URL.createObjectURL(new Blob([buffer]));
    this._audioInstance.onloadeddata = onloaded;
  }
  play(when?: number | undefined): void {
    this._audioInstance.play();
    this._audioInstance.currentTime = when || 0;
  }
  pause(): void {
    this._audioInstance.pause();
  }
  canPlayType(type: string): CanPlayTypeResult {
    return this._audioInstance.canPlayType(type);
  }
  dispose(): void {
    // TODO
  }
  get paused(): boolean {
    return this._audioInstance.paused;
  }
  get currentTime(): number {
    return this._audioInstance.currentTime;
  }
  get duration(): number {
    return this._audioInstance.duration;
  }
  get volume(): number {
    return this._audioInstance.volume;
  }
  set volume(value: number) {
    this._audioInstance.volume = value;
  }
  get loop(): boolean {
    return this._audioInstance.loop;
  }
  set loop(value: boolean) {
    this._audioInstance.loop = value;
  }
  get onended(): () => void {
    return this._audioInstance.onended as any;
  }
  set onended(value: () => void) {
    this._audioInstance.onended = value;
  }
}

class UserAgentOnBabylonjs implements UserAgent {
  versionString: string = '1.0';
  vendor: string = '';
  vendorSub: string = '';
  language: string = 'zh-CN';
  languages: readonly string[] = [
    'zh-CN',
    'en-US',
  ];
  defaultStylesheet: string;
  devicePixelRatio: number;
  deviceMemory?: number;
  domParser: DOMParser;
  resourceLoader: ResourceLoader;
  requestManager: RequestManager = null;

  constructor(init: UserAgentInit) {
    this.defaultStylesheet = init.defaultStylesheet;
    this.devicePixelRatio = init.devicePixelRatio;
    this.resourceLoader = new HeadlessResourceLoader();
    // this.requestManager = null;
    this.deviceMemory = (navigator as any).deviceMemory;
  }
  alert(message?: string): void {
    throw new Error('Method not implemented.');
  }
  confirm(message?: string): boolean {
    throw new Error('Method not implemented.');
  }
  prompt(message?: string, defaultValue?: string): string {
    throw new Error('Method not implemented.');
  }
  vibrate(pattern: VibratePattern): boolean {
    return navigator.vibrate(pattern);
  }
  getWebSocketConstructor(): typeof WebSocket {
    return globalThis.WebSocket;
  }
  getMediaPlayerConstructor(): MediaPlayerConstructor {
    return AudioPlayerOnBabylonjs;
  }
  createXRSessionBackend(init?: XRSessionBackendInit | undefined): XRSessionBackend {
    return null;
  }
}

class NativeDocumentOnBabylonjs extends EventTarget implements NativeDocument {
  engine: NativeEngine;
  userAgent: UserAgent;
  baseURI: string;
  console: Console;
  attachedDocument: SpatialDocumentImpl;
  closed: boolean = false;
  cdpTransport: cdp.ITransport;

  private _scene: BABYLON.Scene;
  private _preloadMeshes: Map<string, Array<BABYLON.AbstractMesh | BABYLON.TransformNode>> = new Map();
  private _preloadAnimationGroups: Map<string, BABYLON.AnimationGroup[]> = new Map();
  private _clientCdpTransports: cdp.LoopbackTransport[] = [];
  private isCameraMoving: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    super();

    this.engine = new EngineOnBabylonjs(canvas, true);
    // this.engine.setHardwareScalingLevel(1 / window.devicePixelRatio);
    this.userAgent = new UserAgentOnBabylonjs({
      defaultStylesheet: '',
      devicePixelRatio: 1,
    });
    this.console = globalThis.console;
    const transport = this.cdpTransport = new cdp.LoopbackTransport();
    transport.onDidSend((data) => {
      for (const clientTransport of this._clientCdpTransports) {
        clientTransport.receive(data);
      }
    });

    const scene = this._scene = new BABYLON.Scene(this.engine);
    this._scene.clearColor = new BABYLON.Color4(0.1, 0.1, 0.1, 1);

    const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
      'https://assets.babylonjs.com/environments/environmentSpecular.env', this._scene);
    this._scene.environmentTexture = hdrTexture;

    // create camera and targets
    const camera = new BABYLON.ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2,
      5,
      BABYLON.Vector3.Zero(),
      this._scene
    );
    // camera.upperRadiusLimit = 10;
    camera.lowerRadiusLimit = 2;
    camera.wheelDeltaPercentage = 0.01;

    camera.setPosition(new BABYLON.Vector3(0, 1, -5));
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false, true);

    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 2, -5), this._scene);
    light.intensity = 0.7;

    this.engine.runRenderLoop(() => {
      this._scene.render();
    });
    window.addEventListener('resize', () => {
      this.engine.resize();
    });

    let lastCameraState = [camera.alpha, camera.beta, camera.radius];
    scene.onAfterCameraRenderObservable.add(() => {
      if (lastCameraState[0] !== camera.alpha || lastCameraState[1] !== camera.beta || lastCameraState[2] !== camera.radius) {
        this.isCameraMoving = true;
      } else {
        this.isCameraMoving = false;
      }
      lastCameraState = [camera.alpha, camera.beta, camera.radius];
    });

    // show fps
    const fpsLabel = document.querySelector('#fps');
    if (fpsLabel) {
      scene.onAfterRenderObservable.add(() => {
        fpsLabel.innerHTML = `${this.engine.getFps().toFixed()} fps`;
      });
    }
  }

  addClientCdpTransport(transport: cdp.LoopbackTransport) {
    this._clientCdpTransports.push(transport);
  }

  addEventHandlerOnDom(targetDom: JSARDOM<NativeDocumentOnBabylonjs>) {
    const scene = this._scene;
    scene.onBeforeRenderObservable.add(() => {
      if (this.isCameraMoving === true) {
        return;
      }
      const pickingInfo = scene.pick(scene.pointerX, scene.pointerY);
      if (targetDom && pickingInfo.pickedMesh?.metadata) {
        const raycastEvent = new JSARInputEvent('raycast', {
          sourceId: 'scene_default_ray',
          sourceType: 'mouse',
          targetSpatialElementInternalGuid: pickingInfo.pickedMesh.metadata['jsardom.guid'],
          uvCoord: pickingInfo.getTextureCoordinates(),
        });
        targetDom.dispatchInputEvent(raycastEvent);
      }
    });

    function handlePointerDown() {
      if (!this.isCameraMoving && targetDom) {
        targetDom.dispatchInputEvent(
          new JSARInputEvent('raycast_action', {
            sourceId: 'scene_default_ray',
            type: 'down',
          })
        );
      }
    }
    function handlePointerUp() {
      if (!this.isCameraMoving && targetDom) {
        targetDom.dispatchInputEvent(
          new JSARInputEvent('raycast_action', {
            sourceId: 'scene_default_ray',
            type: 'up',
          })
        );
      }
    }
    scene.onPointerObservable.add((pointerInfo) => {
      switch (pointerInfo.type) {
        case BABYLON.PointerEventTypes.POINTERUP:
          handlePointerUp.call(this);
          break;
        case BABYLON.PointerEventTypes.POINTERDOWN:
          handlePointerDown.call(this);
          break;
        default:
          break;
      }
    });
  }

  getNativeScene(): BABYLON.Scene {
    return this._scene;
  }
  getContainerPose(): XRPose {
    throw new Error('Method not implemented.');
  }
  getPreloadedMeshes(): Map<string, Array<BABYLON.AbstractMesh | BABYLON.TransformNode>> {
    return this._preloadMeshes;
  }
  getPreloadedAnimationGroups(): Map<string, BABYLON.AnimationGroup[]> {
    return this._preloadAnimationGroups;
  }
  observeInputEvent(name?: string): void {
    // TODO
  }
  createBoundTransformNode(nameOrId: string): BABYLON.TransformNode {
    throw new Error('Method not implemented.');
  }

  createImageBitmap(image: ArrayBuffer | ArrayBufferView): Promise<ImageBitmap> {
    return window.createImageBitmap(new Blob([image]));
  }

  decodeImage(bitmap: ImageBitmap, size: [number, number]) {
    let expectedWidth = size[0];
    let expectedHeight = size[1];
    if (typeof expectedWidth !== 'number') {
      expectedWidth = bitmap.width;
    }
    if (typeof expectedHeight !== 'number') {
      expectedHeight = bitmap.height;
    }

    const offscreenCanvas = new window.OffscreenCanvas(expectedWidth, expectedHeight);
    const ctx = offscreenCanvas.getContext('2d');
    ctx?.drawImage(
      bitmap,
      0, 0,
      bitmap.width, bitmap.height,
      0, 0,
      offscreenCanvas.width, offscreenCanvas.height
    );
    const imageData = ctx?.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
    return Promise.resolve(imageData as any);
  }

  stop(): void {
    // TODO
  }
  close(): void {
    this.engine.stopRenderLoop();
    this.engine.dispose();
    this._scene.dispose();
  }
}

const defaultCode: string = `
<xsml>
  <head>
    <style>
      @keyframes rotate {
        from {
          rotation: 0 0 30;
        }
        to {
          rotation: 0 360 30;
        }
      }

      cube {
        animation: rotate 5s linear infinite;
      }
      plane {
        position: 0.25 0.5 -1;
      }
    </style>
  </head>
  <space>
    <cube />
    <plane height="0.5" width="1.5">
      <div>
        <span>Hello JSAR!</span>
        <span style="font-size: 50px;">Type your XSML in the below input</span>
      </div>
      <style type="text/css">
        div {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          gap: 20px;
        }
        span {
          flex: 1;
          color: red;
          font-size: 150px;
          line-height: 1.5;
        }
      </style>
    </plane>
    <script>
      const cube = document.querySelector('cube');
      if (cube) {
        cube.addEventListener('rayenter', () => {
          cube.asNativeType<BABYLON.AbstractMesh>().renderOutline = true;
          cube.asNativeType<BABYLON.AbstractMesh>().outlineColor = new BABYLON.Color3(0, 1, 1);
        });
        cube.addEventListener('rayleave', () => {
          cube.asNativeType<BABYLON.AbstractMesh>().renderOutline = false;
        });
      }
      console.log(navigator);

    </script>
  </space>
</xsml>
`;

let currentDom: JSARDOM<NativeDocumentOnBabylonjs>;
let panels: JSARDOM<NativeDocumentOnBabylonjs>[] = [];

export class Loader {
  source: string;
  constructor(private _canvas: HTMLCanvasElement) {}

  async bootstrap() {
    if (!(await this.loadFromUrl())) {
      await this.load(defaultCode);
    }
  }

  fitSpaceWithScene(spaceNode: BABYLON.TransformNode, ratio: number = 1) {
    /**
     * Scale the space to fit the scene.
     */
    const boundingVectors = spaceNode.getHierarchyBoundingVectors(true);
    const sceneSize = boundingVectors.max.subtract(boundingVectors.min);
    const scalingRatio = Math.min(ratio / sceneSize.x, ratio / sceneSize.y, ratio / sceneSize.z);
    spaceNode.scaling = new BABYLON.Vector3(scalingRatio, scalingRatio, scalingRatio);
    spaceNode.setEnabled(true);
  }

  async load(code: string, urlBase: string = 'https://example.com/') {
    if (currentDom) {
      await currentDom.unload();
    }
    this.source = code;
    const nativeDocument = new NativeDocumentOnBabylonjs(this._canvas);
    currentDom = new JSARDOM(code, {
      url: urlBase,
      nativeDocument,
      devtools: {
        log: true,
      }
    });
    nativeDocument.addEventHandlerOnDom(currentDom);
    await currentDom.load();

    const transport = new cdp.LoopbackTransport();
    transport.onDidSend((data) => {
      (nativeDocument.cdpTransport as cdp.LoopbackTransport).receive(data);
    });
    const cdpClient = cdp.createRemoteClient(transport);
    cdpClient.rootSession.api.Log.onEntryAdded((params) => {
      console.log('[CDP Event] Log.onEntryAdded', params);
    });
    nativeDocument.addClientCdpTransport(transport);

    const spaceNode = currentDom.document.space.asNativeType<BABYLON.TransformNode>();
    spaceNode.setEnabled(false);

    await currentDom.waitForSpaceReady();
    {
      this.fitSpaceWithScene(spaceNode, 2.5);
    }

    cdpClient.rootSession.api.DOM.getDocument().then((result) => {
      for (const panel of panels) {
        const customEvent = new CustomEvent('custom', {
          detail: result.root,
        });
        panel.document.dispatchEvent(customEvent);
      }
    });
  }

  async loadFromUrl(): Promise<boolean> {
    if (location.search && location.href) {
      const url = new URL(location.href).searchParams.get('url');
      if (url) {
        const code = await (await fetch(url)).text();
        this.load(code, url);
        return true;
      }
    }
    return false;
  }
}
