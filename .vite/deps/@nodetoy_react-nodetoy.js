import {
  extend,
  useFrame
} from "./chunk-BXYVNOPC.js";
import {
  require_react
} from "./chunk-6DDWND5A.js";
import {
  BackSide,
  Clock,
  CubeUVReflectionMapping,
  DataTexture,
  DoubleSide,
  FrontSide,
  Matrix3,
  Matrix4,
  MultiplyOperation,
  RGBAFormat,
  RepeatWrapping,
  ShaderLib,
  ShaderMaterial,
  Texture,
  TextureLoader,
  Vector2,
  Vector3,
  Vector4
} from "./chunk-7EGGLTW3.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/@nodetoy/react-nodetoy/dist/react-nodetoy.es.js
var import_react = __toESM(require_react());
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var C = Object.defineProperty;
var K = (n, t, e) => t in n ? C(n, t, { enumerable: true, configurable: true, writable: true, value: e }) : n[t] = e;
var x = (n, t, e) => (K(n, typeof t != "symbol" ? t + "" : t, e), e);
var k = (n, t = {}) => {
  U("event", n, t);
};
var W = (n, t = {}) => {
  if (typeof window > "u")
    return;
  const e = "ga-gtag";
  if (document.getElementById(e)) {
    console.error("Already has a gtag script.");
    return;
  }
  const { head: r } = document, i = document.createElement("script");
  i.id = e, i.type = "text/javascript", i.async = true, i.src = `https://www.googletagmanager.com/gtag/js?id=${n}`, r.insertBefore(i, r.firstChild), window.dataLayer = window.dataLayer || [], U("js", /* @__PURE__ */ new Date()), U("config", n, t);
};
var U = function(...n) {
  window.dataLayer.push(arguments);
};
var R = new TextureLoader();
var f = {};
var _ = {
  state: 0,
  stateFrame: 0,
  button: 0,
  viewportState: 0,
  viewportStateFrame: 0,
  x: 0,
  y: 0
};
var X = class extends DataTexture {
  constructor() {
    const c = new Uint8Array(1024);
    for (let w = 0; w < 4 * 256; w++)
      c[w] = 0;
    super(c, 256, 1, RGBAFormat);
    x(this, "data");
    x(this, "_size");
    this.data = c, this.flipY = true, this._size = 256;
  }
  setKeyDown(e) {
    const r = e * 4;
    this.data[r + 0] !== 255 && (this.data[r + 0] = 255, this.data[r + 1] = 255, this.data[r + 2] = 255 - this.data[r + 2], this.needsUpdate = true);
  }
  setKeyUp(e) {
    const r = e * 4;
    this.data[r + 0] = 0, this.data[r + 1] = 0, this.needsUpdate = true;
  }
  clear() {
    for (let e = 0; e < 4 * this._size; e++)
      this.data[e] = 0;
    this.needsUpdate = true;
  }
  clearFrame() {
    for (let e = 0; e < this._size; e++) {
      const r = e * 4;
      this.data[r + 1] = 0;
    }
    this.needsUpdate = true;
  }
};
var Q = class {
  constructor(t) {
    x(this, "renderer");
    x(this, "_keyboardTexture", new X());
    x(this, "_onPointerMoveBind");
    x(this, "_onPointerDownBind");
    x(this, "_onPointerUpBind");
    x(this, "_onPointerEnterBind");
    x(this, "_onPointerLeaveBind");
    x(this, "_onKeyDownBind");
    x(this, "_onKeyUpBind");
    this.renderer = t, this.renderer._pointerPosition = { x: 0, y: 0 }, this.renderer._pointerData = _, this.renderer._keyboardTexture = this._keyboardTexture;
    const e = t.domElement;
    if (!e) {
      console.warn("[NodeToy] Unable to bind dom events, domElement is null. Some nodes will not work.");
      return;
    }
    this._onPointerMoveBind = this.onPointerMove.bind(this), this._onPointerDownBind = this.onPointerDown.bind(this), this._onPointerUpBind = this.onPointerUp.bind(this), this._onPointerEnterBind = this.onPointerEnter.bind(this), this._onPointerLeaveBind = this.onPointerLeave.bind(this), this._onKeyDownBind = this.onKeyDown.bind(this), this._onKeyUpBind = this.onKeyUp.bind(this), e.addEventListener("pointermove", this._onPointerMoveBind), e.addEventListener("pointerdown", this._onPointerDownBind), e.addEventListener("pointerup", this._onPointerUpBind), e.addEventListener("pointerenter", this._onPointerEnterBind), e.addEventListener("pointerleave", this._onPointerLeaveBind), window.addEventListener("keydown", this._onKeyDownBind), window.addEventListener("keyup", this._onKeyUpBind);
  }
  dispose() {
    if (!this.renderer)
      return;
    const t = this.renderer.domElement;
    !t || (t.removeEventListener("pointermove", this._onPointerMoveBind), t.removeEventListener("pointerdown", this._onPointerDownBind), t.removeEventListener("pointerup", this._onPointerUpBind), t.removeEventListener("pointerenter", this._onPointerEnterBind), t.removeEventListener("pointerleave", this._onPointerLeaveBind), window.removeEventListener("keydown", this._onKeyDownBind), window.removeEventListener("keyup", this._onKeyUpBind));
  }
  onPointerMove(t) {
    !this.renderer || (this.renderer._pointerPosition = {
      x: Math.floor(t.offsetX),
      y: Math.floor(t.offsetY)
    });
  }
  onPointerDown(t) {
    !this.renderer || (this.renderer._pointerData = __spreadProps(__spreadValues({}, this.renderer._pointerData), {
      state: 1,
      stateFrame: 1,
      button: t.button,
      x: Math.floor(t.offsetX),
      y: Math.floor(t.offsetY)
    }));
  }
  onPointerUp(t) {
    !this.renderer || (this.renderer._pointerData = __spreadProps(__spreadValues({}, this.renderer._pointerData), {
      state: 2,
      stateFrame: 2,
      button: t.button,
      x: Math.floor(t.offsetX),
      y: Math.floor(t.offsetY)
    }));
  }
  onPointerEnter(t) {
    !this.renderer || (this.renderer._pointerData = __spreadProps(__spreadValues({}, this.renderer._pointerData), {
      viewportState: 1,
      viewportStateFrame: 1,
      x: Math.floor(t.offsetX),
      y: Math.floor(t.offsetY)
    }));
  }
  onPointerLeave(t) {
    !this.renderer || (this.renderer._pointerData = __spreadProps(__spreadValues({}, this.renderer._pointerData), {
      viewportState: 2,
      viewportStateFrame: 2,
      x: Math.floor(t.offsetX),
      y: Math.floor(t.offsetY)
    }));
  }
  onKeyDown(t) {
    !this.renderer || this._keyboardTexture.setKeyDown(t.keyCode);
  }
  onKeyUp(t) {
    !this.renderer || this._keyboardTexture.setKeyUp(t.keyCode);
  }
};
var Z = (n) => n.includes(".json") ? n : `${n}${n[n.length - 1] != "/" ? "/" : ""}material.glsl.json`;
var Y = (n, t) => {
  if (!n || !t.includes("asset:"))
    return t;
  const e = n[n.length - 1];
  return `${n}${e !== "/" ? "/" : ""}assets/${t.replace("asset:", "")}`;
};
var m = (n, t, e, r = {}) => {
  const i = t;
  for (let c = 0; c < e.length; c++) {
    const w = e[c], v = w.name in r ? r[w.name] : w.value;
    i[w.name] = {
      value: $(n, w.type, v),
      type: w.type
    };
  }
  return i;
};
var $ = (n, t, e) => {
  switch (t) {
    case "int":
    case "float":
      return e;
    case "vec2":
      return e != null ? new Vector2(e.x, e.y) : new Vector2(0, 0);
    case "vec3":
      return e != null ? new Vector3(e.x, e.y, e.z) : new Vector3(0, 0, 0);
    case "vec4":
      return e != null ? new Vector4(e.x, e.y, e.z, e.w) : new Vector4(0, 0, 0);
    case "mat3":
      return e || new Matrix3();
    case "mat4":
      return e || new Matrix4();
    case "texture": {
      if (e in f)
        return f[e];
      const r = R.load(Y(n, e));
      return r.wrapS = r.wrapT = RepeatWrapping, f[e] = r, r;
    }
  }
  return "undefined";
};
var ee = () => {
  W("G-D7559MFFX3");
};
var ne = (n, t) => {
  for (let e = 0; e < n.scene.children.length; e++)
    if (n.scene.children[e].isDirectionalLight) {
      n.light = n.scene.children[e];
      break;
    }
  if ("_sinTime" in t) {
    const e = Math.sin(n.time);
    t._sinTime.value.set(e / 8, e / 4, e / 2, e);
  }
  if ("_cosTime" in t) {
    const e = Math.cos(n.time);
    t._cosTime.value.set(e / 8, e / 4, e / 2, e);
  }
  if ("_objectScale" in t) {
    const e = n.object;
    t._objectScale.value = e.scale;
  }
  if ("_time" in t && (t._time.value = n.time), "_deltaTime" in t && t._deltaTime.value.set(n.deltaTime, 1 / n.deltaTime, 0, 0), "_objectSpaceViewDir" in t) {
    const e = n.object, r = n.camera, i = new Vector4(r.position.x, r.position.y, r.position.z), c = e.matrixWorld.clone().invert().elements, w = c[0] * i.x + c[4] * i.y + c[8] * i.z + c[12] * i.w, v = c[1] * i.x + c[5] * i.y + c[9] * i.z + c[13] * i.w, l = c[2] * i.x + c[6] * i.y + c[10] * i.z + c[14] * i.w, a = c[3] * i.x + c[7] * i.y + c[11] * i.z + c[15] * i.w, s = new Vector4(w, v, l, a);
    t._objectSpaceViewDir.value = s;
  }
  if ("_cameraPosition" in t) {
    const e = n.camera;
    t._cameraPosition.value = e.position.clone();
  }
  if ("_worldSpaceCameraPosition" in t && (n.camera.getWorldDirection(T), t._worldSpaceCameraPosition.value = T), "_worldSpaceLightPosition" in t && (n.light.getWorldDirection(V), t._worldSpaceLightPosition.value = V), "_worldToObject" in t) {
    const e = n.object;
    t._worldToObject.value = e.matrixWorld.clone().invert();
  }
  if ("_worldToObjMatrix" in t && (t._worldToObjMatrix.value = n.object.matrixWorld.clone().invert()), "_worldToCameraMatrix" in t) {
    const e = n.camera;
    t._worldToCameraMatrix.value = e.matrixWorldInverse.clone();
  }
  if ("_viewProjectionMatrix" in t) {
    const e = n.camera, r = e.matrixWorld.clone();
    t._viewProjectionMatrix.value = e.projectionMatrix.clone().multiply(r);
  }
  if ("_viewMatrix" in t) {
    const e = n.camera;
    t._viewMatrix.value = e.matrixWorldInverse;
  }
  if ("_transposeModelViewMatrix" in t) {
    const e = n.object;
    t._transposeModelViewMatrix.value = e.modelViewMatrix.clone().transpose();
  }
  if ("_inverseTransposeModelViewMatrix" in t) {
    const r = n.object.modelViewMatrix.clone();
    t._inverseTransposeModelViewMatrix.value = r.invert().transpose();
  }
  if ("_projectionMatrix" in t) {
    const e = n.camera;
    t._projectionMatrix.value = e.projectionMatrix;
  }
  if ("_projectionParams" in t) {
    const e = n.camera;
    t._projectionParams.value = new Vector4(1, e.near, e.far, 1 / e.far);
  }
  if ("_inverseProjectionMatrix" in t) {
    const e = n.camera;
    t._inverseProjectionMatrix.value = e.projectionMatrixInverse;
  }
  if ("_objectToWorldMatrix" in t) {
    const e = n.object;
    t._objectToWorldMatrix.value = e.matrixWorld;
  }
  if ("_modelViewProjectionMatrix" in t) {
    const e = n.object, r = n.camera;
    r.updateMatrixWorld(true), e.updateMatrixWorld(true);
    const i = e.modelViewMatrix.clone();
    t._modelViewProjectionMatrix.value = r.projectionMatrix.clone().multiply(i);
  }
  if ("_modelViewMatrix" in t) {
    const e = n.object;
    n.camera.updateMatrixWorld(true), e.updateMatrixWorld(true), t._modelViewMatrix.value = e.modelViewMatrix.clone();
  }
  if ("_inverseModelViewMatrix" in t) {
    const e = n.object;
    n.camera.updateMatrixWorld(true), e.updateMatrixWorld(true), t._inverseModelViewMatrix.value = e.modelViewMatrix.clone().invert();
  }
  if ("_modelMatrix" in t) {
    const e = n.object;
    t._modelMatrix.value = e.matrixWorld;
  }
  if ("_normalMatrix" in t) {
    const e = n.object;
    t._normalMatrix.value = e.normalMatrix;
  }
  if ("_inverseViewMatrix" in t) {
    const e = n.camera;
    t._inverseViewMatrix.value = e.matrixWorldInverse.clone().invert();
  }
  if ("_cameraToWorldMatrix" in t) {
    const e = n.camera;
    t._cameraToWorldMatrix.value = e.matrixWorldInverse.clone().invert();
  }
  if ("_worldSpaceLightDir" in t && n.light && (t._worldSpaceLightDir.value = new Vector3(n.light.rotation._x, n.light.rotation._y, n.light.rotation._z).normalize()), "_lightColor" in t && n.light) {
    const e = n.light.intensity, r = new Vector3(n.light.color.r * e, n.light.color.g * e, n.light.color.b * e);
    t._lightColor.value = r;
  }
  if ("_screenSize" in t && (n.renderer.getSize(P), t._screenSize.value.set(Math.floor(P.x), Math.floor(P.y), 1 + 1 / Math.floor(P.x), 1 + 1 / Math.floor(P.y))), "_viewDir" in t && (n.camera.getWorldDirection(F), F.negate(), t._viewDir.value = F), "_pointerPosition" in t) {
    const e = "_pointerPosition" in n.renderer ? n.renderer._pointerPosition : { x: 0, y: 0 };
    t._pointerPosition.value.set(Math.floor(e.x), Math.floor(e.y));
  }
  if ("_pointerPositionNormalized" in t) {
    n.renderer.getSize(P);
    const e = "_pointerPosition" in n.renderer ? n.renderer._pointerPosition : { x: 0, y: 0 };
    t._pointerPositionNormalized.value.set(e.x / P.x, e.y / P.y);
  }
  if ("_pointerDown" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    t._pointerDown.value.set(e.state === 1 ? 1 : 0, e.button);
  }
  if ("_pointerDownPrimary" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    e.button === 0 && t._pointerDownPrimary.value.set(e.state === 1 ? 1 : 0, e.button);
  }
  if ("_pointerDownAuxiliary" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    e.button === 1 && t._pointerDownAuxiliary.value.set(e.state === 1 ? 1 : 0, e.button);
  }
  if ("_pointerDownSecondary" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    e.button === 2 && t._pointerDownSecondary.value.set(e.state === 1 ? 1 : 0, e.button);
  }
  if ("_pointerDownFrame" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    t._pointerDownFrame.value.set(e.stateFrame === 1 ? 1 : 0, e.button);
  }
  if ("_pointerDownPrimaryFrame" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    e.button === 0 && t._pointerDownPrimaryFrame.value.set(e.stateFrame === 1 ? 1 : 0, e.button);
  }
  if ("_pointerDownAuxiliaryFrame" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    e.button === 1 && t._pointerDownAuxiliaryFrame.value.set(e.stateFrame === 1 ? 1 : 0, e.button);
  }
  if ("_pointerDownSecondaryFrame" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    e.button === 2 && t._pointerDownSecondaryFrame.value.set(e.stateFrame === 1 ? 1 : 0, e.button);
  }
  if ("_pointerUp" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    t._pointerUp.value.set(e.state === 0 || e.state === 2 ? 1 : 0, e.button);
  }
  if ("_pointerUpPrimary" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    e.button === 0 ? t._pointerUpPrimary.value.set(e.state === 0 || e.state === 2 ? 1 : 0, e.button) : t._pointerUpPrimary.value.set(1, e.button);
  }
  if ("_pointerUpAuxiliary" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    e.button === 1 ? t._pointerUpAuxiliary.value.set(e.state === 0 || e.state === 2 ? 1 : 0, e.button) : t._pointerUpAuxiliary.value.set(1, e.button);
  }
  if ("_pointerUpSecondary" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    e.button === 2 ? t._pointerUpSecondary.value.set(e.state === 0 || e.state === 2 ? 1 : 0, e.button) : t._pointerUpSecondary.value.set(1, e.button);
  }
  if ("_pointerUpFrame" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    t._pointerUpFrame.value.set(e.stateFrame === 2 ? 1 : 0, e.button);
  }
  if ("_pointerUpPrimaryFrame" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    e.button === 0 ? t._pointerUpPrimaryFrame.value.set(e.stateFrame === 2 ? 1 : 0, e.button) : t._pointerUpPrimaryFrame.value.set(0, e.button);
  }
  if ("_pointerUpAuxiliaryFrame" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    e.button === 1 ? t._pointerUpAuxiliaryFrame.value.set(e.stateFrame === 2 ? 1 : 0, e.button) : t._pointerUpAuxiliaryFrame.value.set(0, e.button);
  }
  if ("_pointerUpSecondaryFrame" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    e.button === 2 ? t._pointerUpSecondaryFrame.value.set(e.stateFrame === 2 ? 1 : 0, e.button) : t._pointerUpSecondaryFrame.value.set(0, e.button);
  }
  if ("_pointerEnter" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    t._pointerEnter.value = e.viewportState === 1 ? 1 : 0;
  }
  if ("_pointerLeave" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    t._pointerLeave.value = e.viewportState === 0 || e.viewportState === 2 ? 1 : 0;
  }
  if ("_pointerEnterFrame" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    t._pointerEnterFrame.value = e.viewportStateFrame === 1 ? 1 : 0;
  }
  if ("_pointerLeaveFrame" in t) {
    const e = "_pointerData" in n.renderer ? n.renderer._pointerData : _;
    t._pointerLeaveFrame.value = e.viewportStateFrame === 2 ? 1 : 0;
  }
  if ("_keyboardTexture" in t) {
    const e = "_keyboardTexture" in n.renderer ? n.renderer._keyboardTexture : null;
    t._keyboardTexture.value = e;
  }
};
var F = new Vector3(0, 0, 0);
var T = new Vector3(0, 0, 0);
var V = new Vector3(0, 0, 0);
var P = new Vector2(0, 0);
var z = { exports: {} };
(function(n) {
  var t = Object.prototype.hasOwnProperty, e = "~";
  function r() {
  }
  Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (e = false));
  function i(l, a, s) {
    this.fn = l, this.context = a, this.once = s || false;
  }
  function c(l, a, s, d, b) {
    if (typeof s != "function")
      throw new TypeError("The listener must be a function");
    var y = new i(s, d || l, b), p = e ? e + a : a;
    return l._events[p] ? l._events[p].fn ? l._events[p] = [l._events[p], y] : l._events[p].push(y) : (l._events[p] = y, l._eventsCount++), l;
  }
  function w(l, a) {
    --l._eventsCount === 0 ? l._events = new r() : delete l._events[a];
  }
  function v() {
    this._events = new r(), this._eventsCount = 0;
  }
  v.prototype.eventNames = function() {
    var a = [], s, d;
    if (this._eventsCount === 0)
      return a;
    for (d in s = this._events)
      t.call(s, d) && a.push(e ? d.slice(1) : d);
    return Object.getOwnPropertySymbols ? a.concat(Object.getOwnPropertySymbols(s)) : a;
  }, v.prototype.listeners = function(a) {
    var s = e ? e + a : a, d = this._events[s];
    if (!d)
      return [];
    if (d.fn)
      return [d.fn];
    for (var b = 0, y = d.length, p = new Array(y); b < y; b++)
      p[b] = d[b].fn;
    return p;
  }, v.prototype.listenerCount = function(a) {
    var s = e ? e + a : a, d = this._events[s];
    return d ? d.fn ? 1 : d.length : 0;
  }, v.prototype.emit = function(a, s, d, b, y, p) {
    var D = e ? e + a : a;
    if (!this._events[D])
      return false;
    var o = this._events[D], M = arguments.length, g, u;
    if (o.fn) {
      switch (o.once && this.removeListener(a, o.fn, void 0, true), M) {
        case 1:
          return o.fn.call(o.context), true;
        case 2:
          return o.fn.call(o.context, s), true;
        case 3:
          return o.fn.call(o.context, s, d), true;
        case 4:
          return o.fn.call(o.context, s, d, b), true;
        case 5:
          return o.fn.call(o.context, s, d, b, y), true;
        case 6:
          return o.fn.call(o.context, s, d, b, y, p), true;
      }
      for (u = 1, g = new Array(M - 1); u < M; u++)
        g[u - 1] = arguments[u];
      o.fn.apply(o.context, g);
    } else {
      var A = o.length, j;
      for (u = 0; u < A; u++)
        switch (o[u].once && this.removeListener(a, o[u].fn, void 0, true), M) {
          case 1:
            o[u].fn.call(o[u].context);
            break;
          case 2:
            o[u].fn.call(o[u].context, s);
            break;
          case 3:
            o[u].fn.call(o[u].context, s, d);
            break;
          case 4:
            o[u].fn.call(o[u].context, s, d, b);
            break;
          default:
            if (!g)
              for (j = 1, g = new Array(M - 1); j < M; j++)
                g[j - 1] = arguments[j];
            o[u].fn.apply(o[u].context, g);
        }
    }
    return true;
  }, v.prototype.on = function(a, s, d) {
    return c(this, a, s, d, false);
  }, v.prototype.once = function(a, s, d) {
    return c(this, a, s, d, true);
  }, v.prototype.removeListener = function(a, s, d, b) {
    var y = e ? e + a : a;
    if (!this._events[y])
      return this;
    if (!s)
      return w(this, y), this;
    var p = this._events[y];
    if (p.fn)
      p.fn === s && (!b || p.once) && (!d || p.context === d) && w(this, y);
    else {
      for (var D = 0, o = [], M = p.length; D < M; D++)
        (p[D].fn !== s || b && !p[D].once || d && p[D].context !== d) && o.push(p[D]);
      o.length ? this._events[y] = o.length === 1 ? o[0] : o : w(this, y);
    }
    return this;
  }, v.prototype.removeAllListeners = function(a) {
    var s;
    return a ? (s = e ? e + a : a, this._events[s] && w(this, s)) : (this._events = new r(), this._eventsCount = 0), this;
  }, v.prototype.off = v.prototype.removeListener, v.prototype.addListener = v.prototype.on, v.prefixed = e, v.EventEmitter = v, n.exports = v;
})(z);
var G = z.exports;
var re = class {
  constructor() {
    x(this, "events");
    x(this, "requests", []);
    x(this, "cache", {});
    this.events = new G();
  }
  load(t) {
    this.requests.includes(t) || (this.requests.push(t), fetch(t).then((e) => e.json()).then((e) => {
      k("graph.load", { url: t, href: window.location.href }), this.cache[t] = e, this.events.emit("load", { url: t, data: e });
    }));
  }
};
var L = (n) => n instanceof Date;
var N = (n) => Object.keys(n).length === 0;
var S = (n) => n != null && typeof n == "object";
var O = (n, ...t) => Object.prototype.hasOwnProperty.call(n, ...t);
var E = (n) => S(n) && N(n);
var I = () => /* @__PURE__ */ Object.create(null);
var q = (n, t) => {
  if (n === t)
    return {};
  if (!S(n) || !S(t))
    return t;
  const e = Object.keys(n).reduce((r, i) => (O(t, i) || (r[i] = void 0), r), I());
  return L(n) || L(t) ? n.valueOf() == t.valueOf() ? {} : t : Object.keys(t).reduce((r, i) => {
    if (!O(n, i))
      return r[i] = t[i], r;
    const c = q(n[i], t[i]);
    return E(c) && !L(c) && (E(n[i]) || !E(t[i])) || (r[i] = c), r;
  }, e);
};
var H = (n) => {
  if (typeof n != "object" || n === null)
    return false;
  const t = Object.getPrototypeOf(n);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in n) && !(Symbol.iterator in n);
};
var B = (n) => H(n) ? Object.keys(n).reduce((t, e) => {
  if (e === "__esModule")
    return t;
  const r = Object.getOwnPropertyDescriptor(n, e), i = r && "get" in r, c = n[e];
  return i ? Object.defineProperty(t, e, r) : t[e] = B(c), t;
}, {}) : Array.isArray(n) ? n.map((t) => B(t)) : n;
ee();
var graphLoader = new re();
var CubeUVReflectionMapping2 = 306;
var NodeToyCullMode;
(function(NodeToyCullMode2) {
  NodeToyCullMode2["Front"] = "front";
  NodeToyCullMode2["Back"] = "back";
  NodeToyCullMode2["None"] = "none";
})(NodeToyCullMode || (NodeToyCullMode = {}));
var NodeToyMaterialType;
(function(NodeToyMaterialType2) {
  NodeToyMaterialType2["Standard"] = "standard";
  NodeToyMaterialType2["Physical"] = "physical";
  NodeToyMaterialType2["Unlit"] = "unlit";
  NodeToyMaterialType2["Image"] = "image";
})(NodeToyMaterialType || (NodeToyMaterialType = {}));
var NodeToyRenderType;
(function(NodeToyRenderType2) {
  NodeToyRenderType2["Opaque"] = "opaque";
  NodeToyRenderType2["Transparent"] = "transparent";
})(NodeToyRenderType || (NodeToyRenderType = {}));
var _NodeToyMaterial = class extends ShaderMaterial {
  constructor(options) {
    super();
    __publicField(this, "verbose", false);
    __publicField(this, "resetUniformByName", (name) => {
      this.resetUniformsByName([name]);
    });
    __publicField(this, "resetUniformsByName", (names) => {
      for (let i = 0; i < names.length; i++) {
        const key = names[i];
        for (let j = 0; j < this._data.uniforms.length; j++) {
          const uniform = this._data.uniforms[j];
          if (uniform.name === key) {
            this.uniforms[uniform.name] = {
              value: $(this._url, uniform.type, uniform.value),
              type: uniform.type
            };
            break;
          }
        }
      }
    });
    __publicField(this, "_fullURL", null);
    __publicField(this, "_url", null);
    __publicField(this, "_data", null);
    __publicField(this, "_parameters", {});
    __publicField(this, "_cullMode", NodeToyCullMode.Back);
    __publicField(this, "_type", NodeToyMaterialType.Unlit);
    __publicField(this, "_options", {});
    __publicField(this, "_envUUID", null);
    this.toneMapped = false;
    this.flatShading = false;
    this.transparent = true;
    this.onBeforeRender = this.onBeforeRender;
    this.normalMap = new Texture();
    this.tangentSpaceNormalMap = new Texture();
    this.aoMap = new Texture();
    this.polygonOffset = false;
    this.polygonOffsetFactor = 0;
    this.depthTest = true;
    this.depthWrite = true;
    this.envMapIntensity = 1;
    this.side = FrontSide;
    this.vertexShader = ShaderLib.standard.vertexShader;
    this.fragmentShader = ShaderLib.standard.fragmentShader;
    this.defines = {
      STANDARD: "",
      USE_NORMALMAP: "",
      USE_TANGENT: "",
      TANGENTSPACE_NORMALMAP: ""
    };
    this.uniforms = B(ShaderLib.physical.uniforms);
    this.uniforms.spotShadowMatrix = { value: [new Matrix4()] };
    this.lights = true;
    this.isShaderMaterial = true;
    this.isMeshStandardMaterial = false;
    this.type = "ShaderMaterial";
    this.combine = MultiplyOperation;
    if (options) {
      "verbose" in options && (this.verbose = options.verbose);
      "url" in options && (this.url = options.url);
      "toneMapped" in options && (this.toneMapped = options.toneMapped);
      "flatShading" in options && (this.flatShading = options.flatShading);
      "transparent" in options && (this.transparent = options.transparent);
      "cullMode" in options && (this.cullMode = options.cullMode);
      this._parameters = options.parameters ? options.parameters : null;
      "polygonOffset" in options && (this.polygonOffset = options.polygonOffset);
      "polygonOffsetFactor" in options && (this.polygonOffsetFactor = options.polygonOffsetFactor);
      "depthTest" in options && (this.depthTest = options.depthTest);
      "depthWrite" in options && (this.depthWrite = options.depthWrite);
      "envMapIntensity" in options && (this.envMapIntensity = options.envMapIntensity);
      "data" in options && (this.data = options.data);
      this._options = options;
    }
    graphLoader.events.on("load", (obj) => {
      if (obj.url === this._fullURL) {
        this.loadShader(obj.data);
      }
    });
  }
  static tick() {
    _NodeToyMaterial._time.deltaTime = _NodeToyMaterial._clock.getDelta();
    _NodeToyMaterial._time.time += _NodeToyMaterial._time.deltaTime;
  }
  get cullMode() {
    return this._cullMode;
  }
  set cullMode(value) {
    this._cullMode = value;
    this.side = this.getTHREECullMode(value);
  }
  recompile() {
    this.version++;
    this.dispose();
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(source) {
    super.copy(source);
    this._url = source._url;
    this._data = source._data;
    this.verbose = source.verbose;
    this._parameters && (this._parameters = __spreadValues({}, source._parameters));
    this.vertexShader = source.vertexShader;
    this.fragmentShader = source.fragmentShader;
    this.uniforms = B(source.uniforms);
    this.recompile();
    return this;
  }
  get url() {
    return this._url;
  }
  set url(value) {
    this._url = value;
    if (value) {
      const url = this._fullURL = Z(value);
      if (this.verbose) {
        console.log(`[NodeToy] loading graph... | url: ${url}`);
      }
      if (url in graphLoader.cache) {
        this.loadShader(graphLoader.cache[url]);
      } else {
        graphLoader.load(url);
      }
    } else {
      console.warn(`[NodeToy] Missing material graph URL. Cannot load shader.`);
    }
  }
  get data() {
    return this._data;
  }
  set data(value) {
    if (!value) {
      console.warn(`[NodeToy] Missing material graph data. Cannot load shader.`);
      return;
    }
    if (this.verbose) {
      console.log(`[NodeToy] seting graph data... | data:`, value);
    }
    this.loadShader(value);
  }
  get parameters() {
    return this._parameters;
  }
  set parameters(value) {
    this._parameters = value;
    if (this._data) {
      const uniforms = this._data.uniforms;
      const current = B(this.uniforms);
      const updated = m(this.url, this.uniforms, uniforms, value);
      const updatedKeys = Object.keys(q(current, updated));
      for (let i = 0; i < updatedKeys.length; i++) {
        const key = updatedKeys[i];
        this.uniforms[key] = updated[key];
      }
    }
  }
  updateUniforms(dataUniforms) {
    let uniforms = [];
    Object.assign(uniforms, dataUniforms);
    if (this._parameters !== null) {
      for (const key in this._parameters) {
        for (let i = 0; i < uniforms.length; i++) {
          if (key === uniforms[i].name)
            uniforms[i].value = this._parameters[key];
        }
      }
    }
    return uniforms;
  }
  loadShader(data) {
    if (this.verbose) {
      console.log(`[NodeToy] graph loaded.`, data, m(this.url, this.uniforms, data.uniforms));
    }
    this._data = data;
    this.vertexShader = data.vertex;
    this.fragmentShader = data.fragment;
    const updatedUniforms = this.updateUniforms(data.uniforms);
    this.uniforms = m(this.url, this.uniforms, updatedUniforms);
    this.recompile();
    if ("cullMode" in data && !("cullMode" in this._options)) {
      this.cullMode = data.cullMode;
    }
    if ("lightModel" in data) {
      this._type = data.lightModel;
    }
    if ("renderType" in data) {
      this.transparent = data.renderType === NodeToyRenderType.Transparent;
    }
  }
  onBeforeRender(renderer, scene, camera, _geometry, object) {
    const frame = {
      camera,
      object,
      renderer,
      scene,
      light: null,
      time: _NodeToyMaterial._time.time,
      deltaTime: _NodeToyMaterial._time.deltaTime
    };
    if (!renderer._rendererDOM) {
      renderer._rendererDOM = new Q(renderer);
    }
    if (this.uniforms) {
      ne(frame, this.uniforms);
    }
    if (scene.environment && this._type !== NodeToyMaterialType.Unlit) {
      if (this._envUUID != scene.environment.uuid) {
        this._envUUID = scene.environment.uuid;
        const env = scene.environment.clone();
        env.mapping = CubeUVReflectionMapping;
        this.envMap = env;
        this.envMap.mapping = CubeUVReflectionMapping;
        this.envMapMode = CubeUVReflectionMapping2;
        this.uniforms.envMap.value = env;
        this.uniforms.envMapIntensity.value = this.envMapIntensity;
      }
      this.defines = {
        STANDARD: "",
        USE_NORMALMAP: "",
        USE_ENVMAP: "",
        ENVMAP_TYPE_CUBE_UV: "",
        USE_TANGENT: "",
        TANGENTSPACE_NORMALMAP: ""
      };
    } else {
      this.envMap = null;
      if ("envMap" in this.uniforms) {
        this.uniforms.envMap.value = null;
      }
      this.defines = {
        STANDARD: "",
        USE_NORMALMAP: "",
        USE_TANGENT: "",
        TANGENTSPACE_NORMALMAP: ""
      };
    }
    if (scene.fog) {
      this.defines.USE_FOG = "";
    }
  }
  getTHREECullMode(cullMode) {
    if (cullMode === NodeToyCullMode.None) {
      return DoubleSide;
    }
    if (cullMode === NodeToyCullMode.Front) {
      return BackSide;
    }
    return FrontSide;
  }
};
var NodeToyMaterial$1 = _NodeToyMaterial;
__publicField(NodeToyMaterial$1, "_bindDOMEvents", () => {
});
__publicField(NodeToyMaterial$1, "_time", { time: 0, deltaTime: 0 });
__publicField(NodeToyMaterial$1, "_clock", new Clock());
extend({ ThreeNodeToyMaterial: NodeToyMaterial$1 });
var NodeToyMaterial = (0, import_react.forwardRef)(
  (props, ref) => {
    return import_react.default.createElement("threeNodeToyMaterial", {
      ref,
      url: props.url,
      data: props.data,
      parameters: props.parameters,
      toneMapped: props.toneMapped,
      flatShading: props.flatShading,
      transparent: props.transparent,
      cullMode: props.cullMode,
      verbose: props.verbose,
      polygonOffset: props.polygonOffset,
      polygonOffsetFactor: props.polygonOffsetFactor,
      depthTest: props.depthTest,
      depthWrite: props.depthTest,
      envMapIntensity: props.envMapIntensity,
      name: props.name
    });
  }
);
var NodeToyTick = () => {
  useFrame(() => {
    NodeToyMaterial$1.tick();
  });
  return import_react.default.createElement(import_react.default.Fragment, null);
};
var swapMaterial = (nodes, material, newMaterial) => {
  if (Array.isArray(nodes)) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.isMesh && node.material === material) {
        node.material = newMaterial;
      }
      if (node.children && node.children.length) {
        swapMaterial(node.children, material, newMaterial);
      }
    }
  } else {
    swapMaterial([nodes], material, newMaterial);
  }
};
export {
  NodeToyCullMode,
  NodeToyMaterial,
  NodeToyMaterialType,
  NodeToyTick,
  NodeToyMaterial$1 as ThreeNodeToyMaterial,
  swapMaterial
};
//# sourceMappingURL=@nodetoy_react-nodetoy.js.map