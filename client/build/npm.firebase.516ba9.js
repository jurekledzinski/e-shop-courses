(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{123:function(e,t,r){"use strict";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var n=function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};var h=r(125),p=r(137);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function a(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;for(var n=Array(e),o=0,t=0;t<r;t++)for(var i=arguments[t],a=0,s=i.length;a<s;a++,o++)n[o]=i[a];return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var s,o=[];(f=s=s||{})[f.DEBUG=0]="DEBUG",f[f.VERBOSE=1]="VERBOSE",f[f.INFO=2]="INFO",f[f.WARN=3]="WARN",f[f.ERROR=4]="ERROR",f[f.SILENT=5]="SILENT";function i(e,t){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];if(!(t<e.logLevel)){var o=(new Date).toISOString(),i=l[t];if(!i)throw new Error("Attempted to log a message with an invalid logType (value: "+t+")");console[i].apply(console,a(["["+o+"]  "+e.name+":"],r))}}var u={debug:s.DEBUG,verbose:s.VERBOSE,info:s.INFO,warn:s.WARN,error:s.ERROR,silent:s.SILENT},c=s.INFO,l=((r={})[s.DEBUG]="log",r[s.VERBOSE]="log",r[s.INFO]="info",r[s.WARN]="warn",r[s.ERROR]="error",r),f=(Object.defineProperty(d.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in s))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),d.prototype.setLogLevel=function(e){this._logLevel="string"==typeof e?u[e]:e},Object.defineProperty(d.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(d.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),d.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,a([this,s.DEBUG],e)),this._logHandler.apply(this,a([this,s.DEBUG],e))},d.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,a([this,s.VERBOSE],e)),this._logHandler.apply(this,a([this,s.VERBOSE],e))},d.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,a([this,s.INFO],e)),this._logHandler.apply(this,a([this,s.INFO],e))},d.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,a([this,s.WARN],e)),this._logHandler.apply(this,a([this,s.WARN],e))},d.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,a([this,s.ERROR],e)),this._logHandler.apply(this,a([this,s.ERROR],e))},d);function d(e){this.name=e,this._logLevel=c,this._logHandler=i,this._userLogHandler=null,o.push(this)}function _(t){o.forEach(function(e){e.setLogLevel(t)})}function g(a,t){for(var e=0,r=o;e<r.length;e++)!function(e){var i=null;t&&t.level&&(i=u[t.level]),e.userLogHandler=null===a?null:function(e,t){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];var o=r.map(function(e){if(null==e)return null;if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(e){return null}}).filter(function(e){return e}).join(" ");t>=(null!=i?i:e.logLevel)&&a({level:s[t].toLowerCase(),message:o,args:r,type:e.name})}}(r[e])}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var r=((r={})["no-app"]="No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",r["bad-app-name"]="Illegal App name: '{$appName}",r["duplicate-app"]="Firebase App named '{$appName}' already exists",r["app-deleted"]="Firebase App named '{$appName}' already deleted",r["invalid-app-argument"]="firebase.{$appName}() takes either no argument or a Firebase App instance.",r["invalid-log-argument"]="First argument to `onLog` must be null or a function.",r),v=new h.b("app","Firebase",r),b="@firebase/app",m="[DEFAULT]",y=((r={})[b]="fire-core",r["@firebase/analytics"]="fire-analytics",r["@firebase/auth"]="fire-auth",r["@firebase/database"]="fire-rtdb",r["@firebase/functions"]="fire-fn",r["@firebase/installations"]="fire-iid",r["@firebase/messaging"]="fire-fcm",r["@firebase/performance"]="fire-perf",r["@firebase/remote-config"]="fire-rc",r["@firebase/storage"]="fire-gcs",r["@firebase/firestore"]="fire-fst",r["fire-js"]="fire-js",r["firebase-wrapper"]="fire-js-all",r),w=new f("@firebase/app"),R=(Object.defineProperty(O.prototype,"automaticDataCollectionEnabled",{get:function(){return this.checkDestroyed_(),this.automaticDataCollectionEnabled_},set:function(e){this.checkDestroyed_(),this.automaticDataCollectionEnabled_=e},enumerable:!1,configurable:!0}),Object.defineProperty(O.prototype,"name",{get:function(){return this.checkDestroyed_(),this.name_},enumerable:!1,configurable:!0}),Object.defineProperty(O.prototype,"options",{get:function(){return this.checkDestroyed_(),this.options_},enumerable:!1,configurable:!0}),O.prototype.delete=function(){var t=this;return new Promise(function(e){t.checkDestroyed_(),e()}).then(function(){return t.firebase_.INTERNAL.removeApp(t.name_),Promise.all(t.container.getProviders().map(function(e){return e.delete()}))}).then(function(){t.isDeleted_=!0})},O.prototype._getService=function(e,t){return void 0===t&&(t=m),this.checkDestroyed_(),this.container.getProvider(e).getImmediate({identifier:t})},O.prototype._removeServiceInstance=function(e,t){void 0===t&&(t=m),this.container.getProvider(e).clearInstance(t)},O.prototype._addComponent=function(t){try{this.container.addComponent(t)}catch(e){w.debug("Component "+t.name+" failed to register with FirebaseApp "+this.name,e)}},O.prototype._addOrOverwriteComponent=function(e){this.container.addOrOverwriteComponent(e)},O.prototype.toJSON=function(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}},O.prototype.checkDestroyed_=function(){if(this.isDeleted_)throw v.create("app-deleted",{appName:this.name_})},O);function O(e,t,r){var n=this;this.firebase_=r,this.isDeleted_=!1,this.name_=t.name,this.automaticDataCollectionEnabled_=t.automaticDataCollectionEnabled||!1,this.options_=Object(h.f)(e),this.container=new p.b(t.name),this._addComponent(new p.a("app",function(){return n},"PUBLIC")),this.firebase_.INTERNAL.components.forEach(function(e){return n._addComponent(e)})}R.prototype.name&&R.prototype.options||R.prototype.delete||console.log("dc");var k="8.2.9";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T(a){var s={},u=new Map,c={__esModule:!0,initializeApp:function(e,t){void 0===t&&(t={});"object"==typeof t&&null!==t||(t={name:t});var r=t;void 0===r.name&&(r.name=m);t=r.name;if("string"!=typeof t||!t)throw v.create("bad-app-name",{appName:String(t)});if(Object(h.d)(s,t))throw v.create("duplicate-app",{appName:t});r=new a(e,r,c);return s[t]=r},app:l,registerVersion:function(e,t,r){var n=null!==(o=y[e])&&void 0!==o?o:e;r&&(n+="-"+r);var o=n.match(/\s|\//),e=t.match(/\s|\//);if(o||e){r=['Unable to register library "'+n+'" with version "'+t+'":'];return o&&r.push('library name "'+n+'" contains illegal characters (whitespace or "/")'),o&&e&&r.push("and"),e&&r.push('version name "'+t+'" contains illegal characters (whitespace or "/")'),void w.warn(r.join(" "))}i(new p.a(n+"-version",function(){return{library:n,version:t}},"VERSION"))},setLogLevel:_,onLog:function(e,t){if(null!==e&&"function"!=typeof e)throw v.create("invalid-log-argument");g(e,t)},apps:null,SDK_VERSION:k,INTERNAL:{registerComponent:i,removeApp:function(e){delete s[e]},components:u,useAsService:function(e,t){if("serverAuth"===t)return null;return t}}};function l(e){if(e=e||m,!Object(h.d)(s,e))throw v.create("no-app",{appName:e});return s[e]}function i(r){var e,n=r.name;if(u.has(n))return w.debug("There were multiple attempts to register component "+n+"."),"PUBLIC"===r.type?c[n]:null;u.set(n,r),"PUBLIC"===r.type&&(e=function(e){if("function"!=typeof(e=void 0===e?l():e)[n])throw v.create("invalid-app-argument",{appName:n});return e[n]()},void 0!==r.serviceProps&&Object(h.g)(e,r.serviceProps),c[n]=e,a.prototype[n]=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._getService.bind(this,n).apply(this,r.multipleInstances?e:[])});for(var t=0,o=Object.keys(s);t<o.length;t++){var i=o[t];s[i]._addComponent(r)}return"PUBLIC"===r.type?c[n]:null}return c.default=c,Object.defineProperty(c,"apps",{get:function(){return Object.keys(s).map(function(e){return s[e]})}}),l.App=a,c}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var r=function e(){var t=T(R);return t.INTERNAL=n(n({},t.INTERNAL),{createFirebaseNamespace:e,extendNamespace:function(e){Object(h.g)(t,e)},createSubscribe:h.e,ErrorFactory:h.b,deepExtend:h.g}),t}(),E=(P.prototype.getPlatformInfoString=function(){return this.container.getProviders().map(function(e){if(function(e){e=e.getComponent();return"VERSION"===(null==e?void 0:e.type)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)){e=e.getImmediate();return e.library+"/"+e.version}return null}).filter(function(e){return e}).join(" ")},P);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P(e){this.container=e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object(h.h)()&&void 0!==self.firebase&&(w.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  "),(f=self.firebase.SDK_VERSION)&&0<=f.indexOf("LITE")&&w.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    "));var S=r.initializeApp;r.initializeApp=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return Object(h.i)()&&w.warn('\n      Warning: This is a browser-targeted Firebase bundle but it appears it is being\n      run in a Node environment.  If running in a Node environment, make sure you\n      are using the bundle specified by the "main" field in package.json.\n      \n      If you are using Webpack, you can specify "main" as the first item in\n      "resolve.mainFields":\n      https://webpack.js.org/configuration/resolve/#resolvemainfields\n      \n      If using Rollup, use the @rollup/plugin-node-resolve plugin and specify "main"\n      as the first item in "mainFields", e.g. [\'main\', \'module\'].\n      https://github.com/rollup/@rollup/plugin-node-resolve\n      '),S.apply(void 0,e)};var x,C,A=r;(x=A).INTERNAL.registerComponent(new p.a("platform-logger",function(e){return new E(e)},"PRIVATE")),x.registerVersion(b,"0.6.15",C),x.registerVersion("fire-js","");t.a=A},125:function(e,R,O){"use strict";!function(e){O.d(R,"a",function(){return i}),O.d(R,"b",function(){return f}),O.d(R,"c",function(){return h}),O.d(R,"d",function(){return g}),O.d(R,"e",function(){return b}),O.d(R,"f",function(){return n}),O.d(R,"g",function(){return o}),O.d(R,"h",function(){return u}),O.d(R,"i",function(){return s});function t(e){for(var t=[],r=0,n=0;n<e.length;n++){var o=e.charCodeAt(n);o<128?t[r++]=o:(o<2048?t[r++]=o>>6|192:(55296==(64512&o)&&n+1<e.length&&56320==(64512&e.charCodeAt(n+1))?(o=65536+((1023&o)<<10)+(1023&e.charCodeAt(++n)),t[r++]=o>>18|240,t[r++]=o>>12&63|128):t[r++]=o>>12|224,t[r++]=o>>6&63|128),t[r++]=63&o|128)}return t}var r=O(152);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function n(e){return o(void 0,e)}function o(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(var r in t)t.hasOwnProperty(r)&&"__proto__"!==r&&(e[r]=o(e[r],t[r]));return e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var i=(a.prototype.wrapCallback=function(r){var n=this;return function(e,t){e?n.reject(e):n.resolve(t),"function"==typeof r&&(n.promise.catch(function(){}),1===r.length?r(e):r(e,t))}},a);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function a(){var r=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise(function(e,t){r.resolve=e,r.reject=t})}function s(){try{return"[object process]"===Object.prototype.toString.call(e.process)}catch(e){return!1}}function u(){return"object"==typeof self&&self.self===self}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var c,l="FirebaseError",h=(c=Error,Object(r.a)(p,c),p);function p(e,t,r){t=c.call(this,t)||this;return t.code=e,t.customData=r,t.name=l,Object.setPrototypeOf(t,p.prototype),Error.captureStackTrace&&Error.captureStackTrace(t,f.prototype.create),t}var f=(d.prototype.create=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n,o=t[0]||{},i=this.service+"/"+e,e=this.errors[e],e=e?(n=o,e.replace(_,function(e,t){var r=n[t];return null!=r?String(r):"<"+t+"?>"})):"Error",e=this.serviceName+": "+e+" ("+i+").";return new h(i,e,o)},d);function d(e,t,r){this.service=e,this.serviceName=t,this.errors=r}var _=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function g(e,t){return Object.prototype.hasOwnProperty.call(e,t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
v.prototype.reset=function(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0},v.prototype.compress_=function(e,t){t=t||0;var r=this.W_;if("string"==typeof e)for(var n=0;n<16;n++)r[n]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(n=0;n<16;n++)r[n]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(n=16;n<80;n++){var o=r[n-3]^r[n-8]^r[n-14]^r[n-16];r[n]=4294967295&(o<<1|o>>>31)}for(var i,a=this.chain_[0],s=this.chain_[1],u=this.chain_[2],c=this.chain_[3],l=this.chain_[4],n=0;n<80;n++)var h=n<40?n<20?(i=c^s&(u^c),1518500249):(i=s^u^c,1859775393):n<60?(i=s&u|c&(s|u),2400959708):(i=s^u^c,3395469782),o=(a<<5|a>>>27)+i+l+h+r[n]&4294967295,l=c,c=u,u=4294967295&(s<<30|s>>>2),s=a,a=o;this.chain_[0]=this.chain_[0]+a&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+u&4294967295,this.chain_[3]=this.chain_[3]+c&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295},v.prototype.update=function(e,t){if(null!=e){for(var r=(t=void 0===t?e.length:t)-this.blockSize,n=0,o=this.buf_,i=this.inbuf_;n<t;){if(0===i)for(;n<=r;)this.compress_(e,n),n+=this.blockSize;if("string"==typeof e){for(;n<t;)if(o[i]=e.charCodeAt(n),++n,++i===this.blockSize){this.compress_(o),i=0;break}}else for(;n<t;)if(o[i]=e[n],++n,++i===this.blockSize){this.compress_(o),i=0;break}}this.inbuf_=i,this.total_+=t}},v.prototype.digest=function(){var e=[],t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(var r=this.blockSize-1;56<=r;r--)this.buf_[r]=255&t,t/=256;this.compress_(this.buf_);for(var n=0,r=0;r<5;r++)for(var o=24;0<=o;o-=8)e[n]=this.chain_[r]>>o&255,++n;return e};function v(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(var e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}function b(e,t){t=new m(e,t);return t.subscribe.bind(t)}var m=(y.prototype.next=function(t){this.forEachObserver(function(e){e.next(t)})},y.prototype.error=function(t){this.forEachObserver(function(e){e.error(t)}),this.close(t)},y.prototype.complete=function(){this.forEachObserver(function(e){e.complete()}),this.close()},y.prototype.subscribe=function(e,t,r){var n,o=this;if(void 0===e&&void 0===t&&void 0===r)throw new Error("Missing Observer.");void 0===(n=function(e,t){if("object"!=typeof e||null===e)return!1;for(var r=0,n=t;r<n.length;r++){var o=n[r];if(o in e&&"function"==typeof e[o])return!0}return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:r}).next&&(n.next=w),void 0===n.error&&(n.error=w),void 0===n.complete&&(n.complete=w);r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(function(){try{o.finalError?n.error(o.finalError):n.complete()}catch(e){}}),this.observers.push(n),r},y.prototype.unsubscribeOne=function(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],--this.observerCount,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},y.prototype.forEachObserver=function(e){if(!this.finalized)for(var t=0;t<this.observers.length;t++)this.sendOne(t,e)},y.prototype.sendOne=function(e,t){var r=this;this.task.then(function(){if(void 0!==r.observers&&void 0!==r.observers[e])try{t(r.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})},y.prototype.close=function(e){var t=this;this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(function(){t.observers=void 0,t.onNoObservers=void 0}))},y);function y(e,t){var r=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(function(){e(r)}).catch(function(e){r.error(e)})}function w(){}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}.call(this,O(53))},137:function(e,t,r){"use strict";r.d(t,"a",function(){return s}),r.d(t,"b",function(){return d});var i=function(){return(i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function n(e,a,s,u){return new(s=s||Promise)(function(r,t){function n(e){try{i(u.next(e))}catch(e){t(e)}}function o(e){try{i(u.throw(e))}catch(e){t(e)}}function i(e){var t;e.done?r(e.value):((t=e.value)instanceof s?t:new s(function(e){e(t)})).then(n,o)}i((u=u.apply(e,a||[])).next())})}function o(r,n){var o,i,a,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]},e={next:t(0),throw:t(1),return:t(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(o)throw new TypeError("Generator is already executing.");for(;s;)try{if(o=1,i&&(a=2&t[0]?i.return:t[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,t[1])).done)return a;switch(i=0,(t=a?[2&t[0],a.value]:t)[0]){case 0:case 1:a=t;break;case 4:return s.label++,{value:t[1],done:!1};case 5:s.label++,i=t[1],t=[0];continue;case 7:t=s.ops.pop(),s.trys.pop();continue;default:if(!(a=0<(a=s.trys).length&&a[a.length-1])&&(6===t[0]||2===t[0])){s=0;continue}if(3===t[0]&&(!a||t[1]>a[0]&&t[1]<a[3])){s.label=t[1];break}if(6===t[0]&&s.label<a[1]){s.label=a[1],a=t;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(t);break}a[2]&&s.ops.pop(),s.trys.pop();continue}t=n.call(r,s)}catch(e){t=[6,e],i=0}finally{o=a=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}}function l(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return{value:(e=e&&n>=e.length?void 0:e)&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function h(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,i=r.call(e),a=[];try{for(;(void 0===t||0<t--)&&!(n=i.next()).done;)a.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return a}var a=r(125),s=(u.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},u.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},u.prototype.setServiceProps=function(e){return this.serviceProps=e,this},u);function u(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY"}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var p="[DEFAULT]",c=(f.prototype.get=function(e){void 0===e&&(e=p);var t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){var r=new a.a;this.instancesDeferred.set(t,r);try{var n=this.getOrInitializeService(t);n&&r.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise},f.prototype.getImmediate=function(e){var t=i({identifier:p,optional:!1},e),e=t.identifier,r=t.optional,n=this.normalizeInstanceIdentifier(e);try{var o=this.getOrInitializeService(n);if(o)return o;if(r)return null;throw Error("Service "+this.name+" is not available")}catch(e){if(r)return null;throw e}},f.prototype.getComponent=function(){return this.component},f.prototype.setComponent=function(e){var t,r;if(e.name!==this.name)throw Error("Mismatching Component "+e.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if("EAGER"===(this.component=e).instantiationMode)try{this.getOrInitializeService(p)}catch(e){}try{for(var n=l(this.instancesDeferred.entries()),o=n.next();!o.done;o=n.next()){var i=h(o.value,2),a=i[0],s=i[1],u=this.normalizeInstanceIdentifier(a);try{var c=this.getOrInitializeService(u);s.resolve(c)}catch(e){}}}catch(e){t={error:e}}finally{try{o&&!o.done&&(r=n.return)&&r.call(n)}finally{if(t)throw t.error}}},f.prototype.clearInstance=function(e){void 0===e&&(e=p),this.instancesDeferred.delete(e),this.instances.delete(e)},f.prototype.delete=function(){return n(this,void 0,void 0,function(){var t;return o(this,function(e){switch(e.label){case 0:return t=Array.from(this.instances.values()),[4,Promise.all(function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(h(arguments[t]));return e}(t.filter(function(e){return"INTERNAL"in e}).map(function(e){return e.INTERNAL.delete()}),t.filter(function(e){return"_delete"in e}).map(function(e){return e._delete()})))];case 1:return e.sent(),[2]}})})},f.prototype.isComponentSet=function(){return null!=this.component},f.prototype.isInitialized=function(e){return void 0===e&&(e=p),this.instances.has(e)},f.prototype.getOrInitializeService=function(e){var t,r=this.instances.get(e);return!r&&this.component&&(r=this.component.instanceFactory(this.container,(t=e)===p?void 0:t),this.instances.set(e,r)),r||null},f.prototype.normalizeInstanceIdentifier=function(e){return!this.component||this.component.multipleInstances?e:p},f);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var d=(_.prototype.addComponent=function(e){var t=this.getProvider(e.name);if(t.isComponentSet())throw new Error("Component "+e.name+" has already been registered with "+this.name);t.setComponent(e)},_.prototype.addOrOverwriteComponent=function(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)},_.prototype.getProvider=function(e){if(this.providers.has(e))return this.providers.get(e);var t=new c(e,this);return this.providers.set(e,t),t},_.prototype.getProviders=function(){return Array.from(this.providers.values())},_);function _(e){this.name=e,this.providers=new Map}},151:function(e,t,r){"use strict";var n=r(123);r.d(t,"a",function(){return n.a});
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
n.a.registerVersion("firebase","8.2.9","app")},152:function(e,t,r){"use strict";r.d(t,"a",function(){return o});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};function o(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}},202:function(e,t,r){"use strict";var n=r(123),o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var i=function(){return(i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function h(e,a,s,u){return new(s=s||Promise)(function(r,t){function n(e){try{i(u.next(e))}catch(e){t(e)}}function o(e){try{i(u.throw(e))}catch(e){t(e)}}function i(e){var t;e.done?r(e.value):((t=e.value)instanceof s?t:new s(function(e){e(t)})).then(n,o)}i((u=u.apply(e,a||[])).next())})}function p(r,n){var o,i,a,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]},e={next:t(0),throw:t(1),return:t(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(o)throw new TypeError("Generator is already executing.");for(;s;)try{if(o=1,i&&(a=2&t[0]?i.return:t[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,t[1])).done)return a;switch(i=0,(t=a?[2&t[0],a.value]:t)[0]){case 0:case 1:a=t;break;case 4:return s.label++,{value:t[1],done:!1};case 5:s.label++,i=t[1],t=[0];continue;case 7:t=s.ops.pop(),s.trys.pop();continue;default:if(!(a=0<(a=s.trys).length&&a[a.length-1])&&(6===t[0]||2===t[0])){s=0;continue}if(3===t[0]&&(!a||t[1]>a[0]&&t[1]<a[3])){s.label=t[1];break}if(6===t[0]&&s.label<a[1]){s.label=a[1],a=t;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(t);break}a[2]&&s.ops.pop(),s.trys.pop();continue}t=n.call(r,s)}catch(e){t=[6,e],i=0}finally{o=a=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}}function g(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;for(var n=Array(e),o=0,t=0;t<r;t++)for(var i=arguments[t],a=0,s=i.length;a<s;a++,o++)n[o]=i[a];return n}var a,s,u,c=r(125),l=r(137),f="firebasestorage.googleapis.com",d="storageBucket",v=(a=c.c,o(s=b,u=a),s.prototype=null===u?Object.create(u):(_.prototype=u.prototype,new _),b.prototype._codeEquals=function(e){return m(e)===this.code},Object.defineProperty(b.prototype,"message",{get:function(){return this.customData.serverResponse?this.message+"\n"+this.customData.serverResponse:this.message},enumerable:!1,configurable:!0}),Object.defineProperty(b.prototype,"serverResponse",{get:function(){return this.customData.serverResponse},set:function(e){this.customData.serverResponse=e},enumerable:!1,configurable:!0}),b);function _(){this.constructor=s}function b(e,t){e=a.call(this,m(e),"Firebase Storage: "+t+" ("+m(e)+")")||this;return e.customData={serverResponse:null},Object.setPrototypeOf(e,b.prototype),e}function m(e){return"storage/"+e}function y(){return new v("unknown","An unknown error occurred, please check the error payload for server response.")}function w(){return new v("canceled","User canceled the upload/download.")}function R(){return new v("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.")}function O(e){return new v("invalid-argument",e)}function k(){return new v("app-deleted","The Firebase app was deleted.")}function T(e){return new v("invalid-root-operation","The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function E(e,t){return new v("invalid-format","String does not match format '"+e+"': "+t)}function P(e){throw new v("internal-error","Internal error: "+e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var S={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"},x=function(e,t){this.data=e,this.contentType=t||null};function C(e,t){switch(e){case S.RAW:return new x(A(t));case S.BASE64:case S.BASE64URL:return new x(I(e,t));case S.DATA_URL:return new x(function(e){e=new U(e);return e.base64?I(S.BASE64,e.rest):function(e){var t;try{t=decodeURIComponent(e)}catch(e){throw E(S.DATA_URL,"Malformed data URL.")}return A(t)}(e.rest)}(t),new U(t).contentType)}throw y()}function A(e){for(var t=[],r=0;r<e.length;r++){var n=e.charCodeAt(r);n<=127?t.push(n):n<=2047?t.push(192|n>>6,128|63&n):55296==(64512&n)?r<e.length-1&&56320==(64512&e.charCodeAt(r+1))?(n=65536|(1023&n)<<10|1023&e.charCodeAt(++r),t.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n)):t.push(239,191,189):56320==(64512&n)?t.push(239,191,189):t.push(224|n>>12,128|n>>6&63,128|63&n)}return new Uint8Array(t)}function I(t,e){switch(t){case S.BASE64:var r=-1!==e.indexOf("-"),n=-1!==e.indexOf("_");if(r||n)throw E(t,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break;case S.BASE64URL:n=-1!==e.indexOf("+"),r=-1!==e.indexOf("/");if(n||r)throw E(t,"Invalid character '"+(n?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/")}var o;try{o=atob(e)}catch(e){throw E(t,"Invalid character found")}for(var i=new Uint8Array(o.length),a=0;a<o.length;a++)i[a]=o.charCodeAt(a);return i}var U=function(e){var t;if(this.base64=!1,(this.contentType=null)===(t=e.match(/^data:([^,]+)?,/)))throw E(S.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");var r,n=t[1]||null;null!=n&&(this.base64=(r=";base64",(t=n).length>=r.length&&t.substring(t.length-r.length)===r),this.contentType=this.base64?n.substring(0,n.length-";base64".length):n),this.rest=e.substring(e.indexOf(",")+1)};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var N,j={STATE_CHANGED:"state_changed"},L={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function D(e){switch(e){case"running":case"pausing":case"canceling":return L.RUNNING;case"paused":return L.PAUSED;case"success":return L.SUCCESS;case"canceled":return L.CANCELED;case"error":default:return L.ERROR}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(c=N=N||{})[c.NO_ERROR=0]="NO_ERROR",c[c.NETWORK_ERROR=1]="NETWORK_ERROR",c[c.ABORT=2]="ABORT";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var F=(z.prototype.send=function(e,t,r,n){if(this.sent_)throw P("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==n)for(var o in n)n.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,n[o].toString());return void 0!==r?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_},z.prototype.getErrorCode=function(){if(!this.sent_)throw P("cannot .getErrorCode() before sending");return this.errorCode_},z.prototype.getStatus=function(){if(!this.sent_)throw P("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}},z.prototype.getResponseText=function(){if(!this.sent_)throw P("cannot .getResponseText() before sending");return this.xhr_.responseText},z.prototype.abort=function(){this.xhr_.abort()},z.prototype.getResponseHeader=function(e){return this.xhr_.getResponseHeader(e)},z.prototype.addUploadProgressListener=function(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)},z.prototype.removeUploadProgressListener=function(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)},z);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(){var t=this;this.sent_=!1,this.xhr_=new XMLHttpRequest,this.errorCode_=N.NO_ERROR,this.sendPromise_=new Promise(function(e){t.xhr_.addEventListener("abort",function(){t.errorCode_=N.ABORT,e(t)}),t.xhr_.addEventListener("error",function(){t.errorCode_=N.NETWORK_ERROR,e(t)}),t.xhr_.addEventListener("load",function(){e(t)})})}var H=(B.prototype.createXhrIo=function(){return new F},B);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(){}function M(e){return"string"==typeof e||e instanceof String}function q(e){return G()&&e instanceof Blob}function G(){return"undefined"!=typeof Blob}function V(e,t,r,n){if(n<t)throw O("Invalid value for '"+e+"'. Expected "+t+" or greater.");if(r<n)throw O("Invalid value for '"+e+"'. Expected "+r+" or less.")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0;if(void 0!==r){for(var n=new r,o=0;o<e.length;o++)n.append(e[o]);return n.getBlob()}if(G())return new Blob(e);throw new v("unsupported-environment","This browser doesn't seem to support creating Blobs")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var X=($.prototype.size=function(){return this.size_},$.prototype.type=function(){return this.type_},$.prototype.slice=function(e,t){if(q(this.data_)){var r=this.data_,n=(o=e,n=t,(r=r).webkitSlice?r.webkitSlice(o,n):r.mozSlice?r.mozSlice(o,n):r.slice?r.slice(o,n):null);return null===n?null:new $(n)}var o,n;return new $(new Uint8Array(this.data_.buffer,e,t-e),!0)},$.getBlob=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];if(G()){var r=e.map(function(e){return e instanceof $?e.data_:e});return new $(W.apply(null,r))}var r=e.map(function(e){return M(e)?C(S.RAW,e).data:e.data_}),n=0;r.forEach(function(e){n+=e.byteLength});var o=new Uint8Array(n),i=0;return r.forEach(function(e){for(var t=0;t<e.length;t++)o[i++]=e[t]}),new $(o,!0)},$.prototype.uploadData=function(){return this.data_},$);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(e,t){var r=0,n="";q(e)?(r=(this.data_=e).size,n=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=n}var K=(Object.defineProperty(J.prototype,"path",{get:function(){return this.path_},enumerable:!1,configurable:!0}),Object.defineProperty(J.prototype,"isRoot",{get:function(){return 0===this.path.length},enumerable:!1,configurable:!0}),J.prototype.fullServerUrl=function(){var e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)},J.prototype.bucketOnlyServerUrl=function(){return"/b/"+encodeURIComponent(this.bucket)+"/o"},J.makeFromBucketSpec=function(t){var e;try{e=J.makeFromUrl(t)}catch(e){return new J(t,"")}if(""===e.path)return e;throw new v("invalid-default-bucket","Invalid default bucket '"+t+"'.")},J.makeFromUrl=function(e){var t=null,r="([A-Za-z0-9.\\-_]+)";var n=new RegExp("^gs://"+r+"(/(.*))?$","i");function o(e){e.path_=decodeURIComponent(e.path)}for(var i=f.replace(/[.]/g,"\\."),a=[{regex:n,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp("^https?://"+i+"/v[A-Za-z0-9_]+/b/"+r+"/o(/([^?#]*).*)?$","i"),indices:{bucket:1,path:3},postModify:o},{regex:new RegExp("^https?://(?:storage.googleapis.com|storage.cloud.google.com)/"+r+"/([^?#]*)","i"),indices:{bucket:1,path:2},postModify:o}],s=0;s<a.length;s++){var u=a[s],c=u.regex.exec(e);if(c){t=new J(c[u.indices.bucket],c[u.indices.path]||"");u.postModify(t);break}}if(null==t)throw new v("invalid-url","Invalid URL '"+e+"'.");return t},J);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(e,t){this.bucket=e,this.path_=t}function Y(e){var t,r;try{t=JSON.parse(e)}catch(e){return null}return"object"!=typeof(r=t)||Array.isArray(r)?null:t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z(e){var t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q(e){return"https://"+f+"/v0"+e}function ee(e){var t,r=encodeURIComponent,n="?";for(t in e)e.hasOwnProperty(t)&&(n=n+(r(t)+"="+r(e[t]))+"&");return n=n.slice(0,-1)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(e,t){return t}var re=function(e,t,r,n){this.server=e,this.local=t||e,this.writable=!!r,this.xform=n||te},ne=null;function oe(){if(ne)return ne;var e=[];e.push(new re("bucket")),e.push(new re("generation")),e.push(new re("metageneration")),e.push(new re("name","fullPath",!0));var t=new re("name");t.xform=function(e,t){return!M(t=t)||t.length<2?t:Z(t)},e.push(t);t=new re("size");return t.xform=function(e,t){return void 0!==t?Number(t):t},e.push(t),e.push(new re("timeCreated")),e.push(new re("updated")),e.push(new re("md5Hash",null,!0)),e.push(new re("cacheControl",null,!0)),e.push(new re("contentDisposition",null,!0)),e.push(new re("contentEncoding",null,!0)),e.push(new re("contentLanguage",null,!0)),e.push(new re("contentType",null,!0)),e.push(new re("metadata","customMetadata",!0)),ne=e}function ie(r,n){Object.defineProperty(r,"ref",{get:function(){var e=r.bucket,t=r.fullPath,t=new K(e,t);return n._makeStorageReference(t)}})}function ae(e,t,r){t=Y(t);if(null===t)return null;return function(e,t,r){for(var n={type:"file"},o=r.length,i=0;i<o;i++){var a=r[i];n[a.local]=a.xform(n,t[a.server])}return ie(n,e),n}(e,t,r)}function se(e,t){for(var r={},n=t.length,o=0;o<n;o++){var i=t[o];i.writable&&(r[i.server]=e[i.local])}return JSON.stringify(r)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ue="prefixes",ce="items";function le(e,t,r){r=Y(r);if(null===r)return null;return function(e,t,r){var n={prefixes:[],items:[],nextPageToken:r.nextPageToken};if(r[ue])for(var o=0,i=r[ue];o<i.length;o++){var a=i[o].replace(/\/$/,""),s=e._makeStorageReference(new K(t,a));n.prefixes.push(s)}if(r[ce])for(var u=0,c=r[ce];u<c.length;u++){var l=c[u],s=e._makeStorageReference(new K(t,l.name));n.items.push(s)}return n}(e,t,r)}var he=function(e,t,r,n){this.url=e,this.method=t,this.handler=r,this.timeout=n,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(e){if(!e)throw y()}function fe(r,n){return function(e,t){return pe(null!==(t=ae(r,t,n))),t}}function de(r,n){return function(e,t){return pe(null!==(t=le(r,n,t))),t}}function _e(n,o){return function(e,t){var r=ae(n,t,o);return pe(null!==r),function(n,e){if(null===(e=Y(e)))return null;if(!M(e.downloadTokens))return null;if(0===(e=e.downloadTokens).length)return null;var o=encodeURIComponent;return e.split(",").map(function(e){var t=n.bucket,r=n.fullPath;return Q("/b/"+o(t)+"/o/"+o(r))+ee({alt:"media",token:e})})[0]}(r,t)}}function ge(o){return function(e,t){var r,n=401===e.getStatus()?new v("unauthenticated","User is not authenticated, please authenticate using Firebase Authentication and try again."):402===e.getStatus()?(r=o.bucket,new v("quota-exceeded","Quota for bucket '"+r+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===e.getStatus()?(n=o.path,new v("unauthorized","User does not have permission to access '"+n+"'.")):t;return n.serverResponse=t.serverResponse,n}}function ve(n){var o=ge(n);return function(e,t){var r=o(e,t);return 404===e.getStatus()&&(e=n.path,r=new v("object-not-found","Object '"+e+"' does not exist.")),r.serverResponse=t.serverResponse,r}}function be(e,t,r){var n=Q(t.fullServerUrl()),o=e.maxOperationRetryTime,o=new he(n,"GET",fe(e,r),o);return o.errorHandler=ve(t),o}function me(e,t,r){r=Object.assign({},r);return r.fullPath=e.path,r.size=t.size(),r.contentType||(r.contentType=(e=t,(t=null)&&t.contentType||e&&e.type()||"application/octet-stream")),r}function ye(e,t,r,n,o){var i=t.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};var s=function(){for(var e="",t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();a["Content-Type"]="multipart/related; boundary="+s;var u=me(t,n,o),o="--"+s+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+se(u,r)+"\r\n--"+s+"\r\nContent-Type: "+u.contentType+"\r\n\r\n",s="\r\n--"+s+"--",n=X.getBlob(o,n,s);if(null===n)throw R();s={name:u.fullPath},u=Q(i),i=e.maxUploadRetryTime,i=new he(u,"POST",fe(e,r),i);return i.urlParams=s,i.headers=a,i.body=n.uploadData(),i.errorHandler=ge(t),i}var we=function(e,t,r,n){this.current=e,this.total=t,this.finalized=!!r,this.metadata=n||null};function Re(e,t){var r=null;try{r=e.getResponseHeader("X-Goog-Upload-Status")}catch(e){pe(!1)}return pe(!!r&&-1!==(t||["active"]).indexOf(r)),r}function Oe(e,t,r,n,o){var i=t.bucketOnlyServerUrl(),a=me(t,n,o),o={name:a.fullPath},i=Q(i),n={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":n.size(),"X-Goog-Upload-Header-Content-Type":a.contentType,"Content-Type":"application/json; charset=utf-8"},r=se(a,r),e=e.maxUploadRetryTime;e=new he(i,"POST",function(e){var t;Re(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(e){pe(!1)}return pe(M(t)),t},e);return e.urlParams=o,e.headers=n,e.body=r,e.errorHandler=ge(t),e}function ke(e,t,r,o){e=e.maxUploadRetryTime,e=new he(r,"POST",function(e){var t=Re(e,["active","final"]),r=null;try{r=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(e){pe(!1)}r||pe(!1);var n=Number(r);return pe(!isNaN(n)),new we(n,o.size(),"final"===t)},e);return e.headers={"X-Goog-Upload-Command":"query"},e.errorHandler=ge(t),e}function Te(e,i,t,a,r,s,n,o){var u=new we(0,0);if(n?(u.current=n.current,u.total=n.total):(u.current=0,u.total=a.size()),a.size()!==u.total)throw new v("server-file-wrong-size","Server recorded incorrect upload file size, please retry the upload.");var c=u.total-u.current,l=c;0<r&&(l=Math.min(l,r));n=u.current,r=n+l,c={"X-Goog-Upload-Command":l===c?"upload, finalize":"upload","X-Goog-Upload-Offset":u.current},n=a.slice(n,r);if(null===n)throw R();r=i.maxUploadRetryTime,r=new he(t,"POST",function(e,t){var r=Re(e,["active","final"]),n=u.current+l,o=a.size(),t="final"===r?fe(i,s)(e,t):null;return new we(n,o,"final"===r,t)},r);return r.headers=c,r.body=n.uploadData(),r.progressCallback=o||null,r.errorHandler=ge(e),r}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ee=function(e,t,r){"function"==typeof e||null!=t||null!=r?(this.next=e,this.error=t,this.complete=r):(e=e,this.next=e.next,this.error=e.error,this.complete=e.complete)};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pe(r){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];Promise.resolve().then(function(){return r.apply(void 0,e)})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Se=(xe.prototype._makeProgressCallback=function(){var t=this,r=this._transferred;return function(e){return t._updateProgress(r+e)}},xe.prototype._shouldDoResumable=function(e){return 262144<e.size()},xe.prototype._start=function(){"running"===this._state&&void 0===this._request&&(this._resumable?void 0===this._uploadUrl?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this._continueUpload():this._oneShotUpload())},xe.prototype._resolveToken=function(t){var r=this;this._ref.storage._getAuthToken().then(function(e){switch(r._state){case"running":t(e);break;case"canceling":r._transition("canceled");break;case"pausing":r._transition("paused")}})},xe.prototype._createResumable=function(){var r=this;this._resolveToken(function(e){var t=Oe(r._ref.storage,r._ref._location,r._mappings,r._blob,r._metadata),e=r._ref.storage._makeRequest(t,e);(r._request=e).getPromise().then(function(e){r._request=void 0,r._uploadUrl=e,r._needToFetchStatus=!1,r.completeTransitions_()},r._errorHandler)})},xe.prototype._fetchStatus=function(){var r=this,n=this._uploadUrl;this._resolveToken(function(e){var t=ke(r._ref.storage,r._ref._location,n,r._blob),e=r._ref.storage._makeRequest(t,e);(r._request=e).getPromise().then(function(e){r._request=void 0,r._updateProgress(e.current),r._needToFetchStatus=!1,e.finalized&&(r._needToFetchMetadata=!0),r.completeTransitions_()},r._errorHandler)})},xe.prototype._continueUpload=function(){var r=this,n=262144*this._chunkMultiplier,o=new we(this._transferred,this._blob.size()),i=this._uploadUrl;this._resolveToken(function(e){var t;try{t=Te(r._ref._location,r._ref.storage,i,r._blob,n,r._mappings,o,r._makeProgressCallback())}catch(e){return r._error=e,void r._transition("error")}e=r._ref.storage._makeRequest(t,e);(r._request=e).getPromise().then(function(e){r._increaseMultiplier(),r._request=void 0,r._updateProgress(e.current),e.finalized?(r._metadata=e.metadata,r._transition("success")):r.completeTransitions_()},r._errorHandler)})},xe.prototype._increaseMultiplier=function(){262144*this._chunkMultiplier<33554432&&(this._chunkMultiplier*=2)},xe.prototype._fetchMetadata=function(){var r=this;this._resolveToken(function(e){var t=be(r._ref.storage,r._ref._location,r._mappings),e=r._ref.storage._makeRequest(t,e);(r._request=e).getPromise().then(function(e){r._request=void 0,r._metadata=e,r._transition("success")},r._metadataErrorHandler)})},xe.prototype._oneShotUpload=function(){var r=this;this._resolveToken(function(e){var t=ye(r._ref.storage,r._ref._location,r._mappings,r._blob,r._metadata),e=r._ref.storage._makeRequest(t,e);(r._request=e).getPromise().then(function(e){r._request=void 0,r._metadata=e,r._updateProgress(r._blob.size()),r._transition("success")},r._errorHandler)})},xe.prototype._updateProgress=function(e){var t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()},xe.prototype._transition=function(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,void 0!==this._request&&this._request.cancel();break;case"running":var t="paused"===this._state;this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=w(),this._state=e,this._notifyObservers();break;case"error":case"success":this._state=e,this._notifyObservers()}},xe.prototype.completeTransitions_=function(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start()}},Object.defineProperty(xe.prototype,"snapshot",{get:function(){var e=D(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}},enumerable:!1,configurable:!0}),xe.prototype.on=function(e,t,r,n){var o=this,i=new Ee(t,r,n);return this._addObserver(i),function(){o._removeObserver(i)}},xe.prototype.then=function(e,t){return this._promise.then(e,t)},xe.prototype.catch=function(e){return this.then(null,e)},xe.prototype._addObserver=function(e){this._observers.push(e),this._notifyObserver(e)},xe.prototype._removeObserver=function(e){e=this._observers.indexOf(e);-1!==e&&this._observers.splice(e,1)},xe.prototype._notifyObservers=function(){var t=this;this._finishPromise(),this._observers.slice().forEach(function(e){t._notifyObserver(e)})},xe.prototype._finishPromise=function(){if(void 0!==this._resolve){var e=!0;switch(D(this._state)){case L.SUCCESS:Pe(this._resolve.bind(null,this.snapshot))();break;case L.CANCELED:case L.ERROR:Pe(this._reject.bind(null,this._error))();break;default:e=!1}e&&(this._resolve=void 0,this._reject=void 0)}},xe.prototype._notifyObserver=function(e){switch(D(this._state)){case L.RUNNING:case L.PAUSED:e.next&&Pe(e.next.bind(e,this.snapshot))();break;case L.SUCCESS:e.complete&&Pe(e.complete.bind(e))();break;case L.CANCELED:case L.ERROR:e.error&&Pe(e.error.bind(e,this._error))();break;default:e.error&&Pe(e.error.bind(e,this._error))()}},xe.prototype.resume=function(){var e="paused"===this._state||"pausing"===this._state;return e&&this._transition("running"),e},xe.prototype.pause=function(){var e="running"===this._state;return e&&this._transition("pausing"),e},xe.prototype.cancel=function(){var e="running"===this._state||"pausing"===this._state;return e&&this._transition("canceling"),e},xe);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(e,t,r){var n=this;void 0===r&&(r=null),this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=r,this._mappings=oe(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=function(e){n._request=void 0,n._chunkMultiplier=1,e._codeEquals("canceled")?(n._needToFetchStatus=!0,n.completeTransitions_()):(n._error=e,n._transition("error"))},this._metadataErrorHandler=function(e){n._request=void 0,e._codeEquals("canceled")?n.completeTransitions_():(n._error=e,n._transition("error"))},this._promise=new Promise(function(e,t){n._resolve=e,n._reject=t,n._start()}),this._promise.then(null,function(){})}var Ce=(Ae.prototype.toString=function(){return"gs://"+this._location.bucket+"/"+this._location.path},Ae.prototype._newRef=function(e,t){return new Ae(e,t)},Object.defineProperty(Ae.prototype,"root",{get:function(){var e=new K(this._location.bucket,"");return this._newRef(this._service,e)},enumerable:!1,configurable:!0}),Object.defineProperty(Ae.prototype,"bucket",{get:function(){return this._location.bucket},enumerable:!1,configurable:!0}),Object.defineProperty(Ae.prototype,"fullPath",{get:function(){return this._location.path},enumerable:!1,configurable:!0}),Object.defineProperty(Ae.prototype,"name",{get:function(){return Z(this._location.path)},enumerable:!1,configurable:!0}),Object.defineProperty(Ae.prototype,"storage",{get:function(){return this._service},enumerable:!1,configurable:!0}),Object.defineProperty(Ae.prototype,"parent",{get:function(){var e=function(e){if(0===e.length)return null;var t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;e=new K(this._location.bucket,e);return new Ae(this._service,e)},enumerable:!1,configurable:!0}),Ae.prototype._throwIfRoot=function(e){if(""===this._location.path)throw T(e)},Ae);function Ae(e,t){this._service=e,this._location=t instanceof K?t:K.makeFromUrl(t)}function Ie(e){var t={prefixes:[],items:[]};return function n(o,i,a){return h(this,void 0,void 0,function(){var t,r;return p(this,function(e){switch(e.label){case 0:return[4,Ue(o,{pageToken:a})];case 1:return t=e.sent(),(r=i.prefixes).push.apply(r,t.prefixes),(r=i.items).push.apply(r,t.items),null==t.nextPageToken?[3,3]:[4,n(o,i,t.nextPageToken)];case 2:e.sent(),e.label=3;case 3:return[2]}})})}(e,t).then(function(){return t})}function Ue(c,l){return h(this,void 0,void 0,function(){var s,u;return p(this,function(e){switch(e.label){case 0:return null!=l&&"number"==typeof l.maxResults&&V("options.maxResults",1,1e3,l.maxResults),[4,c.storage._getAuthToken()];case 1:return s=e.sent(),u=l||{},t=c.storage,r=c._location,n="/",o=u.pageToken,i=u.maxResults,a={},r.isRoot?a.prefix="":a.prefix=r.path+"/",n&&0<n.length&&(a.delimiter=n),o&&(a.pageToken=o),i&&(a.maxResults=i),o=Q(r.bucketOnlyServerUrl()),i=t.maxOperationRetryTime,(i=new he(o,"GET",de(t,r.bucket),i)).urlParams=a,i.errorHandler=ge(r),[2,c.storage._makeRequest(i,s).getPromise()]}var t,r,n,o,i,a})})}function Ne(u,c){return h(this,void 0,void 0,function(){var s;return p(this,function(e){switch(e.label){case 0:return u._throwIfRoot("updateMetadata"),[4,u.storage._getAuthToken()];case 1:return s=e.sent(),t=u.storage,r=u._location,n=c,o=oe(),i=Q(r.fullServerUrl()),a=se(n,o),n=t.maxOperationRetryTime,(n=new he(i,"PATCH",fe(t,o),n)).headers={"Content-Type":"application/json; charset=utf-8"},n.body=a,n.errorHandler=ve(r),[2,u.storage._makeRequest(n,s).getPromise()]}var t,r,n,o,i,a})})}function je(s){return h(this,void 0,void 0,function(){var a;return p(this,function(e){switch(e.label){case 0:return s._throwIfRoot("getDownloadURL"),[4,s.storage._getAuthToken()];case 1:return a=e.sent(),t=s.storage,r=s._location,n=oe(),o=Q(r.fullServerUrl()),i=t.maxOperationRetryTime,(i=new he(o,"GET",_e(t,n),i)).errorHandler=ve(r),[2,s.storage._makeRequest(i,a).getPromise().then(function(e){if(null===e)throw new v("no-download-url","The given file does not have any download URLs.");return e})]}var t,r,n,o,i})})}function Le(i){return h(this,void 0,void 0,function(){var o;return p(this,function(e){switch(e.label){case 0:return i._throwIfRoot("deleteObject"),[4,i.storage._getAuthToken()];case 1:return o=e.sent(),t=i.storage,r=i._location,n=Q(r.fullServerUrl()),t=t.maxOperationRetryTime,(t=new he(n,"DELETE",function(e,t){},t)).successCodes=[200,204],t.errorHandler=ve(r),[2,i.storage._makeRequest(t,o).getPromise()]}var t,r,n})})}function De(e,t){var r,t=(r=e._location.path,t=(t=t).split("/").filter(function(e){return 0<e.length}).join("/"),0===r.length?t:r+"/"+t),t=new K(e._location.bucket,t);return new Ce(e.storage,t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fe=(Object.defineProperty(ze.prototype,"bytesTransferred",{get:function(){return this._delegate.bytesTransferred},enumerable:!1,configurable:!0}),Object.defineProperty(ze.prototype,"metadata",{get:function(){return this._delegate.metadata},enumerable:!1,configurable:!0}),Object.defineProperty(ze.prototype,"state",{get:function(){return this._delegate.state},enumerable:!1,configurable:!0}),Object.defineProperty(ze.prototype,"totalBytes",{get:function(){return this._delegate.totalBytes},enumerable:!1,configurable:!0}),ze);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ze(e,t,r){this._delegate=e,this.task=t,this.ref=r}var He=(Object.defineProperty(Be.prototype,"snapshot",{get:function(){return new Fe(this._delegate.snapshot,this,this._ref)},enumerable:!1,configurable:!0}),Be.prototype.then=function(t,e){var r=this;return this._delegate.then(function(e){if(t)return t(new Fe(e,r,r._ref))},e)},Be.prototype.on=function(e,t,r,n){var o=this,i=void 0;return t&&(i="function"==typeof t?function(e){return t(new Fe(e,o,o._ref))}:{next:t.next?function(e){return t.next(new Fe(e,o,o._ref))}:void 0,complete:t.complete||void 0,error:t.error||void 0}),this._delegate.on(e,i,r||void 0,n||void 0)},Be);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Be(e,t){this._delegate=e,this._ref=t,this.cancel=this._delegate.cancel.bind(this._delegate),this.catch=this._delegate.catch.bind(this._delegate),this.pause=this._delegate.pause.bind(this._delegate),this.resume=this._delegate.resume.bind(this._delegate)}var Me=(Object.defineProperty(qe.prototype,"prefixes",{get:function(){var t=this;return this._delegate.prefixes.map(function(e){return new Ge(e,t._service)})},enumerable:!1,configurable:!0}),Object.defineProperty(qe.prototype,"items",{get:function(){var t=this;return this._delegate.items.map(function(e){return new Ge(e,t._service)})},enumerable:!1,configurable:!0}),Object.defineProperty(qe.prototype,"nextPageToken",{get:function(){return this._delegate.nextPageToken||null},enumerable:!1,configurable:!0}),qe);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qe(e,t){this._delegate=e,this._service=t}var Ge=(Object.defineProperty(Ve.prototype,"name",{get:function(){return this._delegate.name},enumerable:!1,configurable:!0}),Object.defineProperty(Ve.prototype,"bucket",{get:function(){return this._delegate.bucket},enumerable:!1,configurable:!0}),Object.defineProperty(Ve.prototype,"fullPath",{get:function(){return this._delegate.fullPath},enumerable:!1,configurable:!0}),Ve.prototype.toString=function(){return this._delegate.toString()},Ve.prototype.child=function(e){return new Ve(De(this._delegate,e),this.storage)},Object.defineProperty(Ve.prototype,"root",{get:function(){return new Ve(this._delegate.root,this.storage)},enumerable:!1,configurable:!0}),Object.defineProperty(Ve.prototype,"parent",{get:function(){var e=this._delegate.parent;return null==e?null:new Ve(e,this.storage)},enumerable:!1,configurable:!0}),Ve.prototype.put=function(e,t){return this._throwIfRoot("put"),new He((r=this._delegate,e=e,t=t,r._throwIfRoot("uploadBytesResumable"),new Se(r,new X(e),t)),this);var r},Ve.prototype.putString=function(e,t,r){void 0===t&&(t=S.RAW),this._throwIfRoot("putString");e=C(t,e),r=i({},r);return null==r.contentType&&null!=e.contentType&&(r.contentType=e.contentType),new He(new Se(this._delegate,new X(e.data,!0),r),this)},Ve.prototype.listAll=function(){var t=this;return Ie(this._delegate).then(function(e){return new Me(e,t.storage)})},Ve.prototype.list=function(e){var t=this;return Ue(this._delegate,e).then(function(e){return new Me(e,t.storage)})},Ve.prototype.getMetadata=function(){return function(n){return h(this,void 0,void 0,function(){var t,r;return p(this,function(e){switch(e.label){case 0:return n._throwIfRoot("getMetadata"),[4,n.storage._getAuthToken()];case 1:return t=e.sent(),r=be(n.storage,n._location,oe()),[2,n.storage._makeRequest(r,t).getPromise()]}})})}(this._delegate)},Ve.prototype.updateMetadata=function(e){return Ne(this._delegate,e)},Ve.prototype.getDownloadURL=function(){return je(this._delegate)},Ve.prototype.delete=function(){return this._throwIfRoot("delete"),Le(this._delegate)},Ve.prototype._throwIfRoot=function(e){if(""===this._delegate._location.path)throw T(e)},Ve);function Ve(e,t){this._delegate=e,this.storage=t}var We=(Xe.prototype.getPromise=function(){return this.promise_},Xe.prototype.cancel=function(e){},Xe);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(e){this.promise_=Promise.reject(e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var $e=(Ke.prototype.start_=function(){var t,r,e,n,o,i,a,s,u,c=this;function l(e,t){var r,n=c.resolve_,o=c.reject_,i=t.xhr;if(t.wasSuccessCode)try{var a=c.callback_(i,i.getResponseText());void 0!==a?n(a):n()}catch(e){o(e)}else null!==i?((r=y()).serverResponse=i.getResponseText(),c.errorCallback_?o(c.errorCallback_(i,r)):o(r)):t.canceled?o(r=(c.appDelete_?k:w)()):o(r=new v("retry-limit-exceeded","Max retry time for operation exceeded, please try again."))}function h(){return 2===a}function p(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];s||(s=!0,r.apply(null,e))}function f(e){o=setTimeout(function(){o=null,t(d,h())},e)}function d(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];s||(e||h()||i?p.call.apply(p,g([null,e],t)):(n<64&&(n*=2),f(1===a?(a=2,0):1e3*(n+Math.random()))))}function _(e){u||(u=!0,s||(null!==o?(e||(a=2),clearTimeout(o),f(0)):e||(a=1)))}this.canceled_?l(0,new Je(!1,null,!0)):this.backoffId_=(t=function(n,e){function o(e){var t=e.loaded,e=e.lengthComputable?e.total:-1;null!==c.progressCallback_&&c.progressCallback_(t,e)}e?n(!1,new Je(!1,null,!0)):(e=c.pool_.createXhrIo(),c.pendingXhr_=e,null!==c.progressCallback_&&e.addUploadProgressListener(o),e.send(c.url_,c.method_,c.body_,c.headers_).then(function(e){null!==c.progressCallback_&&e.removeUploadProgressListener(o),c.pendingXhr_=null;var t=e.getErrorCode()===N.NO_ERROR,r=e.getStatus();t&&!c.isRetryStatusCode_(r)?(r=-1!==c.successCodes_.indexOf(r),n(!0,new Je(r,e))):(e=e.getErrorCode()===N.ABORT,n(!1,new Je(!1,null,e)))}))},r=l,e=this.timeout_,o=null,u=s=i=!(n=1),f(a=0),setTimeout(function(){i=!0,_(!0)},e),_)},Ke.prototype.getPromise=function(){return this.promise_},Ke.prototype.cancel=function(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingXhr_&&this.pendingXhr_.abort()},Ke.prototype.isRetryStatusCode_=function(e){var t=500<=e&&e<600,r=-1!==[408,429].indexOf(e),e=-1!==this.additionalRetryCodes_.indexOf(e);return t||r||e},Ke);function Ke(e,t,r,n,o,i,a,s,u,c,l){var h=this;this.pendingXhr_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.url_=e,this.method_=t,this.headers_=r,this.body_=n,this.successCodes_=o.slice(),this.additionalRetryCodes_=i.slice(),this.callback_=a,this.errorCallback_=s,this.progressCallback_=c,this.timeout_=u,this.pool_=l,this.promise_=new Promise(function(e,t){h.resolve_=e,h.reject_=t,h.start_()})}var Je=function(e,t,r){this.wasSuccessCode=e,this.xhr=t,this.canceled=!!r};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ye(e){return/^[A-Za-z]+:\/\//.test(e)}function Ze(e,t){if(e instanceof et){var r=e;if(null==r._bucket)throw new v("no-default-bucket","No default bucket found. Did you set the '"+d+"' property when initializing the app?");r=new Ce(r,r._bucket);return null!=t?Ze(r,t):r}if(void 0===t)return e;if(t.includes(".."))throw O('`path` param cannot contain ".."');return De(e,t)}function Qe(e,t){if(t&&Ye(t)){if(e instanceof et)return new Ce(e,t);throw O("To use ref(service, url), the first argument must be a Storage instance.")}return Ze(e,t)}var et=(Object.defineProperty(tt.prototype,"maxUploadRetryTime",{get:function(){return this._maxUploadRetryTime},set:function(e){V("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e},enumerable:!1,configurable:!0}),Object.defineProperty(tt.prototype,"maxOperationRetryTime",{get:function(){return this._maxOperationRetryTime},set:function(e){V("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e},enumerable:!1,configurable:!0}),tt.prototype._getAuthToken=function(){return h(this,void 0,void 0,function(){var t;return p(this,function(e){switch(e.label){case 0:return(t=this._authProvider.getImmediate({optional:!0}))?[4,t.getToken()]:[3,2];case 1:if(null!==(t=e.sent()))return[2,t.accessToken];e.label=2;case 2:return[2,null]}})})},tt.prototype._delete=function(){return this._deleted=!0,this._requests.forEach(function(e){return e.cancel()}),this._requests.clear(),Promise.resolve()},tt.prototype._makeStorageReference=function(e){return new Ce(this,e)},tt.prototype._makeRequest=function(e,t){var r=this;if(this._deleted)return new We(k());var n,o,i,a,s,u,c=(n=e,o=this._appId,i=t,a=this._pool,s=this._firebaseVersion,u=ee(n.urlParams),e=n.url+u,t=Object.assign({},n.headers),u=t,(o=o)&&(u["X-Firebase-GMPID"]=o),o=t,null!==(i=i)&&0<i.length&&(o.Authorization="Firebase "+i),s=s,t["X-Firebase-Storage-Version"]="webjs/"+(null!=s?s:"AppManager"),new $e(e,n.method,t,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,a));return this._requests.add(c),c.getPromise().then(function(){return r._requests.delete(c)},function(){return r._requests.delete(c)}),c},tt);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(e,t,r,n,o){this.app=e,this._authProvider=t,this._pool=r,this._url=n,this._firebaseVersion=o,this._bucket=null,this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=n?K.makeFromBucketSpec(n):null==(n=null==(n=this.app.options)?void 0:n[d])?null:K.makeFromBucketSpec(n)}var rt=(Object.defineProperty(nt.prototype,"maxOperationRetryTime",{get:function(){return this._delegate.maxOperationRetryTime},enumerable:!1,configurable:!0}),Object.defineProperty(nt.prototype,"maxUploadRetryTime",{get:function(){return this._delegate.maxUploadRetryTime},enumerable:!1,configurable:!0}),nt.prototype.ref=function(e){if(Ye(e))throw O("ref() expected a child path but got a URL, use refFromURL instead.");return new Ge(Qe(this._delegate,e),this)},nt.prototype.refFromURL=function(e){if(!Ye(e))throw O("refFromURL() expected a full URL but got a child path, use ref() instead.");try{K.makeFromUrl(e)}catch(e){throw O("refFromUrl() expected a valid full URL but got an invalid one.")}return new Ge(Qe(this._delegate,e),this)},nt.prototype.setMaxUploadRetryTime=function(e){this._delegate.maxUploadRetryTime=e},nt.prototype.setMaxOperationRetryTime=function(e){this._delegate.maxOperationRetryTime=e},nt);function nt(e,t){var r=this;this.app=e,this._delegate=t,this.INTERNAL={delete:function(){return r._delegate._delete()}}}var ot,it;function at(e,t){var r=e.getProvider("app").getImmediate(),e=e.getProvider("auth-internal");return new rt(r,new et(r,e,new H,t,n.a.SDK_VERSION))}ot=n.a,it={TaskState:L,TaskEvent:j,StringFormat:S,Storage:et,Reference:Ge},ot.INTERNAL.registerComponent(new l.a("storage",at,"PUBLIC").setServiceProps(it).setMultipleInstances(!0)),ot.registerVersion("@firebase/storage","0.4.3")}}]);