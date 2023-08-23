'use strict'
var gCtx
var gElCanvas
var gColor

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    createMeme()
    console.log(gMeme);
    // gElCanvas.addEventListener("click", onCanvasClick)
}

function renderCanvas() {
    gCtx.fillStyle = '#858181'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)

    if (gMeme.selectedImgId !== null) {
        var img = new Image()
        img.src = `imgs/${gMeme.selectedImgId}.jpg`
        img.onload = function () {
            renderMeme(img)
        }
    }
}

function renderMeme(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    onSetLine()
}

function onSelectImg(elImg) {
    const selectedImgId = parseInt(elImg.getAttribute('data-img-id'))
    gMeme.selectedImgId = selectedImgId
    renderMeme(elImg)
    displayCanvas()
}

function onChangeColor() {
    var colorBox = document.getElementById('colorInput')
    gColor = colorBox.value
    gMeme.lines[gMeme.selectedLineIdx].color = gColor
    onSetLine()

}

// function onSetLine() {
//     gMeme.lines[gMeme.selectedLineIdx].txt = ''
//     renderCanvas()
// }

function drawText() {
    var textBox = document.getElementById('textInput')
    var newText = textBox.value
    gMeme.lines[gMeme.selectedLineIdx].txt = newText
    onSetLine(newText)
    renderCanvas()
}

function onSetLine() {
    gCtx.fillStyle = gMeme.lines[gMeme.selectedLineIdx].color
    gCtx.font = gMeme.lines[gMeme.selectedLineIdx].size + 'px Arial'
    gCtx.textAlign = 'center'
    gCtx.fillText (gMeme.lines[gMeme.selectedLineIdx].txt, canvas.width / 2, canvas.height - gMeme.lines[gMeme.selectedLineIdx].size)
}

function changeSize(x, y, size) {

}

function displayImage() {
    const elCanvasContainer = document.querySelector('.canvas-container')
    elCanvasContainer.style.display = 'none'
    const elImageContainer = document.querySelector('.img-container')
    elImageContainer.style.display = 'block'
}

function displayCanvas() {
    const elImageContainer = document.querySelector('.img-container')
    elImageContainer.style.display = 'none'
    const elCanvasContainer = document.querySelector('.canvas-container')
    elCanvasContainer.style.display = 'block'
}