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
	      throw new Error('AdListApplication: options.rootNodeId required');
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
	        mounted: function mounted() {},
	        components: {//Chat
	        },
	        template: "\n\t\t\t\t<div>\n\t\t\t\t\tvue component\n\t\t\t\t</div>\n\t\t\t"
	      }).mount(this.rootNode);
	    }
	  }]);
	  return CrocodileApplication;
	}();

	exports.CrocodileApplication = CrocodileApplication;

}((this.BX.Hack.Crocodile = this.BX.Hack.Crocodile || {}),BX,BX.Vue3));
//# sourceMappingURL=crocodile.bundle.js.map
