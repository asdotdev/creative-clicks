import React, { useEffect } from "react";
import DraggableSticker from "./DraggableSticker";
import { StyleSheet, View } from "react-native";
import { usePreviewContext } from "@/contexts/PreviewContext";
import { runOnJS, useDerivedValue } from "react-native-reanimated";

export default function Sticker() {
    const {
        stickers,
        currentSticker,
        isPanGestureEnded,
        updateCurrentSticker,
    } = usePreviewContext();

    useDerivedValue(() => {
        if (
            currentSticker.value &&
            isPanGestureEnded.value === currentSticker.value.id
        ) {
            runOnJS(updateCurrentSticker)(currentSticker.value);
        }
    }, []);

    useEffect(() => {
        isPanGestureEnded.value = "none";
        currentSticker.value = null;
    }, [stickers]);

    return (
        <>
            <View style={StyleSheet.absoluteFill} />
            {stickers.map((sticker) => (
                <DraggableSticker key={sticker.id} sticker={sticker} />
            ))}
        </>
    );
}
