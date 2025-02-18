import { usePreviewContext } from "@/contexts/PreviewContext";
import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ColorPicker, {
    Panel1,
    OpacitySlider,
    HueSlider,
} from "reanimated-color-picker";

export default function ColorSelector() {
    const { bottom } = useSafeAreaInsets();
    const { color, updateColor } = usePreviewContext();

    return (
        <ColorPicker
            value={color}
            onComplete={updateColor}
            style={[
                styles.colorPicker,
                { marginTop: 20, marginBottom: bottom },
            ]}
        >
            <Panel1 />
            <HueSlider />
            <OpacitySlider />
        </ColorPicker>
    );
}

const styles = StyleSheet.create({
    colorPicker: {
        width: "90%",
        backgroundColor: "transparent",
        borderRadius: 10,
        padding: 20,
        gap: 20,
    },
});
