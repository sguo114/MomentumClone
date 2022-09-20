# A Google Momentum Clone
[Guo-Momentum-Clone](https://guo-momentum.netlify.app/)

Built with react and bootstrap, this was a fun project to play around with some web apis and local storage logic to imitate some of Google Momentum's functions.

This app provides:
- the current time
- a daily image, the photographer, and a link to their profile
- a daily quote and the author
- current temperature (defaults to New York unless geolocation is turned on)

Using local storage to remember the last day visited, the app will provide a new image and quote only if it is a new day or local storage is cleared. Weather is updated on each render. 

![image](https://user-images.githubusercontent.com/100171223/191363156-7faa04e4-e20c-4bfa-97e8-0e40bf6a3ecd.png)


## Tools and Technologies
React

Bootstrap

### API's
[Unsplash](https://unsplash.com/) 

[OpenWeatherMap](https://openweathermap.org/)

[Forismatic](https://forismatic.com/en/api/)

### Cloning this project
All needed packages are availble in the package.json, so running npm install will install the needed dependencies.
You will need your own keys for Unsplash and OpenWeatherMap API's. 

## Challenges and Lessons Learned
The biggest challenge faced was managing the asynchronous behavior of receiving the responses from the web-apis, setting the responses in local storage, 
as well as setting the state of objects to be rendered. 

Understanding how useState and useEffect work, is very important in optimizing the performance of an application, in order to prevent unneccessary renders.
Even in a small project like this one, poor state handling can cause large delays or errors due to infinite rerenders.

