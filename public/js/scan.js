let prevCode = '';

function showModal(msg){
  const greetScreen = document.querySelector('.greet-screen');
  const societyName = document.getElementById('societyName');
  societyName.textContent = msg;
  greetScreen.classList.toggle('greet-screen-show');
}


Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      // .. use this to start scanning.
      const html5QrCode = new Html5Qrcode(/* element id */ "reader");
  html5QrCode.start(
    { facingMode: "environment" }, 
    {
      fps: 10,    // Optional frame per seconds for qr code scanning
      qrbox: 200  // Optional if you want bounded box UI
    },
    async (qrCodeMessage) => {
      if(prevCode !== qrCodeMessage){
        prevCode = qrCodeMessage;
        let res = await axios.post('/log/entry/add', {qrValue: qrCodeMessage});
        if(res.data.status){
          showModal(res.data.name);
          html5QrCode.stop();
        }
      }
    },
    errorMessage => {
      // parse error, ignore it.
    })
  .catch(err => {
    // Start failed, handle it.
    alert(err);
  });
    }
  }).catch(err => {
    // handle err
    alert(err);
});

