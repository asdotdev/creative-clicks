import React, { useEffect } from "react";
import { Canvas, Path } from "@shopify/react-native-skia";
import { usePreviewContext } from "@/contexts/PreviewContext";
import { runOnJS, useDerivedValue } from "react-native-reanimated";

export default function Drawing() {
    const { paths, currentPath, color, isPanGestureEnded, updatePaths } =
        usePreviewContext();

    useDerivedValue(() => {
        if (isPanGestureEnded.value === "drawLine") {
            runOnJS(updatePaths)();
        }
    }, [color]);

    useEffect(() => {
        isPanGestureEnded.value = "none";
        currentPath.value = "";
    }, [paths]);

    return (
        <Canvas style={{ flex: 1 }}>
            {paths.map((path, index) => (
                <Path
                    key={index}
                    path={path.path}
                    color={path.color}
                    strokeWidth={5}
                    style="stroke"
                />
            ))}
            <Path
                path={currentPath}
                color={color}
                strokeWidth={5}
                style="stroke"
            />
        </Canvas>
    );
}
