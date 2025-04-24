import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    marginTop: Platform.OS === "ios" ? "auto" : 32,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#ffffff",
    fontSize: 16,
  },

  titleLg: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "600",
  },
  containerForm: {
    width: "100%",
    padding: 20,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  input: {
    backgroundColor: "#3E3E3E",
    width: "100%",
    borderRadius: 10,
    height: 40,
    color: "#fff",
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 10,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#841584",
    marginTop: 10,
  },
  buttonGhost: {
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
