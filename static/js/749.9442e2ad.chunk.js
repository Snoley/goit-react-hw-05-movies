"use strict";(self.webpackChunkreact_homework_template=self.webpackChunkreact_homework_template||[]).push([[749],{749:function(e,t,n){n.r(t),n.d(t,{default:function(){return l}});var a=n(433),c=n(439),r=n(791),i=n(87),o="HomePage_filmsItem__wNEYj",s="HomePage_filmsLink__Lvh+Q",u=n(184),l=function(){var e=(0,r.useState)([]),t=(0,c.Z)(e,2),n=t[0],l=t[1];return(0,r.useEffect)((function(){fetch("".concat("https://api.themoviedb.org/3","/trending/all/day?api_key=").concat("1a27ac166727ac0de96a34161208f474")).then((function(e){if(e.ok)return e.json()})).then((function(e){return l((0,a.Z)(e.results.map((function(e){return{id:e.id,title:e.title,name:e.name}}))))})).catch((function(e){return console.log(e.message)}))}),[]),(0,u.jsxs)(u.Fragment,{children:[" ",(0,u.jsx)("h2",{children:"Trending today"}),(0,u.jsx)("ul",{children:n.map((function(e){var t=e.id,n=e.title,a=e.name;return(0,u.jsx)("li",{className:o,children:(0,u.jsx)(i.rU,{className:s,to:"movies/".concat(t),children:n||a})},t)}))})]})}}}]);
//# sourceMappingURL=749.9442e2ad.chunk.js.map