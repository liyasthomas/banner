const capture = document.getElementById('capture')
const bgc = document.getElementById('bgc')
const borderbg = document.getElementById('borderbg')
const heading = document.getElementById('heading')
const root = document.querySelector(':root')
const download = () => {
	html2canvas(capture, {
		x: capture.offsetLeft,
		y: capture.offsetTop,
		scale: 1
	}).then(canvas => {
		saveAs(canvas.toDataURL(), 'banner.png')
	})
}
const saveAs = (uri, filename) => {
	const link = document.createElement('a')
	if (typeof link.download === 'string') {
		link.href = uri
		link.download = filename
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	} else {
		window.open(uri)
	}
}
const border = ({
	value
}) => capture.style.borderWidth = value + `px`
const fontsize = ({
	value
}) => heading.style.fontSize = value + `px`
let picker1 = new Picker({
	parent: bgc,
	color: getComputedStyle(document.documentElement).getPropertyValue('--bg-color'),
	popup: 'left',
	alpha: false,
	onChange({
		rgbaString
	}) {
		root.style.setProperty('--bg-color', rgbaString)
	}
})
let picker2 = new Picker({
	parent: bfc,
	color: getComputedStyle(document.documentElement).getPropertyValue('--font-color'),
	popup: 'left',
	alpha: false,
	onChange({
		rgbaString
	}) {
		root.style.setProperty('--font-color', rgbaString)
	}
})
let picker3 = new Picker({
	parent: borderbg,
	color: getComputedStyle(document.documentElement).getPropertyValue('--borderbg-color'),
	popup: 'left',
	alpha: false,
	onChange({
		rgbaString
	}) {
		root.style.setProperty('--borderbg-color', rgbaString)
	}
})
const random = () => {
	root.style.setProperty('--bg-color', generateRandomHexColor())
	root.style.setProperty('--font-color', generateRandomHexColor())
	root.style.setProperty('--borderbg-color', generateRandomHexColor())
}
const generateRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
const readURL = () => {
	const file = document.getElementById("getval").files[0];
	const reader = new FileReader();
	reader.onloadend = () => {
		document.getElementById('capture').style.backgroundImage = `url(${reader.result})`;
	}
	if (file) {
		reader.readAsDataURL(file);
	} else {}
}
document.getElementById('getval').addEventListener('change', readURL, true);
