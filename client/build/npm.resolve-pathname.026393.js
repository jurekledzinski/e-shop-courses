(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{49:function(n,t,o){"use strict";function s(n){return"/"===n.charAt(0)}function c(n,t){for(var o=t,r=o+1,i=n.length;r<i;o+=1,r+=1)n[o]=n[r];n.pop()}t.a=function(n,t){void 0===t&&(t="");var o,r=n&&n.split("/")||[],i=t&&t.split("/")||[],e=n&&s(n),t=t&&s(t),t=e||t;if(n&&s(n)?i=r:r.length&&(i.pop(),i=i.concat(r)),!i.length)return"/";o=!!i.length&&("."===(o=i[i.length-1])||".."===o||""===o);for(var u=0,f=i.length;0<=f;f--){var p=i[f];"."===p?c(i,f):".."===p?(c(i,f),u++):u&&(c(i,f),u--)}if(!t)for(;u--;)i.unshift("..");return!t||""===i[0]||i[0]&&s(i[0])||i.unshift(""),t=i.join("/"),o&&"/"!==t.substr(-1)&&(t+="/"),t}}}]);