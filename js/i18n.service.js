'use strict'

const gTrans = {
    logo: {
        en: 'meme generator',
        he: 'הַמֵמַמֵם'
    },
    gallery: {
        en: 'Gallery',
        he: 'גלריה',
    },
    saved: {
        en: 'Saved',
        he: 'שמור',
    },
    'add-text-placeholder': {
        en: 'Add Text Here',
        he: 'הוסף טקסט כאן'
    },
    download: {
        en: 'Download',
        he: 'הורדה',
    },
    share: {
        en: 'Share',
        he: 'שיתוף',
    },
    save: {
        en: 'Save',
        he: 'שמירה',
    },
    'search-placeholder': {
        en: 'Search',
        he: 'חיפוש',
    },
    flexible: {
        en: 'i\'m Flexible',
        he: 'אני גמיש',
    }
}

var gCurrLang = 'en'

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'
    let transTxt = transMap[gCurrLang]
    if (!transTxt) transTxt = transMap.en
    return transTxt
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const transTxt = getTrans(transKey)
        if (el.placeholder) el.placeholder = transTxt
        else el.innerText = transTxt
    })
}

function setLang(lang) {
    gCurrLang = lang
}

function formatNumSimple(num) {
    return num.toLocaleString(gCurrLang)
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}

