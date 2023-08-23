'use strict'
var gMeme
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
    { id: 18, url: 'imgs/18.jpg', keywords: ['toy story', 'woody'] }
]

function createMeme() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                size: 20,
                color: 'red'
            }
        ]
    }
}

function getMeme() {
    return gMeme
}

