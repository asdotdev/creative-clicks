import React, { useState, useRef } from "react";
import { View, StyleSheet, Button } from "react-native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import Actions from "./Actions";
import { Photo } from "@/interface";

export default function Camera({
    savePhoto,
}: {
    savePhoto: (obj: Photo) => void;
}) {
    const [facing, setFacing] = useState<CameraType>("back");
    const cameraRef = useRef<CameraView | null>(null);

    const toggleCameraFacing = () => {
        setFacing((current) => (current === "back" ? "front" : "back"));
    };

    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            if (photo) savePhoto(photo);
        }
    };

    return (
        <View style={styles.flexOne}>
            <CameraView
                ref={cameraRef}
                facing={facing}
                ratio="16:9"
                style={[styles.flexOne, styles.flexBox]}
            >
                <Actions
                    ctas={[
                        { name: "camera-flip", action: toggleCameraFacing },
                        { name: "camera", action: handleTakePhoto },
                    ]}
                    boxMargin={32}
                />
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    flexOne: { flex: 1 },
    flexBox: {
        justifyContent: "flex-end",
    },
});
