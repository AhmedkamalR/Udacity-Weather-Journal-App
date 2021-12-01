let date = new Date(); // get current date
let newDate =
  date.getMonth() + 1 + '.' + date.getDate() + '.' + date.getFullYear(); // create date

const userInfo = document.getElementById('userInfo');

const performAction = (e) => {
  e.preventDefault(); // to avoid reload the page

  const zipCode = document.getElementById('zip').value; // get zip code value
  const content = document.getElementById('feelings').value; // get feelings value

  if (zipCode !== '') {
    // Url and API key
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = '8cbe212f307fec07350a7357e57d7d42&units=metric';
    // checking the exsits of zipcode
    generateBtn.classList.remove('invalid');
    getWeatherData(url, zipCode, apiKey)
      .then(function (data) {
        postData('/add', {
          temp: data.main.temp,
          date: newDate,
          content: content,
        });
      })
      .then(function () {
        updateUI();
      })
      .catch(() => {
        alert('The zip code is invalid.');
      });
    userInfo.reset(); // clear user info
  } else {
    generateBtn.classList.add('invalid');
  }
};
const generateBtn = document.getElementById('generate');
generateBtn.addEventListener('click', performAction); // button action

const getWeatherData = async (url, zipCode, apiKey) => {
  console.log(`${url}?q=${zipCode}&appid=${apiKey}`);
  const res = await fetch(`${url}?q=${zipCode}&appid=${apiKey}`);
  try {
    return await res.json();
  } catch (e) {
    console.log('error', e);
  }
};

const postData = async (url, data) => {
  // post the data
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      temp: data.temp,
      date: data.date,
      content: data.content,
    }),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const updateUI = async () => {
  // update html ui
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    console.log('allData', allData);
    if (
      allData.date !== undefined &&
      allData.temp !== undefined &&
      allData.content !== undefined
    ) {
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temp;
      document.getElementById('content').innerHTML = allData.content;
    }
  } catch (error) {
    console.log('error', error);
  }
};
