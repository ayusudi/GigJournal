import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
const { width, height } = Dimensions.get("screen");
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Detail({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.containerDetail}>
      <Animated.Image
        sharedTransitionTag={item.tag}
        source={item.image}
        style={{ width: width, height }}
      />
      <Animated.View style={styles.textContainer} entering={FadeIn.delay(600)}>
        <Text style={styles.textName}>{item.name}</Text>
        <Text style={styles.textStory}>{item.content}</Text>
        <Pressable
          style={styles.closeIcon}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="closecircleo" size={28} color="white" />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerDetail: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    paddingVertical: 80,
    paddingHorizontal: 40,
    height: height,
    width,
  },
  textName: {
    color: "white",
    fontSize: 32,
    marginTop: 8,
    fontWeight: "bold",
  },
  textStory: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
    textAlign: "justify",
  },
  closeIcon: { position: "absolute", top: 75, right: 40 },
});
