let testimonials = [];

let circleGraph = document.getElementById('testimonials-wrapper');

function createCirclesAroundCircle() {
	let beeRotation = 35;
	let circles = circleGraph.querySelectorAll('.circle');
	let angle = 360 - 90,
		dangle = 360 / circles.length;
	for (let i = 0; i < circles.length; ++i) {
		let circle = circles[i];
		angle += dangle;
		circle.style.transform = `rotate(${angle}deg) translate(${
			circleGraph.clientWidth * 1.5
		}px) rotate(${beeRotation}deg)`;
		beeRotation -= 60;
	}
}

createCirclesAroundCircle();

// FETCH USERS FROM JSON FILES

let userTestimonials = Array.from(
	document.querySelectorAll('.circle-image-container')
);

let testImg = document.getElementById('user-img');
let testText = document.getElementById('test-text');
let userName = document.getElementById('user-name');
let userCountry = document.getElementById('user-country');

userTestimonials.forEach((testimonial, i) => {
	testimonial.setAttribute('id', i);
	testimonial.addEventListener('click', printTestimonial);
});

async function getUsersFromData() {
	try {
		let result = await fetch('./testimonials.json');
		let data = await result.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

async function printTestimonial(e) {
	let data = await getUsersFromData();
	let currTestimonialId = +e.target.id;

	data = data[currTestimonialId];
	changeTestimonialContent(data);
}

function changeTestimonialContent(data) {
	testText.innerText = data.testimonial;
	userName.innerText = data.name;
	userCountry.innerText = data.country;
	testImg.setAttribute('src', data.image);
}
