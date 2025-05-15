'use strict';

(async _ => {
  const statistics = new Statistics();
  let user = JSON.parse(localStorage.getItem('user'));

  document.querySelector('#joinToChannel')?.addEventListener('click', async () => {
    await statistics.onClickTgBtn();
    window.location.href = 'https://t.me/+vxfYx2hTe8dhODAy';
  })

  if (user && user?.name && user?.phone && user?.time) {
    const formData = new FormData();

    formData.append('Ismi', user?.name);
    formData.append('Telefon raqami', user?.phone);
    formData.append(`Ro'yxatdan o'tgan vaqti`, user?.time);
    formData.append(`Foydalanuvchi ID`, statistics.userId);
    formData.append(`Timestamp`, statistics.time?.toString());

    let response = await fetch('https://script.google.com/macros/s/AKfycbz3uONa-UhZogbISiZmAnKaVxVtV3crckdor1evv3GQSnoatZILEE4DAFZLXAqgEdtysg/exec', {
      method: 'POST',
      body: formData
    })
    await response.json();
    await statistics.onRegister(user);
    localStorage.removeItem('user');
  } else {
    localStorage.removeItem('user');
  }
})()

