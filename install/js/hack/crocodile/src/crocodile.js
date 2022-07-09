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
					//param: value
				}
			},
			mounted()
			{
				const canvas = this.$refs.crocodileCanvas;
				const ctx = canvas.getContext("2d");
				ctx.strokeStyle = "#000000";
				ctx.lineCap = "round";
				ctx.lineWidth = 4;

				canvas.onmousemove = function drawIfPressed (e) {
					const x = e.offsetX;
					const y = e.offsetY;
					const dx = e.movementX;
					const dy = e.movementY;

					if (e.buttons > 0) {
						ctx.beginPath();
						ctx.moveTo(x, y);
						ctx.lineTo(x - dx, y - dy);
						ctx.stroke();
						ctx.closePath();
					}
				};
			},
			components: {
				//Chat
			},
			template: `
				<canvas ref="crocodileCanvas" width="600" height="400"></canvas>
			`
		}).mount(this.rootNode);
	}
}
