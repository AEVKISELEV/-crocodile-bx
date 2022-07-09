import {Type, Dom, Loc, Tag} from 'main.core';
import {Popup} from 'main.popup';
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
					color: 'black',
					size: 5,
					ctx: null
				}
			},
			mounted()
			{
				BX.PULL.subscribe({
					type: BX.PullClient.SubscriptionType.Server,
					moduleId: 'hack.crocodile',
					callback: this.handlePullEvent
				});
				BX.ajax.runAction('hack:crocodile.CrocodileController.getRoom').then(response => {
					this.artistName = response.data.artistName;
					this.roomId = response.data.roomId;
					this.userId = response.data.userId;
					this.userName = response.data.userName;
					this.isArtist = response.data.isArtist;
					this.word = response.data.word;
					this.imagePath = response.data.imagePath;

					BX.ajax.runAction('hack:crocodile.CrocodileController.getChat',{
						data: {
							roomId: this.roomId
						}
					}).then(r => {
						this.chat = r.data;
						if (this.$refs.crocodileChat)
						{
							this.$refs.crocodileChat.scrollTop = this.$refs.crocodileChat.scrollHeight;
						}
					});

					this.ctx = this.$refs.crocodileCanvas.getContext("2d");
					fetch('/getCrocodileImage', {method: "GET"})
						.then((response) => {
							return response.json();
						})
						.then((img) => {
							const image = new Image();
							image.onload = () => {
								this.ctx.drawImage(image, 0, 0);
							};
							image.src = img;
						})

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

					this.$refs.crocodileCanvas.onmouseup = this.pictureUpdated;
					this.$refs.crocodileCanvas.onmouseleave = this.pictureUpdated;

					this.$refs.chatForm.addEventListener('submit', (e) => {
						e.preventDefault();
						BX.ajax.runAction('hack:crocodile.CrocodileController.uploadMessage', {
							data: {
								roomId: this.roomId,
								userId: this.userId,
								message: this.message,
								userName: this.userName,
							}
						});
						this.message = '';
					});

				});
			},
			methods: {
				clearCanvas() {
					this.ctx.fillStyle = "#ffffff";
					this.ctx.rect(0, 0, 800, 600);
					this.ctx.fill();
					this.pictureUpdated();
				},
				selectBrush() {
					this.tool = 'brush';
					this.ctx.strokeStyle = this.color;
					this.ctx.lineWidth = 4;
				},
				selectErase() {
					this.tool = 'erase';
					this.ctx.strokeStyle = "#ffffff";
					this.ctx.lineWidth = 16;
				},
				selectColor(color) {
					if (this.tool === 'erase')
					{
						return;
					}
					this.color = color;
					this.ctx.strokeStyle = color;
				},
				selectSize(size) {
					this.size = size;
					this.ctx.lineWidth = size;
				},
				pictureUpdated() {
					if (this.isArtist)
					{
						this.$refs.crocodileCanvas.toBlob((blob) => {
							let file = new File([blob], "crocodile.png", { type: "image/png" });
							let formData = new FormData();
							formData.append('crocodile.png', file);
							fetch('/uploadImage', {method: "POST", body: formData})
								.then(() => {
									BX.ajax.runAction('hack:crocodile.CrocodileController.pushImage');
								})
						}, 'image/png');
					}
				},
				handlePullEvent(event) {
					if (event.command === 'updateImage' && !this.isArtist)
					{
						fetch('/getCrocodileImage', {method: "GET"})
							.then((response) => {
								return response.json();
							})
							.then((img) => {
								const image = new Image();
								image.onload = () => {
									this.ctx.drawImage(image, 0, 0);
								};
								image.src = img;
							})
					}
					if (event.command === 'updateChat')
					{
						this.chat.push(event.params);
						this.$refs.crocodileChat.scrollTop = this.$refs.crocodileChat.scrollHeight;
					}
					if (event.command === 'gameFinish')
					{
						const popup = new Popup(
							{
								width: 300,
								height: 200,
								content: Tag.render`<div>${event.params.winnerName} победил!</div>`,
								closeIcon: true,
								events: {
									onClose()
									{
										document.location.reload();
									}
								}
							}
						);
						if (this.isArtist)
						{
							const canvas = document.createElement('canvas');
							const ctx = canvas.getContext("2d");
							ctx.fillStyle = "#ffffff";
							ctx.rect(0, 0, 800, 600);
							ctx.fill();
							canvas.toBlob((blob) => {
								let file = new File([blob], "crocodile.png", { type: "image/png" });
								let formData = new FormData();
								formData.append('crocodile.png', file);
								fetch('/uploadImage', { method: "POST", body: formData });
							});
						}
						popup.show();
					}
				}
			},
			template: `
				<div class="crocodile-container">
					<div class="artist-panel" v-if="isArtist">
						<div class="panel-row">
							<button @click="selectBrush">Brush</button>
							<button @click="selectErase">Erase</button>
							<button @click="clearCanvas">Clear all</button>
						</div>
						<div class="panel-row">
							<span @click="selectColor('black')" style="background: black" class="crocodile-color-select"></span>
							<span @click="selectColor('red')" style="background: red" class="crocodile-color-select"></span>
							<span @click="selectColor('orange')" style="background: orange" class="crocodile-color-select"></span>
							<span @click="selectColor('yellow')" style="background: yellow" class="crocodile-color-select"></span>
							<span @click="selectColor('green')" style="background: green" class="crocodile-color-select"></span>
							<span @click="selectColor('blue')" style="background: blue" class="crocodile-color-select"></span>
							<span @click="selectColor('magenta')" style="background: magenta" class="crocodile-color-select"></span>
						</div>
						<div class="panel-row">
							<span @click="selectSize(5)" :style="'width: 5px; background:' + color" class="crocodile-size-select"></span>
							<span @click="selectSize(10)" :style="'width: 10px; background:' + color" class="crocodile-size-select"></span>
							<span @click="selectSize(15)" :style="'width: 15px; background:' + color" class="crocodile-size-select"></span>
							<span @click="selectSize(20)" :style="'width: 20px; background:' + color" class="crocodile-size-select"></span>
							<span @click="selectSize(25)" :style="'width: 25px; background:' + color" class="crocodile-size-select"></span>
						</div>
					</div>
					<div class="tool-info" v-if="isArtist">
						<div class="selected-tool" v-if="tool === 'erase'">
						Tool: {{tool}} {{size}}px
						</div>
						<div class="selected-tool" v-else>
							Tool: {{color}} {{tool}} {{size}}px
						</div>
					</div>
					<div class="room-info">
						<div class="room-artist">’удожник: {{artistName}}</div>
						<div class="room-word" v-if="isArtist">{{word}}</div>
					</div>
					<div class="crocodile-game">
						<canvas ref="crocodileCanvas" width="600" height="400"></canvas>
						<div class="crocodile-chat">
							„ат:
							<div ref="crocodileChat" class="crocodile-messages" v-if="chat && chat.length !== 0">
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
