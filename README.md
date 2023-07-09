# VoiceCommandPrompter

Small application that aims to show precise commands on the screen.

The app can recognise the following commands:

```code```

```count```

```back```

```reset```


If you register the command code or count followed by a digit from 1 to 9 the app will show what is being registered on the screen.

For example, if the user registers "Code one five seven" the screen will show Code 157.

The Back command removes the last recorded record while Reset clears the entire list.

The application is already designed to accept multiple languages and multiple words associated with a command, perhaps I will apply the enhancement in the future. 

## Getting Started

Here is a brief guide to start the project

### Prerequisites

To run this project you need react-native. If you don't have set it up yet follow this [guide](https://reactnative.dev/docs/environment-setup)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/SickFob/VoiceCommandPrompter.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Done! You can run it.
   ```js
   npx react-native
   ```
   
 ## Notes
 
This project was developed based on Android. It may not work on iOS.
 
