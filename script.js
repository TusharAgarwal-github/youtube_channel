// document.addEventListener('click', myFunction)

// function myFunction() {

// 	let channelid_test = document.getElementById('channel_id').value
// 	return channelid_test
// }
function fetchData() {
	return new Promise((res, rej) => {
		let requestXML = new XMLHttpRequest()
		//channelid = myFunction()
		channelid = 'UCAvCL8hyXjSUHKEGuUPr1BA'
		//let channelid //= document.getElementById('channel_id').value
		console.log(channelid)
		requestXML.open(
			'GET',
			`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelid}&key=AIzaSyB8CgNB_8d2-iLmndeJ3dPhkQsl8OseKDs`,
			true
		)
		//let url2 = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${Vid}&key=AIzaSyB8CgNB_8d2-iLmndeJ3dPhkQsl8OseKDs`
		requestXML.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				res(requestXML.responseText)
			} else if (this.readyState == 4 && this.status !== 200) {
				rej('error occurred while fetching data')
			}
		}
		requestXML.send()
	})
}

https: fetchData()
	.then(response => {
		generateHtml(JSON.parse(response))
	})
	.catch(err => console.error(err))

//Creates individual Card
function createCard(channelObj) {
	const card = createDomElement('div', 'card')
	const cardBody = createDomElement('div', 'card-body')
	const cardTitle = createDomElement('h5', 'card-title')
	// if (channelObj.name.length > 15) {
	// 	cardTitle.classList.add('short-title')
	// }
	cardTitle.innerHTML = channelObj.snippet.title

	const image = createDomElement('img', 'card-img-top')
	image.src = channelObj.snippet.thumbnails.high.url
	image.alt = channelObj.snippet.title

	const cardContents = createDomElement('div', 'card-contents')

	const descriptionP = createDomElement('p', 'capital')
	descriptionP.innerHTML = 'Description:'
	const descriptionPSpan = createDomElement('span')
	descriptionPSpan.innerHTML = channelObj.snippet.description
	descriptionP.append(descriptionPSpan)

	const subscriberP = createDomElement('p')
	subscriberP.innerHTML = 'Subscriber:(k) '
	const subscriberPSpan = createDomElement('span')
	subscriberPSpan.innerHTML = channelObj.statistics.subscriberCount / 100
	subscriberP.append(subscriberPSpan)

	const videoCount = createDomElement('p')
	videoCount.innerHTML = 'Video(total):'
	const videoCountSpan = createDomElement('span')
	videoCountSpan.innerHTML = channelObj.statistics.videoCount
	videoCount.append(videoCountSpan)
	cardBody.append(cardTitle, image, descriptionP, subscriberP, videoCount)
	card.append(cardBody)
	return card
}

// Creates a Dom element and assigns class and id to it, if they are not empty
function createDomElement(ele, eleClass = '', eleId = '') {
	const element = document.createElement(ele)
	if (eleClass !== '') {
		element.setAttribute('class', eleClass)
	}
	if (eleId !== '') {
		element.setAttribute('id', eleId)
	}
	return element
}

// Generates Body of the document
function generateHtml(channelInfo) {
	const container = createDomElement('div', 'container-fluid')
	const row = createDomElement('div', 'row')
	const column = createDomElement('div', 'col-12 channelInfo')
	console.log(channelInfo)
	channelInfo.items.forEach(country => {
		const card = createCard(country)
		column.append(card)
	})

	row.append(column)
	container.append(row)
	document.body.append(container)
}
