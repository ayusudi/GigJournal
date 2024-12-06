import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import data from "../data";
import SliderCard from "../components/SliderCard";

export default function Slider() {
  const scrollX = useSharedValue(0);
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => (scrollX.value = e.contentOffset.x)
  });

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.linearGradient} colors={["#170B15", "#1c1238", "#6A4C82"]}>
        <Text style={styles.header}>My Gig Journal</Text>
        <Animated.FlatList
          data={data}
          renderItem={({ item, index }) => (
            <SliderCard scrollX={scrollX} item={item} index={index} />
          )}
          horizontal
          showHorizontalScrollIndicator={false}
          onScroll={onScrollHandler}
        />
        <Text style={styles.createBy}>Created by Ayu Sudi</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
    top: 100,
    position: "absolute",
    color: "white",
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  createBy: {
    textAlign: "center",
    fontSize: 16,
    bottom: "5%",
    position: "absolute",
    color: "white",
  },
});