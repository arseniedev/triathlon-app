
export default class TriathlonViewModel {
	constructor(triathlon, timer) {
		this.triathlon = triathlon;
		this.timer = timer;
		this.container = [];
		this.timerState = false;
		this.category = ['Swim', 'Bike', 'Run'];
		this.button = 'Play';
		this.seconds = '00:00:00';

		this.init = this.init.bind(this);
		this.clear = this.clear.bind(this);
		this.cache = this.cache.bind(this);
		this.submit = this.submit.bind(this);
		this.display = this.display.bind(this);
		this.click = this.click.bind(this);
		this.search = this.search.bind(this);
	}

	click(action) {
		console.log(action);
		return {};
	}

	init() {
		this.altButton();
		return this.timerHandler();
	}

	clear() {
		this.timerState = false;
		this.container = [];
		this.seconds = this.timer.reset();
		return this.seconds;
	}

	cache() {
		const index = this.container.length;
		const duration = this.timerHandler().elapsed;
		const button = this.timerHandler().button;

		if (index === 3) {
			this.seconds = this.timer.pause();
			return this.setState(index, duration, button, true);
		}

		return this.setState(index, duration, button, false);
	}

	setState(index, duration, button, status) {
		const output = {
			category: this.category[index],
			time: duration,
			complete: status,
			button,
		};
		this.container.push(output);
		return output;
	}

	altButton() {
		this.timerState = !this.timerState;
	}

	timerHandler() {
		if (this.timerState) {
			this.button = 'Pause';
			this.seconds = this.timer.start();
		} else {
			this.button = 'Play';
			this.seconds = this.timer.pause();
		}
		return { button: this.button, elapsed: this.seconds };
	}

	display() {
		return this.triathlon.loadFromLocalStorage();
	}

	search(targetID) {
		console.log(this.triathlon.allMyAthletes, targetID);
	}

	submit(event) {
		event.preventDefault();
		const form = document.getElementById('athlete-form');
		const out = this.triathlon.handleForm(form, this.container);
		form.reset();
		this.container = [];
		this.timerState = false;
		return out;
	}
}
