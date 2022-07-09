import {Type, Dom, Loc} from 'main.core';
import { BitrixVue } from 'ui.vue3';

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
			throw new Error('AdListApplication: options.rootNodeId required')
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

			},
			components: {
				//Chat
			},
			template: `
				<div>
					vue component
				</div>
			`
		}).mount(this.rootNode);
	}
}
