# A Google Momentum Clone
[Guo-Momentum-Clone](https://guo-momentum.netlify.app/)
Built with react and bootstrap, this was a fun project to play around with some web apis and local storage logic to imitate some of Google Momentum's functions.

![image](https://user-images.githubusercontent.com/100171223/191363156-7faa04e4-e20c-4bfa-97e8-0e40bf6a3ecd.png)



## Tools and Technologies

## Challenges and Lessons Learned
The biggest challenge faced was the asynchronous behavior of receiving the responses from the web-apis, setting the response in local storage, 
as well as setting the state of objects to be rendered. 

Understanding how useState and useEffect work is very important in optimizing the performance of an application, in order to prevent unneccessary renders.
Even in a small project like this one, poor state handling can cause large delays or errors due to infinite rerenders.

