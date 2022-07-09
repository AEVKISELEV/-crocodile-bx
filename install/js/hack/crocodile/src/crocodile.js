import {Type, Dom, Loc, Event} from 'main.core';
import { BaseEvent, EventEmitter } from 'main.core.events';
import { BitrixVue } from 'ui.vue3';
import './crocodile.css';

export class CrocodileApplication
{
	constructor(options = {})
	{
		if (Type.isStringFilled(options.rootNodeId))
		{
			this.rootNode = document.getElementById(options.rootNodeId);
		}
		else
		{
			throw new Error('CrocodileApplication: options.rootNodeId required')
		}
	}

	start()
	{
		this.attachTemplate();
	}

	attachTemplate()
	{
		BitrixVue.createApp({
			data() {
				return {
					chat: [],
					artistName: '’удожник',
					roomId: null,
					userId: null,
					isArtist: false,
					word: 'рекурси€',
					imagePath: null,
					message: '',

					tool: 'brush',
					ctx: null
				}
			},
			mounted()
			{
				EventEmitter.subscribe('Hack.Crocodile:pictureUpdated', this.updateImage);
				BX.ajax.runAction('hack:crocodile.CrocodileController.getRoom').then(response => {
					console.log(response.data)
					this.artistName = response.data.artistName;
					this.roomId = response.data.roomId;
					this.userId = response.data.userId;
					this.isArtist = response.data.isArtist;
					this.word = response.data.word;
					this.imagePath = response.data.imagePath;

					BX.ajax.runAction('hack:crocodile.CrocodileController.getChat',{
						data: {
							roomId: this.roomId
						}
					}).then(r => {
						this.chat = r.data;
						this.$refs.crocodileChat.scrollTop = this.$refs.crocodileChat.scrollHeight;
					});

					this.ctx = this.$refs.crocodileCanvas.getContext("2d");
					this.ctx.fillStyle = "#ffffff";
					this.ctx.rect(0, 0, this.$refs.crocodileCanvas.width, this.$refs.crocodileCanvas.height);
					this.ctx.fill();

					this.ctx.strokeStyle = "#000000";
					this.ctx.lineCap = "round";
					this.ctx.lineWidth = 4;

					this.$refs.crocodileCanvas.onmousemove = (e) => {
						if (this.isArtist)
						{
							const x = e.offsetX;
							const y = e.offsetY;
							const dx = e.movementX;
							const dy = e.movementY;

							if (e.buttons > 0) {
								this.ctx.beginPath();
								this.ctx.moveTo(x, y);
								this.ctx.lineTo(x - dx, y - dy);
								this.ctx.stroke();
								this.ctx.closePath();
							}
						}
					};

					this.$refs.crocodileCanvas.onmouseup = () => {
						this.$refs.crocodileCanvas.toBlob((blob) => {
							let file = new File([blob], "crocodile.png", { type: "image/png" });
							let formData = new FormData();
							formData.append('crocodile.png', file);
							fetch('/uploadImage', {method: "POST", body: formData})
								.then((response) => {
									Event.EventEmitter.emit('Hack.Crocodile:pictureUpdated');
								})

						}, 'image/png');
					};

					this.$refs.chatForm.addEventListener('submit', (e) => {
						e.preventDefault();
						BX.ajax.runAction('hack:crocodile.CrocodileController.uploadMessage', {
							data: {
								roomId: this.roomId,
								userId: this.userId,
								message: this.message,
							}
						});
						this.message = '';
					});

				});
			},
			methods: {
				selectBrush() {
					this.tool = 'brush';
					this.ctx.strokeStyle = "#000000";
					this.ctx.lineWidth = 4;
				},
				selectErase() {
					this.tool = 'erase';
					this.ctx.strokeStyle = "#ffffff";
					this.ctx.lineWidth = 16;
				},
				updateImage() {
					console.log('12345')
				}
			},
			components: {
				//Chat
			},
			template: `
				<div class="crocodile-container">
					<div class="artist-panel" v-if="isArtist">
						<button @click="selectBrush">Brush</button>
						<button @click="selectErase">Erase</button>
						<div class="selected-tool">
							Tool: {{tool}}
						</div>
					</div>
					<div class="room-info">
						<div class="room-artist">{{artistName}}</div>
						<div class="room-word" v-if="isArtist">{{word}}</div>
					</div>
					<div class="crocodile-game">
						<canvas ref="crocodileCanvas" width="600" height="400"></canvas>
						<div class="crocodile-chat">
							<div ref="crocodileChat" class="crocodile-messages">
								<div class="message" v-for="msg of chat">
									<div class="message-author">{{msg.name}}</div>
									<div class="message-text">{{msg.message}}</div>
								</div>
							</div>
							<form ref="chatForm" class="crocodile-chat-form" v-if="!isArtist">
								<input type="text" placeholder="¬ведите сообщение" class="crocodile-input" v-model="message">
								<input type="submit" value="отправить">
							</form>
						</div>
					</div>
				</div>
			`
		}).mount(this.rootNode);
	}
}
