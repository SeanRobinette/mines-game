(this["webpackJsonpmines-game"]=this["webpackJsonpmines-game"]||[]).push([[0],{14:function(e,t,i){},15:function(e,t,i){},16:function(e,t,i){"use strict";i.r(t);var a=i(0),n=i.n(a),s=i(8),l=i.n(s);i(14),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=i(1),r=i(2),o=i(5),h=i(4),u=i(6),d=function(){function e(t,i,a){Object(c.a)(this,e),this.width=t,this.height=i,this.mineCount=a,this.reset(t,i,a)}return Object(r.a)(e,[{key:"shuffle",value:function(e){for(var t=e.length-1;t>0;t--){var i=Math.floor(Math.random()*(t+1)),a=[e[i],e[t]];e[t]=a[0],e[i]=a[1]}}},{key:"countAdjacent",value:function(e,t){for(var i=0,a=0,n=[-1,0,1];a<n.length;a++)for(var s=n[a],l=0,c=[-1,0,1];l<c.length;l++){var r=c[l];"X"===this.get(e+r,t+s)&&i++}return i}},{key:"get",value:function(e,t){return this.isOutOfBounds(e,t)?"":this.trueValues[t+e*this.width]}},{key:"getDisplay",value:function(e,t){return this.displayValues[t+e*this.width]}},{key:"set",value:function(e,t,i){this.trueValues[t+e*this.width]=i}},{key:"isOutOfBounds",value:function(e,t){return e<0||t<0||e>=this.height||t>=this.width}},{key:"isShowing",value:function(e,t){var i=this.getDisplay(e,t);return!("?"===i||"x"===i)}},{key:"reveal",value:function(e,t){if(!this.isOutOfBounds(e,t)&&!this.isShowing(e,t)&&"x"!==this.displayValues[t+e*this.width]){var i=this.trueValues[t+e*this.width];if(console.log("reveal: "+this.displayValues[t+e*this.width]+"->"+i),this.displayValues[t+e*this.width]=i,0===i){console.log("propagate!");for(var a=0,n=[-1,0,1];a<n.length;a++)for(var s=n[a],l=0,c=[-1,0,1];l<c.length;l++){var r=c[l];0===s&&0===r||this.reveal(e+s,t+r)}}else"X"===i&&(this.state="lost");"lost"!==this.state&&this.checkForWin()&&(this.state="won",this.doVictory())}}},{key:"revealAdjacent",value:function(e,t){for(var i=0,a=[-1,0,1];i<a.length;i++)for(var n=a[i],s=0,l=[-1,0,1];s<l.length;s++){var c=l[s];0===n&&0===c||this.reveal(e+n,t+c)}}},{key:"checkForWin",value:function(){console.log("Checking for win...");for(var e=0;e<this.trueValues.length;e++)if("X"!==this.trueValues[e]&&this.displayValues[e]!==this.trueValues[e])return console.log("Nope!"),!1;return!0}},{key:"doVictory",value:function(){for(var e=0;e<this.trueValues.length;e++)"X"===this.trueValues[e]?this.displayValues[e]="x":this.displayValues[e]=this.trueValues[e]}},{key:"mark",value:function(e,t){if(!this.isOutOfBounds(e,t))switch(this.getDisplay(e,t)){case"?":this.displayValues[t+e*this.width]="x";break;case"x":this.displayValues[t+e*this.width]="?"}}},{key:"reset",value:function(e,t,i){this.state="active",this.displayValues=Array(e*t).fill("?"),this.trueValues=Array(e*t).fill(),this.trueValues=this.trueValues.map((function(e,t){return t<i?"X":""})),this.shuffle(this.trueValues);for(var a=0;a<this.width;a++)for(var n=0;n<this.height;n++)"X"!==this.get(n,a)&&this.set(n,a,this.countAdjacent(n,a))}}]),e}(),v=i(3),f=(i(15),function(e){function t(){return Object(c.a)(this,t),Object(o.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e,t=this.props.value;if(this.props.showing)return e="number"===typeof t?t>0?n.a.createElement("img",{className:"tile",src:"assets/"+t+".png"}):"":"X"===t?n.a.createElement("img",{className:"tile mine",src:"assets/mine.png"}):"",n.a.createElement("td",{className:"revealed square square-"+t,onClick:this.props.onClick,onContextMenu:this.props.onContextMenu},e);var i="";return"x"===this.props.value&&(i=n.a.createElement("img",{className:"tile",src:"assets/flag.png"})),n.a.createElement("td",{className:"secret square",onClick:this.props.onClick,onContextMenu:this.props.onContextMenu},i)}}]),t}(n.a.Component)),k=function(e){function t(e){var i;return Object(c.a)(this,t),(i=Object(o.a)(this,Object(h.a)(t).call(this,e))).clickedRecently={button:void 0,r:-1,c:-1},i.handleLeftClick=i.handleLeftClick.bind(Object(v.a)(i)),i.handleRightClick=i.handleRightClick.bind(Object(v.a)(i)),i.handleDoubleClick=i.handleDoubleClick.bind(Object(v.a)(i)),i}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.props.board.height,i=this.props.board.width,a=this.props.board;console.log(this.props);var s=Array(t).fill().map((function(t,s){return n.a.createElement("tr",{key:s},Array(i).fill().map((function(t,i){return n.a.createElement(f,{value:a.getDisplay(s,i),showing:a.isShowing(s,i),key:i,onClick:function(){return e.handleLeftClick(s,i)},onContextMenu:function(){return e.handleRightClick(s,i)}})})))}));return n.a.createElement("table",{className:"grid grid-"+a.state},n.a.createElement("tbody",null,s))}},{key:"handleLeftClick",value:function(e,t){var i=this;this.props.handleLeftClick(e,t),"right"===this.clickedRecently.button&&this.clickedRecently.r===e&&this.clickedRecently.c===t?(clearTimeout(this.clickTimeout),this.clickedRecently={button:void 0,r:-1,c:-1},this.clickTimeout=void 0,this.handleDoubleClick(e,t)):(clearTimeout(this.clickTimeout),this.clickedRecently={button:"left",r:e,c:t},this.clickTimeout=setTimeout((function(){i.clickedRecently={button:void 0,r:-1,c:-1}}),200))}},{key:"handleRightClick",value:function(e,t){var i=this;this.props.handleRightClick(e,t),"left"===this.clickedRecently.button&&this.clickedRecently.r===e&&this.clickedRecently.c===t?(clearTimeout(this.clickTimeout),this.clickedRecently={button:void 0,r:-1,c:-1},this.clickTimeout=void 0,this.handleDoubleClick(e,t)):(clearTimeout(this.clickTimeout),this.clickedRecently={button:"right",r:e,c:t},this.clickTimeout=setTimeout((function(){i.clickedRecently={button:void 0,r:-1,c:-1}}),200))}},{key:"handleDoubleClick",value:function(e,t){console.log("double clicked!"),this.props.handleDoubleClick(e,t)}}]),t}(n.a.Component),m=function(e){function t(e){var i;return Object(c.a)(this,t),(i=Object(o.a)(this,Object(h.a)(t).call(this,e))).state={board:new d(e.width,e.height,e.mines)},i}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e,t=this,i=this.state.board,a=n.a.createElement(k,{board:i,handleLeftClick:function(e,i){return t.handleLeftClick(e,i)},handleRightClick:function(e,i){return t.handleRightClick(e,i)},handleDoubleClick:function(e,i){return t.handleDoubleClick(e,i)}});return e="lost"===i.state?n.a.createElement("div",null,"You lost."):"won"===i.state?n.a.createElement("div",null,"You won!"):n.a.createElement("div",null,"Click on tiles to reveal them."),n.a.createElement("div",null,a,e,n.a.createElement("div",{className:"row"},n.a.createElement("button",{onClick:function(){return t.reset()}},"New Game")))}},{key:"reset",value:function(){this.setState({board:new d(this.props.width,this.props.height,this.props.mines)})}},{key:"handleDoubleClick",value:function(e,t){var i=this.state.board;"active"===i.state&&(i.revealAdjacent(e,t),this.setState(i))}},{key:"handleLeftClick",value:function(e,t){var i=this.state.board;"active"===i.state&&(i.reveal(e,t),this.setState({board:i}))}},{key:"handleRightClick",value:function(e,t){var i=this.state.board;"active"===i.state&&(i.mark(e,t),this.setState({board:i}))}}]),t}(n.a.Component),p=n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"panel panel-primary"},n.a.createElement("div",{className:"panel-heading"},n.a.createElement("h1",{className:"panel-title"},"Mines Game")),n.a.createElement("div",{className:"panel-body"},n.a.createElement(m,{width:10,height:10,mines:15}))));l.a.render(p,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},9:function(e,t,i){e.exports=i(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.2e1d6c55.chunk.js.map