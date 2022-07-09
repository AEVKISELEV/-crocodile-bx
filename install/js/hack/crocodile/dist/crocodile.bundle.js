this.BX = this.BX || {};
this.BX.Hack = this.BX.Hack || {};
(function (exports,main_core,ui_vue3) {
	'use strict';

	var CrocodileApplication = /*#__PURE__*/function () {
	  function CrocodileApplication() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, CrocodileApplication);

	    if (main_core.Type.isStringFilled(options.rootNodeId)) {
	      this.rootNode = document.getElementById(options.rootNodeId);
	    } else {
	      throw new Error('CrocodileApplication: options.rootNodeId required');
	    }
	  }

	  babelHelpers.createClass(CrocodileApplication, [{
	    key: "start",
	    value: function start() {
	      this.attachTemplate();
	    }
	  }, {
	    key: "attachTemplate",
	    value: function attachTemplate() {
	      ui_vue3.BitrixVue.createApp({
	        data: function data() {
	          return {
	            chat: [{
	              name: 'Петр Попов',
	              message: 'рекурсия'
	            }, {
	              name: 'Артём Киселёв',
	              message: 'массажное кресло'
	            }],
	            tool: 'brush',
	            ctx: null
	          };
	        },
	        mounted: function mounted() {
	          var _this = this;

	          var canvas = this.$refs.crocodileCanvas;
	          this.ctx = canvas.getContext("2d");
	          this.ctx.strokeStyle = "#000000";
	          this.ctx.lineCap = "round";
	          this.ctx.lineWidth = 4;

	          canvas.onmousemove = function (e) {
	            var x = e.offsetX;
	            var y = e.offsetY;
	            var dx = e.movementX;
	            var dy = e.movementY;

	            if (e.buttons > 0) {
	              _this.ctx.beginPath();

	              _this.ctx.moveTo(x, y);

	              _this.ctx.lineTo(x - dx, y - dy);

	              _this.ctx.stroke();

	              _this.ctx.closePath();
	            }
	          };
	        },
	        methods: {
	          selectBrush: function selectBrush() {
	            this.tool = 'brush';
	            this.ctx.strokeStyle = "#000000";
	            this.ctx.lineWidth = 4;
	          },
	          selectErase: function selectErase() {
	            this.tool = 'erase';
	            this.ctx.strokeStyle = "#ffffff";
	            this.ctx.lineWidth = 16;
	          }
	        },
	        components: {//Chat
	        },
	        template: "\n\t\t\t\t<div class=\"artist-panel\">\n\t\t\t\t\t<button @click=\"selectBrush\">Brush</button>\n\t\t\t\t\t<button @click=\"selectErase\">Erase</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"selected-tool\">\n\t\t\t\t\tTool: {{tool}}\n\t\t\t\t</div>\n\t\t\t\t<div class=\"crocodile-container\">\n\t\t\t\t\t<canvas ref=\"crocodileCanvas\" width=\"600\" height=\"400\"></canvas>\n\t\t\t\t\t<div ref=\"crocodileChat\" class=\"crocodile-chat\">\n\t\t\t\t\t\t<div class=\"message\" v-for=\"msg of chat\">\n\t\t\t\t\t\t\t<div class=\"message-author\">{{msg.name}}</div>\n\t\t\t\t\t\t\t<div class=\"message-text\">{{msg.message}}</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"
	      }).mount(this.rootNode);
	    }
	  }]);
	  return CrocodileApplication;
	}();

	exports.CrocodileApplication = CrocodileApplication;

}((this.BX.Hack.Crocodile = this.BX.Hack.Crocodile || {}),BX,BX.Vue3));
//# sourceMappingURL=crocodile.bundle.js.map
