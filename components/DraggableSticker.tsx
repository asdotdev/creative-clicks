import React from "react";
import { Sticker } from "@/interface";
import { Image, StyleSheet } from "react-native";
import { usePreviewContext } from "@/contexts/PreviewContext";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

export default function DraggableSticker({ sticker }: { sticker: Sticker }) {
    const coord = sticker.coord[sticker.coord.length - 1];
    const { currentSticker } = usePreviewContext();

    const panStyle = useAnimatedStyle(() => {
        const obj = currentSticker.value;
        return obj && sticker.id === obj.id
            ? {
                  top: obj.coord.y - (obj.isUpdating ? obj.touchCoord.y : 0),
                  left: obj.coord.x - (obj.isUpdating ? obj.touchCoord.x : 0),
              }
            : { top: coord.y, left: coord.x };
    });

    return (
        <Animated.View
            onTouchStart={(e) => {
                currentSticker.value = {
                    id: sticker.id,
                    coord,
                    touchCoord: {
                        x: e.nativeEvent.locationX,
                        y: e.nativeEvent.locationY,
                    },
                    isUpdating: false,
                };
            }}
            style={[
                styles.box,
                {
                    width: sticker.width,
                    height: sticker.height,
                },
                panStyle,
            ]}
        >
            <Image source={sticker.image} style={styles.image} />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    box: { position: "absolute" },
    image: {
        width: "100%",
        height: "100%",
    },
});
