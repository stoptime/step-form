const steps = document.querySelectorAll('form div');
const stepCount = steps.length - 1;
const content = document.querySelector('#content');
document.querySelector('h1').innerHTML = `Step <span>1</span> of ${steps.length}`;
steps[0].classList.add('show');

function updateStepHeader(forward = true) {
	const currStep = document.querySelector('h1 span');
	if (forward) {
		currStep.innerText = parseInt(currStep.innerText) + 1;
	}
	else {
		currStep.innerText = parseInt(currStep.innerText) - 1;
	}
}

function enableNext() {
	if (this.value !== '') {
		this.parentNode.querySelector('button.next').removeAttribute('disabled');
	}
	else {
		this.parentNode.querySelector('button.next').disabled = true;
	}
}

function changeBackgroundColor() {
	if (this.value) {
		document.body.style.backgroundColor = this.value;
	}
	else {
		document.body.style.backgroundColor = '#ddd';
	}
}

document.querySelector('.input input').addEventListener('input', enableNext);
document.querySelector('select').addEventListener('change', enableNext);
document.querySelector('select').addEventListener('change', changeBackgroundColor);

const animals = document.getElementsByName('animal');
let a = 0;
while (animals.length > a) {
	animals[a].addEventListener('click', enableNext);
	a++;
}
delete a;

function doNext(event) {
	event.preventDefault();
	let dataNum = this.getAttribute('data-num');
	steps[dataNum].classList.remove('show');
	steps[dataNum].classList.add('hide');
	dataNum++;
	steps[dataNum].classList.remove('hide');
	steps[dataNum].classList.add('show');
	updateStepHeader();
}

function doPrev(event) {
	event.preventDefault();
	let dataNum = this.getAttribute('data-num');
	steps[dataNum].classList.remove('hide');
	steps[dataNum].classList.add('show');
	dataNum++;
	steps[dataNum].classList.remove('show');
	steps[dataNum].classList.add('hide');
	updateStepHeader(false);
}

function doFinish(event) {
	event.preventDefault();
	document.querySelector('h1').innerHTML = 'Results!';
	document.forms[0].classList.add('hide');
	const animals = document.getElementsByName('animal');
	let name = document.querySelector('#name').value;
	let color = document.querySelector('#color').value;
	for (let a of animals) {
		if (a.checked) {
			var animal = a.value;
			break;
		}
	}
	if (animal === 'both') {
		animal = 'both cats and dogs';
	}
	if (animal === 'neither') {
		animal = 'neither cats nor dogs my GAWD';
		let p = document.createElement('p');
		p.innerHTML =
			'<i>Since you do not like cats and dogs you must be Satan. Making appropriate name and color changes.</i>';
		name = 'Satan';
		color = 'red';
		document.body.style.backgroundColor = 'red';
		content.append(p);
	}
	p = document.createElement('p');
	const txt = `Your name is <b>${name}</b>, and your selected color is <b>${color}</b> and you like <b>${animal}</b>.`;
	p.innerHTML = txt;
	content.append(p);
}

const stepPrevNext = (num) => {
	const nextButton = document.createElement('button');
	nextButton.classList.add('next');
	nextButton.textContent = 'Next';
	nextButton.setAttribute('data-num', num);
	nextButton.disabled = true;
	nextButton.addEventListener('click', doNext, event);

	const prevButton = document.createElement('button');
	prevButton.classList.add('prev');
	prevButton.textContent = 'Previous';
	prevButton.setAttribute('data-num', num - 1);
	prevButton.addEventListener('click', doPrev, event);

	if (num === 0) {
		return nextButton;
	}
	if (num === stepCount) {
		const buttonGroup = document.createElement('div');
		buttonGroup.classList.add('btn-group');
		const finishButton = document.createElement('button');
		finishButton.id = 'finish';
		finishButton.classList.add('next');
		finishButton.innerText = 'FINISH!';
		finishButton.disabled = true;
		finishButton.addEventListener('click', doFinish, event);
		buttonGroup.append(prevButton, finishButton);
		return buttonGroup;
	}
	const buttonGroup = document.createElement('div');
	buttonGroup.classList.add('btn-group');
	buttonGroup.append(prevButton, nextButton);
	return buttonGroup;
};

const doStep = (hide, show) => {
	hide.classList.add('hide');
	show.classList.add('show');
};

let i = 0;
for (let step of steps) {
	let buttons = stepPrevNext(i);
	step.append(buttons);
	i++;
}
delete i;
