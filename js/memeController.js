'use strict'
var gCtx
var gElCanvas
var gColor
let gStartPos
let isDragging = false
let initialMousePos = { x: 0, y: 0 }

function onInit() {
   

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addMouseListeners()
    const center = { x: gElCanvas.width / 2, y: 75 }
    createMeme(center)
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
    const lineHeight = line.size + 35
    const bottomY = canvasHeight - (lineHeight / 2)


    gCtx.fillText(line.txt, canvas.width / 2, idx === 0 ? lineHeight : bottomY)
    gCtx.strokeText(line.txt, canvas.width / 2, idx === 0 ? lineHeight : bottomY)

    // if (idx === gSelectedLineIdx) {
    //     gCtx.strokeStyle = 'black'
    //     gCtx.lineWidth = 1
    //     gCtx.strokeRect(20, bottomY - line.size, canvas.width - 40, line.size + 10) 

    // }
}

function displayImage() {
    const elSaved = document.querySelector('.saved-memes')
    const elCanvasContainer = document.querySelector('.canvas-container')
    elCanvasContainer.style.display = 'none'
    const elMainContainer = document.querySelector('.main-container')
    elMainContainer.style.display = 'grid'
    elSaved.style.display = 'none'

}

function displayCanvas() {
    const elSaved = document.querySelector('.saved-memes')
    const elMainContainer = document.querySelector('.main-container')
    elMainContainer.style.display = 'none'
    const elCanvasContainer = document.querySelector('.canvas-container')
    elSaved.style.display = 'none'
    elCanvasContainer.style.display = 'flex'

    
}

function displaySaved() {
    const elMainContainer = document.querySelector('.main-container')
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elSaved = document.querySelector('.saved-memes')
    elMainContainer.style.display = 'none'
    elCanvasContainer.style.display = 'none'
    elSaved.style.display = 'block'
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



function addNewLine() {
    if (gSelectedLineIdx === 1) return
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    if (gMeme.lines[gMeme.selectedLineIdx].txt !== '') return
    gSelectedLineIdx = 1
    const elTextBox = document.getElementById('textInput')
    elTextBox.value = ''
    gMeme.lines[gMeme.selectedLineIdx].txt = 'Add Text Here'


    renderCanvas()
}

function switchLine() {
    console.log(gMeme.selectedLineIdx)
    if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = 1
        gSelectedLineIdx = 1

    } else {
        gMeme.selectedLineIdx = 0
        gSelectedLineIdx = 0
    }
    const elTextBox = document.querySelector('.text-input')
    elTextBox.value = gMeme.lines[gMeme.selectedLineIdx].txt


}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (isTextClicked(pos)) {
        isDragging = true
        initialMousePos = pos
        setTextDrag(true)
        document.body.style.cursor = 'grabbing'
    }
}

function onMove(ev) {
    const pos = getEvPos(ev)
    console.log(isDragging)
    if (isDragging) {
        console.log('moving')
        const dx = pos.x - initialMousePos.x
        const dy = pos.y - initialMousePos.y
        moveText(dx, dy)
        initialMousePos = pos
        renderCanvas()
    }
}

function onUp() {
    if (isDragging) {
        isDragging = false
        setTextDrag(false)
        document.body.style.cursor = 'default'

    }
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
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
    const searchValue = document.querySelector('.search').value.toLowerCase()

    const filteredImages = gImgs.filter(image => {
        return image.keywords.some(keyword => keyword.includes(searchValue))
    })

    displayFilteredImages(filteredImages)
}

function displayFilteredImages(images) {
    const imgContainer = document.querySelector('.img-container')
    imgContainer.innerHTML = ''

    images.forEach(image => {
        const imgElement = document.createElement('img')
        imgElement.src = image.url
        imgElement.setAttribute('data-img-id', image.id)
        imgElement.onclick = () => onSelectImg(imgElement)
        imgContainer.appendChild(imgElement)
    })
}

function onSetLang(lang) {
    setLang(lang)
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans()

}
