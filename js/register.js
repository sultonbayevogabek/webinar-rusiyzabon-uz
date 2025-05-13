'use strict';

(async _ => {
  const statistics = new Statistics();
  let user = JSON.parse(localStorage.getItem('user'));

  const joinButton = document.querySelector('#joinToChannel')
  joinButton?.addEventListener('click', async (e) => {
    joinButton.disabled = true;
    await statistics.onClickTgBtn();
    joinButton.disabled = false;
    window.location.href = 'https://t.me/+GScaBFqeR75kMzEy';
  })

  if (user && user?.name && user?.phone && user?.time) {
    const utmParams = statistics.getUtmParams();
    console.log(utmParams);
    const formData = new FormData();

    formData.append('Ismi', user?.name);
    formData.append('Telefon raqami', user?.phone);
    formData.append(`Ro'yxatdan o'tgan vaqti`, user?.time);
    formData.append(`Foydalanuvchi ID`, statistics.userId);
    formData.append(`Timestamp`, statistics.time?.toString());
    formData.append('utm_source', utmParams.utmSource);
    formData.append('utm_medium', utmParams.utmMedium);
    formData.append('utm_campaign', utmParams.utmCampaign);

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

