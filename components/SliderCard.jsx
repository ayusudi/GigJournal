import { StyleSheet, Dimensions, Pressable } from "react-native";
import Animated, { Extrapolation,interpolate,useAnimatedStyle } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("screen");

export default function SliderCard({ item, index, scrollX }) {
  const navigation = useNavigation();
  const animateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.25, 0, width * 0.25],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.825, 1, 0.825],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.itemContainer, animateStyle]}>
      <Pressable onPress={() => navigation.navigate("Detail", { item })}>
        <Animated.Image
          sharedTransitionTag={"taylorswift"}
          source={item.image}
          style={styles.image}
        />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: width,
  },
  image: {
    height: 540,
    width: 300,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
  }
});
