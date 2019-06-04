const capture = document.getElementById('capture')
const bg = document.getElementById('bg')
const fg = document.getElementById('fg')
const bbg = document.getElementById('bbg')
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
const cheight = ({
	value
}) => capture.style.height = value + `vw`
let picker1 = new Picker({
	parent: bg,
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
	parent: fg,
	color: getComputedStyle(document.documentElement).getPropertyValue('--fg-color'),
	popup: 'left',
	alpha: false,
	onChange({
		rgbaString
	}) {
		root.style.setProperty('--fg-color', rgbaString)
	}
})
let picker3 = new Picker({
	parent: bbg,
	color: getComputedStyle(document.documentElement).getPropertyValue('--bbg-color'),
	popup: 'left',
	alpha: false,
	onChange({
		rgbaString
	}) {
		root.style.setProperty('--bbg-color', rgbaString)
	}
})
const random = () => {
	root.style.setProperty('--bg-color', generateRandomHexColor())
	root.style.setProperty('--fg-color', generateRandomHexColor())
	root.style.setProperty('--bbg-color', generateRandomHexColor())
	picker1.setColor(getComputedStyle(document.documentElement).getPropertyValue('--bg-color'))
	picker2.setColor(getComputedStyle(document.documentElement).getPropertyValue('--fg-color'))
	picker3.setColor(getComputedStyle(document.documentElement).getPropertyValue('--bbg-color'))
}
const generateRandomHexColor = () => `#${(0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1, 6)}`
const readURL = () => {
	const file = document.getElementById('getbg').files[0]
	const reader = new FileReader()
	reader.onloadend = () => {
		document.getElementById('capture').style.backgroundImage = `url(${reader.result})`
	}
	if (file) {
		reader.readAsDataURL(file)
	} else {}
}
document.getElementById('getbg').addEventListener('change', readURL, true)
