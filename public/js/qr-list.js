const qrList = document.querySelector('.qr-list');

qrList.addEventListener('click', (e)=>{
    e.stopPropagation();
    if(e.target.classList.contains('print-btn')){
        domtoimage.toJpeg(e.target.parentNode.parentNode.childNodes[1].childNodes[1], { quality: 1, height: 500, width: 500 })
        .then(function (dataUrl) {
            let link = document.createElement('a');
            link.download = `qrcode_${Date.now()}.jpeg`;
            link.href = dataUrl;
            link.click();
        });
    }
});