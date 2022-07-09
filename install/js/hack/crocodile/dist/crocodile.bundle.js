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
	            }, {
	              name: 'Артём Киселёв',
	              message: 'массажное кресло'
	            }, {
	              name: 'Артём Киселёв',
	              message: 'массажное кресло'
	            }, {
	              name: 'Артём Киселёв',
	              message: 'массажное кресло'
	            }, {
	              name: 'Артём Киселёв',
	              message: 'массажное кресло'
	            }, {
	              name: 'Артём Киселёв',
	              message: 'массажное кресло'
	            }, {
	              name: 'Артём Киселёв',
	              message: 'массажное кресло'
	            }, {
	              name: 'Артём Киселёв',
	              message: 'массажное кресло'
	            }, {
	              name: 'Артём Киселёв',
	              message: 'массажное кресло'
	            }, {
	              name: 'Артём Киселёв',
	              message: 'массажное кресло'
	            }, {
	              name: 'Артём Киселёв',
	              message: 'массажное кресло'
	            }],
	            artistName: 'Художник',
	            roomId: null,
	            userId: null,
	            isArtist: false,
	            word: 'рекурсия',
	            imagePath: null,
	            message: '',
	            tool: 'brush',
	            ctx: null
	          };
	        },
	        mounted: function mounted() {
	          var _this = this;

	          BX.ajax.runAction('hack:crocodile.CrocodileController.getRoom').then(function (response) {
	            console.log(response.data);
	            _this.artistName = response.data.artistName;
	            _this.roomId = response.data.roomId;
	            _this.userId = response.data.userId;
	            _this.isArtist = response.data.isArtist;
	            _this.word = response.data.word;
	            _this.imagePath = response.data.imagePath;
	            BX.ajax.runAction('hack:crocodile.CrocodileController.getChat', {
	              data: {
	                roomId: _this.roomId
	              }
	            }).then(function (r) {
	              _this.chat = r.data.chat;
	              _this.$refs.crocodileChat.scrollTop = _this.$refs.crocodileChat.scrollHeight;
	            });
	          });
	          this.ctx = this.$refs.crocodileCanvas.getContext("2d");
	          this.ctx.fillStyle = "#ffffff";
	          this.ctx.rect(0, 0, this.$refs.crocodileCanvas.width, this.$refs.crocodileCanvas.height);
	          this.ctx.fill();
	          this.ctx.strokeStyle = "#000000";
	          this.ctx.lineCap = "round";
	          this.ctx.lineWidth = 4;

	          this.$refs.crocodileCanvas.onmousemove = function (e) {
	            if (_this.isArtist) {
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
	            }
	          };

	          this.$refs.crocodileCanvas.onmouseup = function () {
	            _this.$refs.crocodileCanvas.toBlob(function (blob) {
	              var file = new File([blob], "crocodile.png", {
	                type: "image/png"
	              });
	              var formData = new FormData();
	              formData.append('crocodile.png', file);
	              fetch('/uploadImage', {
	                method: "POST",
	                body: formData
	              }).then(function (response) {
	                return response.json();
	              }).then(function (data) {
	                console.log(data);
	              });
	            }, 'image/png');
	          };

	          this.$refs.chatForm.addEventListener('submit', function (e) {
	            e.preventDefault();
	            BX.ajax.runAction('hack:crocodile.CrocodileController.uploadMessage', {
	              data: {
	                roomId: _this.roomId,
	                userId: _this.userId,
	                message: _this.message
	              }
	            });
	            _this.message = '';
	          });
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
	        template: "\n\t\t\t\t<div class=\"crocodile-container\">\n\t\t\t\t\t<div class=\"artist-panel\" v-if=\"isArtist\">\n\t\t\t\t\t\t<button @click=\"selectBrush\">Brush</button>\n\t\t\t\t\t\t<button @click=\"selectErase\">Erase</button>\n\t\t\t\t\t\t<div class=\"selected-tool\">\n\t\t\t\t\t\t\tTool: {{tool}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"room-info\">\n\t\t\t\t\t\t<div class=\"room-artist\">{{artistName}}</div>\n\t\t\t\t\t\t<div class=\"room-word\" v-if=\"isArtist\">{{word}}</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"crocodile-game\">\n\t\t\t\t\t\t<canvas ref=\"crocodileCanvas\" width=\"600\" height=\"400\"></canvas>\n\t\t\t\t\t\t<div class=\"crocodile-chat\">\n\t\t\t\t\t\t\t<div ref=\"crocodileChat\" class=\"crocodile-messages\">\n\t\t\t\t\t\t\t\t<div class=\"message\" v-for=\"msg of chat\">\n\t\t\t\t\t\t\t\t\t<div class=\"message-author\">{{msg.name}}</div>\n\t\t\t\t\t\t\t\t\t<div class=\"message-text\">{{msg.message}}</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<form ref=\"chatForm\" class=\"crocodile-chat-form\" v-if=\"!isArtist\">\n\t\t\t\t\t\t\t\t<input type=\"text\" placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435\" class=\"crocodile-input\" v-model=\"message\">\n\t\t\t\t\t\t\t\t<input type=\"submit\" value=\"\u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C\">\n\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t"
	      }).mount(this.rootNode);
	    }
	  }]);
	  return CrocodileApplication;
	}();

	exports.CrocodileApplication = CrocodileApplication;

}((this.BX.Hack.Crocodile = this.BX.Hack.Crocodile || {}),BX,BX.Vue3));
//# sourceMappingURL=crocodile.bundle.js.map
