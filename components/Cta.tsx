import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type MaterialCommunityIconsNames =
    | "camera"
    | "camera-flip"
    | "camera-switch"
    | "camera-retake"
    | "sticker-emoji"
    | "checkbox-blank-circle"
    | "undo-variant"
    | "trash-can"
    | "file-download";

export interface ActionsProps {
    name: MaterialCommunityIconsNames;
    action: () => void;
    color?: string;
    size?: number;
}

export default function Cta({ cta }: { cta: ActionsProps }) {
    return (
        <TouchableOpacity
            key={cta.name}
            style={styles.button}
            onPress={cta.action}
        >
            <MaterialCommunityIcons
                name={cta.name}
                color={cta.color || "black"}
                size={cta.size || 32}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "lightgray",
        borderRadius: "50%",
        padding: 8,
    },
});
