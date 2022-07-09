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
	          return {//param: value
	          };
	        },
	        mounted: function mounted() {
	          var canvas = this.$refs.crocodileCanvas;
	          var ctx = canvas.getContext("2d");
	          ctx.strokeStyle = "#000000";
	          ctx.lineCap = "round";
	          ctx.lineWidth = 4;

	          canvas.onmousemove = function drawIfPressed(e) {
	            var x = e.offsetX;
	            var y = e.offsetY;
	            var dx = e.movementX;
	            var dy = e.movementY;

	            if (e.buttons > 0) {
	              ctx.beginPath();
	              ctx.moveTo(x, y);
	              ctx.lineTo(x - dx, y - dy);
	              ctx.stroke();
	              ctx.closePath();
	            }
	          };
	        },
	        components: {//Chat
	        },
	        template: "\n\t\t\t\t<canvas ref=\"crocodileCanvas\" width=\"600\" height=\"400\"></canvas>\n\t\t\t"
	      }).mount(this.rootNode);
	    }
	  }]);
	  return CrocodileApplication;
	}();

	exports.CrocodileApplication = CrocodileApplication;

}((this.BX.Hack.Crocodile = this.BX.Hack.Crocodile || {}),BX,BX.Vue3));
//# sourceMappingURL=crocodile.bundle.js.map
