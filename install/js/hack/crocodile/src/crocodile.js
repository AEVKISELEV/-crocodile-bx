import {Type, Dom, Loc} from 'main.core';
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
					chat:
						[
							{name: 'Petr Popov', message: 'рекурсия'},
							{name: 'Артём Киселёв', message: 'массажное кресло'}
						],
					tool: 'brush',
					ctx: null
				}
			},
			mounted()
			{
				const canvas = this.$refs.crocodileCanvas;
				this.ctx = canvas.getContext("2d");
				this.ctx.strokeStyle = "#000000";
				this.ctx.lineCap = "round";
				this.ctx.lineWidth = 4;

				canvas.onmousemove = (e) => {
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
				};
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
			},
			components: {
				//Chat
			},
			template: `
				<div class="artist-panel">
					<button @click="selectBrush">Brush</button>
					<button @click="selectErase">Erase</button>
				</div>
				<div class="selected-tool">
					Tool: {{tool}}
				</div>
				<div class="crocodile-container">
					<canvas ref="crocodileCanvas" width="600" height="400"></canvas>
					<div ref="crocodileChat" class="crocodile-chat">
						<div class="message" v-for="msg of chat">
							<div class="message-author">{{msg.name}}</div>
							<div class="message-text">{{msg.message}}</div>
						</div>
					</div>
				</div>
			`
		}).mount(this.rootNode);
	}
}
