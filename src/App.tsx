import {
  StyleSheet,
  SafeAreaView,
  StatusBar as RNStatusBar,
} from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/firebaseConfig";
import Questions from "./screens/Questions";

const App: React.FC = () => {
  initializeApp(firebaseConfig);

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Questions />
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RNStatusBar.currentHeight,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
