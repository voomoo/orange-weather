# OrangeWeather

This project was created as a given task from OrangeToolz. Task The given is completed and can be found at [orange-weather-voomoo.vercel.app](https://orange-weather-voomoo.vercel.app/)

> For any further information on this project

Mail me: rhasan.diu.cse@gmail.com
Call me: [+8801920992221](tel:+8801920992221)

> Technologies used to complete this:

- ReactJS
- Tailwind CSS
- ShadCN
- Axios
- Jotai

> Running the project locally:

To run the project locally just clone the project and run the following commands

    yarn
    yarn dev

Project will be available at localhost:5173 which is the default port for Vite React App.

> Environment Variables

Project will be unable to connect to the remote api or varify user with local storage without the valid .env file.
The .env file carries only 2 variable. The key for the variable are provided below and the values can be found in `.env.example` file

file

    VITE_BASE_API_URL=https://api.openweathermap.org/data/2.5/
    VITE_API_APP_ID=add your own app id here

> Intended folder structure

    . └── src/
    	    ├── api
    	    ├── components
    	    ├── hooks
    	    ├── layouts
    	    ├── lib

All the UI components can be found at `components/ui` folder. No routing were used as all the information required are in one page.
