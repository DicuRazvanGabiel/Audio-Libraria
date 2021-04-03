import { registerRootComponent } from "expo";
import "react-native-gesture-handler";
import TrackPlayer from "react-native-track-player";
TrackPlayer.registerPlaybackService(() => require("./src/service"));
import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
