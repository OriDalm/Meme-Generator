'use strict'
var gCtx
var gElCanvas
var gColor
let gStartPos
let isDragging = false
let initialMousePos

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addMouseListeners()
    const textCords = { x: 198, y: -64 }
    createMeme(textCords)
    console.log(gMeme)
    console.log(gMeme.lines[gMeme.selectedLineIdx].pos)
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function renderCanvas(img) {
    if (!img) {
        img = new Image()
        img.src = `imgs/${gMeme.selectedImgId}.jpg`
        img.onload = function () {
            renderMeme(img)
        }
    } else {
        renderMeme(img)
    }
}

function renderMeme(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    for (let i = 0; i < gMeme.lines.length; i++) {
        setLine(gMeme.lines[i], i)
    }
}

function onSelectImg(elImg) {
    const selectedImgId = parseInt(elImg.getAttribute('data-img-id'))
    gMeme.selectedImgId = selectedImgId
    gSelectedLineIdx = 0
    renderCanvas()
    displayCanvas()


}

function onChangeColor() {
    const elColorBox = document.getElementById('colorInput')
    const elPaintBrush = document.querySelector('.fa-brush')
    gColor = elColorBox.value
    gMeme.lines[gMeme.selectedLineIdx].color = gColor
    elPaintBrush.style.color = gColor
    renderCanvas()
}

function drawText() {
    const elTextBox = document.getElementById('textInput')
    const newText = elTextBox.value

    gMeme.lines[gMeme.selectedLineIdx].txt = newText
    console.log(gMeme.selectedLineIdx)
    renderCanvas()
}

function onIncreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size++
    renderCanvas()
}

function onDecreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size--
    renderCanvas()
}

function setLine(line, idx) {
    gCtx.fillStyle = line.color
    gCtx.font = line.size + 'px Impact'
    gCtx.textAlign = 'center'
    const canvasHeight = gElCanvas.height
    var lineHeight = line.size + 35
    const bottomY = canvasHeight - (lineHeight / 2)
    const centerX = canvas.width / 2;
    const textMetrics = gCtx.measureText(line.txt);
    const textWidth = textMetrics.width;
    const textHeight = line.size + 10;

    gCtx.fillStyle = line.color;
    gCtx.font = line.size + 'px Impact';
    gCtx.textAlign = 'center';

    gCtx.fillText(line.txt, canvas.width / 2, idx === 0 ? lineHeight : bottomY)
    gCtx.strokeText(line.txt, canvas.width / 2, idx === 0 ? lineHeight : bottomY)
    console.log(gCurrFrames);
    // drawTextFrame(centerX, lineHeight + 10, textWidth, textHeight)
}

function displayImage() {
    const elSaved = document.querySelector('.saved-memes')
    const elCanvasContainer = document.querySelector('.canvas-container')
    elCanvasContainer.style.display = 'none'
    const elMainContainer = document.querySelector('.main-container')
    elMainContainer.style.display = 'block'
    elSaved.style.display = 'none'

}

function displayCanvas() {
    const elSaved = document.querySelector('.saved-memes')
    const elMainContainer = document.querySelector('.main-container')
    elMainContainer.style.display = 'none'
    const elCanvasContainer = document.querySelector('.canvas-container')
    elSaved.style.display = 'none'
    elCanvasContainer.style.display = 'grid'
}

function displaySaved() {
    const elMainContainer = document.querySelector('.main-container')
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elSaved = document.querySelector('.saved-memes')
    elMainContainer.style.display = 'none'
    elCanvasContainer.style.display = 'none'
    elSaved.style.display = 'grid'
    const savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || []
    elSaved.innerHTML = ''

    savedMemes.forEach(dataURL => {
        const img = new Image()
        img.src = dataURL
        img.onload = function () {
            const newCanvas = document.createElement('canvas')
            newCanvas.width = img.width
            newCanvas.height = img.height
            const ctx = newCanvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            elSaved.appendChild(newCanvas)
        }
    })
}

function onAddNewLine() {
    addNewLine()
    switchLine()
    renderCanvas()
}

function switchLine() {
    console.log(gMeme.selectedLineIdx)
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gCurrLines

    const elTextBox = document.querySelector('.text-input')
    if (gMeme.lines[gMeme.selectedLineIdx].txt === 'Add Text Here') elTextBox.value = ''
    else elTextBox.value = gMeme.lines[gMeme.selectedLineIdx].txt

    renderCanvas()
}

function onDown(ev) {
    const pos = getEvPos(ev)
    console.log(pos);
    if (!isTextClicked(pos)) return
    setTextDrag(true)
    initialMousePos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    const isDrag = gMeme.lines[gMeme.selectedLineIdx].isDrag
    console.log(isDrag);
    if (!isDrag) return
    console.log('moving')
    const pos = getEvPos(ev)

    const dx = pos.x - initialMousePos.x
    const dy = pos.y - initialMousePos.y
    moveText(dx, dy)

    initialMousePos = pos
    renderCanvas()
}

function onUp() {
    setTextDrag(false)
    document.body.style.cursor = 'default'

}


function getEvPos(ev) {
    let pos = {
        x: ev.offsetX - gElCanvas.getBoundingClientRect().left,
        y: ev.offsetY - gElCanvas.getBoundingClientRect().top
    }
    return pos
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        let img = new Image()
        img.src = event.target.result
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    renderCanvas(img)
    gMeme.selectedImgId = img.id
    gSelectedLineIdx = 0
    displayCanvas()

}

function onSearch() {
    const selectedOption = document.getElementById('filterOptions').value;
    const searchValue = document.querySelector('.search').value.toLowerCase();

    const filteredImages = gImgs.filter(image => {
        const matchesOption = selectedOption === 'all' || image.keywords.includes(selectedOption);
        const matchesSearch = image.keywords.some(keyword => keyword.includes(searchValue));
        return matchesOption && matchesSearch;
    });

    displayFilteredImages(filteredImages);
}

function displayFilteredImages(images) {
    const elImgContainer = document.querySelector('.img-container')
    elImgContainer.innerHTML = ''

    images.forEach(image => {
        const elImgElement = document.createElement('img')
        elImgElement.src = image.url
        elImgElement.setAttribute('data-img-id', image.id)
        elImgElement.onclick = () => onSelectImg(elImgElement)
        elImgContainer.appendChild(elImgElement)
    })
}

function onSetLang(lang) {
    setLang(lang)
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans()

}

function getTxtByPos(pos) {
    const currMeme = getMeme()
    let index = false
    currMeme.txt.forEach((txt, i) => {
        const txtPosX = txt.pos.x + gElCanvas.width
        const txtPosY = txt.pos.x * gElCanvas.height / 5 + txt.id + 20
        if (pos.x < txtPosX && pos.y < txtPosY && pos.y > txtPosY - 57) index = i + 1

    })
    return index
}

function getRandomMeme() {
    const imgUrls = [
        'imgs/0.jpg',
        'imgs/2.jpg',
        'imgs/3.jpg',
        'imgs/4.jpg',
        'imgs/5.jpg',
        'imgs/6.jpg',
        'imgs/7.jpg',
        'imgs/8.jpg',
        'imgs/9.jpg',
        'imgs/10.jpg',
        'imgs/11.jpg',
        'imgs/12.jpg',
        'imgs/13.jpg',
        'imgs/14.jpg',
        'imgs/15.jpg',
        'imgs/16.jpg',
        'imgs/17.jpg',
        'imgs/18.jpg',
    ];
    const randomIndex = Math.floor(Math.random() * imgUrls.length);
    const selectedImgUrl = imgUrls[randomIndex];

    const img = new Image();
    img.src = selectedImgUrl;
    img.onload = () => {
        gMeme.selectedImgId = randomIndex + 1; // Update the selected image ID
        renderCanvas(img); // Render the randomly selected image
        displayCanvas();
    };
    getRandomItem(randWords)
}
const randWords = ['That moment when','mood:', 'tell me more', 'cheers',
'It will be a short lesson today', 'javascript', 'css','HTML','cats','dogs','What would you have done?' ]

function getRandomItem(arr) {

    const randomIndex = Math.floor(Math.random() * arr.length);

    const item = arr[randomIndex];
    gMeme.lines[gMeme.selectedLineIdx].txt = item
    return item
}

