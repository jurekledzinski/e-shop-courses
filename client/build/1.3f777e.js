(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{118:function(e,t,n){"use strict";var a=n(0),s=n.n(a),a=n(176);t.a=function(e){var t=e.canNextPage,n=e.canPreviousPage,a=e.nextPage,r=e.pageIndex,c=e.pageOptions,o=e.previousPage;return s.a.createElement("div",{className:"controler-prev-next"},s.a.createElement("span",{className:"controler-prev-next__span"},s.a.createElement("strong",{className:"controler-prev-next__pageIndex"},r+1," of ",c.length)),s.a.createElement("button",{className:"controler-prev-next__btn",onClick:function(){return o()},disabled:!n},"Previous"),s.a.createElement("button",{className:"controler-prev-next__btn",onClick:function(){return a()},disabled:!t},"Next"))}},119:function(e,t,n){"use strict";var a=n(1),o=n.n(a),s=n(0),l=n.n(s),u=n(117),a=n(177);t.a=function(e){var t=e.filter,n=e.setFilter,a=e.data,e=Object(s.useState)(t),t=o()(e,2),e=t[0],r=t[1],c=Object(u.useAsyncDebounce)(function(e){n(e||void 0)},300);return l.a.createElement("div",{className:"table-search"},l.a.createElement("input",{className:"table-search__input",placeholder:"Search...",type:"text",value:e||"",onChange:function(e){r(e.target.value),c(e.target.value)}}),l.a.createElement("span",{className:"table-search__amount-courses"},"Total number: ".concat(a.length)))}},176:function(e,t,n){},177:function(e,t,n){}}]);