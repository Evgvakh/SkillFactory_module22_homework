const btn1 = document.querySelector('.button1');
const screenSize = document.querySelector('.screen-size');
const coor = document.querySelector('.location');

btn1.addEventListener('click', () => {
    const width = window.screen.width;
    const height = window.screen.height;

    screenSize.textContent = `Screen width: ${width} px, screen height: ${height} px`;

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {          
          const latitude  = position.coords.latitude;
          const longitude = position.coords.longitude;
          
          coor.textContent = `Your current location is: ${latitude}, ${longitude}`;          
        });
    } else {
        coor.textContent = `Your current location information is unavailable`;
    }   
});

//-------------------------------------------------------------------------------------//

const btn2 = document.querySelector('.button2');
const timeZone = document.querySelector('.timezone');
const localTime = document.querySelector('.local-time');

btn2.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {          
        const latitude2  = position.coords.latitude;
        const longitude2 = position.coords.longitude;
        
        let linkForTimezone = `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude2}&long=${longitude2}`;
        fetch(linkForTimezone) 
            .then((response) => {       
                return response.json();
            })
            .then((data) => {                    
                timeZone.textContent = `Your timezone: ${data.timezone}`;
                localTime.textContent = `Your local time: ${data.date_time_txt}`;
            });                     
        });
    }
});
