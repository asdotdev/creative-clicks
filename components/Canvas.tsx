import React from "react";
import { View, StyleSheet, Image } from "react-native";
import {
    GestureDetector,
    GestureHandlerRootView,
} from "react-native-gesture-handler";
import { usePreviewContext } from "@/contexts/PreviewContext";
import { Photo } from "@/interface";
import Drawings from "./Drawings";
import Stickers from "./Stickers";

export default function Canvas({ photo }: { photo: Photo }) {
    const { canvasRef, handlePanGesture } = usePreviewContext();

    return (
        <View
            ref={canvasRef}
            collapsable={false}
            style={[
                styles.flexOne,
                styles.imageBox,
                { aspectRatio: photo.width / photo.height },
            ]}
        >
            <Image
                style={styles.image}
                source={{ uri: photo.uri }}
                resizeMode="contain"
            />
            <GestureHandlerRootView style={[styles.flexOne]}>
                <GestureDetector gesture={handlePanGesture}>
                    <View
                        style={[styles.flexOne, { overflow: "hidden" }]}
                        collapsable={false}
                    >
                        <Drawings />
                        <Stickers />
                    </View>
                </GestureDetector>
            </GestureHandlerRootView>
        </View>
    );
}

const styles = StyleSheet.create({
    flexOne: { flex: 1 },
    imageBox: {
        position: "relative",
        height: "100%",
    },
    image: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
});
