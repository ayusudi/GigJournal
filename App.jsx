import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
const { width } = Dimensions.get("screen");

const data = [
  {
    id: 1,
    title: "Taylor Swift",
    image: require("./assets/taylorswift.jpg"),
  },
  {
    id: 2,
    title: "Coldplay",
    image: require("./assets/coldplay.jpg"),
  },
  {
    id: 3,
    title: "Blackpink",
    image: require("./assets/blackpink.png"),
  },
  {
    id: 4,
    title: "Imagine Dragons",
    image: require("./assets/imaginedragons.jpg"),
  },
  {
    id: 5,
    title: "Bruno Mars",
    image: require("./assets/brunomars.jpg"),
  },
];
const SliderCard = ({ item, index, scrollX }) => {
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
      <Image
        source={item.image}
        style={{
          height: 540,
          width: 300,
          borderRadius: 20,
        }}
      />
    </Animated.View>
  );
};

export default function Slider() {
  const scrollX = useSharedValue(0);
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });
  return (
    <View style={styles.container}>
      <View>
        <Animated.FlatList
          data={data}
          renderItem={({ item, index }) => (
            <SliderCard scrollX={scrollX} item={item} index={index} />
          )}
          horizontal
          showHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={onScrollHandler}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: width,
  },
});
