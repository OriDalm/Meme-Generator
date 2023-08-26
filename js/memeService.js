'use strict'
let gMeme
var gSelectedLineIdx
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'trump'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['baby', 'dog'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['cute', 'cat'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['happy', 'baby'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['confused', 'man'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['baby', 'funny'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['chocolate factory', 'tell me more'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['baby', 'sneaky'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['obama', 'funny'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['funny', 'kiss'] },
    { id: 12, url: 'imgs/12.jpg', keywords: ['righteous', 'man'] },
    { id: 13, url: 'imgs/13.jpg', keywords: ['leonardo', 'cheers'] },
    { id: 14, url: 'imgs/14.jpg', keywords: ['angry', 'spy'] },
    { id: 15, url: 'imgs/15.jpg', keywords: ['angry', 'man'] },
    { id: 16, url: 'imgs/16.jpg', keywords: ['star trek ', 'funny'] },
    { id: 17, url: 'imgs/17.jpg', keywords: ['putin', 'funny'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['toy story', 'woody'] },
]

function createMeme(center) {
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [
            {
                pos: { ...center },
                txt: 'Add Text Here',
                size: 40,
                color: 'white',
                isDrag: false
            },
            {
                pos: { ...center },
                txt: '',
                size: 40,
                color: 'white',
                isDrag: false
            }
        ]
    }
}

function getMeme() {
    return gMeme
}

function getPos() {
    return gMeme.lines[gMeme.selectedLineIdx].pos
}

function isTextClicked(clickedPos) {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    const canvasPos = { x: gElCanvas.width / 2, y: selectedLine.pos.y }
    const textSize = gCtx.measureText(selectedLine.txt).width

    return (
        clickedPos.x >= canvasPos.x - textSize / 2 &&
        clickedPos.x <= canvasPos.x + textSize / 2 &&
        clickedPos.y >= canvasPos.y - selectedLine.size &&
        clickedPos.y <= canvasPos.y
    )
}

function setTextDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function saveMeme() {
    const dataURL = gElCanvas.toDataURL()
    let savedMemes = JSON.parse(localStorage.getItem('savedMemes')) || []
    savedMemes.push(dataURL)
    localStorage.setItem('savedMemes', JSON.stringify(savedMemes))
}

function moveText(dx, dy) {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    selectedLine.pos.x += dx
    selectedLine.pos.y += dy
}

function loadCanvas() {
    var dataURL = localStorage.getItem('meme')
    var img = new Image()
    img.src = dataURL
    img.onload = function () {
        gCtx.drawImage(img, 0, 0)
    }
}