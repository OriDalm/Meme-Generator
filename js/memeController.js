'use strict'
var gCtx
var gElCanvas

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    createMeme()
    console.log(gMeme);
    // gElCanvas.addEventListener("click", onCanvasClick)
}

function renderCanvas() {
    renderMeme()
    drawText()
}

function renderMeme(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    
}

function onSelectImg(elImg) {
    renderMeme(elImg)
    displayCanvas()
}

function drawText( txt, color, size) {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.fillStyle = color
    context.font = `${size}px Ariel`
    context.textAlign = 'center'
    context.fillText(txt, canvas.width / 2, canvas.height - 20)

}

function submitText() {
    var textBox = document.getElementById('textInput')
    var newText = textBox.value
    gMeme.lines[gMeme.selectedLineIdx].txt = newText
    renderCanvas()
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