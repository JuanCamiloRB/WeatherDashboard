 # WeatherBoard

  WeatherBoard is a mobile weather dashboard built with React Native, designed to deliver real-time weather updates, 5-day forecasts, and personalized features like favorite cities and temperature unit preferences.
 It integrates OpenWeather API, Redux Toolkit, Redux Persist, AsyncStorage, and React Testing Library for unit testing — ensuring smooth performance, reliable data persistence, and maintainable, testable code.
# Project Architecture

## Architecture Pattern:

  * Feature-based structure — components, slices, and gateways are modularly separated.

## State Management: Redux Toolkit

## Persistence: Redux Persis + AsyncStorage

## Network Layer: Axios for API requests

## API Provider: OpenWeatherMap API

## Testing

 React Testing Library + Jest — for component, integration, and async API tests in a React Native environment.

## Navigation: React Navigation

  * Real-time local weather using Geolocation
  * 5-day forecast using OpenWeather API
  * Add/remove favorite cities
  * View search history
  * Switch between Celsius / Fahrenheit
  * Persistent state using Redux Persist + AsyncStorage
  * Clean modular code architecture
  * Unit testing with React Testing Library and Jest

UI: React Native core components + custom styles with theming
This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started



> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: install NPM 
  #npm install

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh

there 
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: iOS Setup
Open the iOS folder:
cd ios
With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:
pod install
## Run IOS
npx react-native run-ios

### Android
Open the android folder:
cd android

## Create a file named local.properties if it doesn’t exist.

## Add your Android SDK path (update the username if different):

 ## sdk.dir=/Users/your_user/Library/Android/sdk

Save the file.

## Open Android Studio, start an emulator (or connect a physical device).

## Run the app:

npx react-native run-android

 # Notes

Make sure Android SDK and CocoaPods are properly installed.

If you encounter build issues, try cleaning:

cd android && ./gradlew clean


To check your environment setup:

npx react-native doctor

## Run Tests:
 * npm test

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
