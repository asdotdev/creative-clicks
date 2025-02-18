import { Gesture } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import React, { createContext, useContext, useRef, useState } from "react";
import {
    CurrentSticker,
    InteractionTypes,
    Line,
    Sticker,
    Coordinate,
    PanInteractionTypes,
    PreviewState,
} from "@/interface";
import { View } from "react-native";
import { captureRef } from "react-native-view-shot";
import { saveToLibraryAsync } from "expo-media-library";

const PreviewContext = createContext<PreviewState | null>(null);

const PreviewProvider = ({ children }: { children?: React.ReactNode }) => {
    const canvasRef = useRef<View>(null);

    const currentPath = useSharedValue<string>("");
    const currentSticker = useSharedValue<CurrentSticker | null>(null);
    const isPanGestureEnded = useSharedValue<PanInteractionTypes>("none");

    const [paths, setPaths] = useState<Line[]>([]);
    const [color, setColor] = useState<string>("#000000");
    const [stickers, setStickers] = useState<Sticker[]>([]);
    const [history, setHistory] = useState<InteractionTypes[]>([]);

    const handlePanGesture = Gesture.Pan()
        .averageTouches(true)
        .maxPointers(1)
        .minDistance(1)
        .onBegin((e) => {
            try {
                isPanGestureEnded.value = "none";
                if (currentSticker.value) {
                    const obj = currentSticker.value;
                    currentSticker.value = {
                        ...obj,
                        coord: { x: e.x, y: e.y },
                    };
                } else {
                    currentPath.value += `M ${e.x} ${e.y}`;
                }
            } catch (error) {
                console.error("Error on begin:", error);
            }
        })
        .onUpdate((e) => {
            try {
                if (currentSticker.value) {
                    currentSticker.value = {
                        ...currentSticker.value,
                        coord: { x: e.x, y: e.y },
                        isUpdating: true,
                    };
                } else {
                    currentPath.value += `L ${e.x} ${e.y}`;
                }
            } catch (error) {
                console.error("Error on update: ", error);
            }
        })
        .onEnd((e) => {
            try {
                if (currentSticker.value) {
                    currentSticker.value = {
                        ...currentSticker.value,
                        coord: { x: e.x, y: e.y },
                    };
                    isPanGestureEnded.value = currentSticker.value.id;
                } else {
                    currentPath.value += `L ${e.x} ${e.y}`;
                    isPanGestureEnded.value = "drawLine";
                }
            } catch (error) {
                console.error("Error on end: ", error);
            }
        });

    const updatePaths = () => {
        const obj: Line = { path: currentPath.value, color };

        setPaths((prev) => [...prev, obj]);
        setHistory((prev) => [...prev, "drawLine"]);
    };

    const updateStickers = (sticker: Sticker) => {
        setStickers((prev) => [...prev, sticker]);
        setHistory((prev) => [...prev, sticker.id]);
    };

    const updateCurrentSticker = (obj: CurrentSticker) => {
        setStickers((prev) => {
            const newArr = prev.map((each) => {
                const newObj = { ...each };
                if (newObj.id === obj.id) {
                    const newCoord: Coordinate = {
                        x: obj.coord.x - obj.touchCoord.x,
                        y: obj.coord.y - obj.touchCoord.y,
                    };
                    newObj.coord = [...newObj.coord, newCoord];
                }
                return newObj;
            });
            return newArr;
        });
        setHistory((prev) => [...prev, obj.id]);
    };

    const updateColor = ({ hex }: { hex: string }) => {
        setColor(hex);
    };

    const onUndo = () => {
        const lastHistoryItem = history[history.length - 1];

        switch (lastHistoryItem) {
            case "drawLine":
                setPaths((prev) => prev.slice(0, -1));
                break;
            default:
                setStickers((prev) => {
                    const newArr = prev
                        .map((each) => {
                            const newObj = { ...each };
                            if (each.id === lastHistoryItem) {
                                newObj.coord = newObj.coord.slice(0, -1);
                            }
                            return newObj;
                        })
                        .filter((each) => each.coord.length);
                    return newArr;
                });
                break;
        }

        setHistory((prev) => prev.slice(0, -1));
    };

    const onDiscard = () => {
        setPaths([]);
        setHistory([]);
        setStickers([]);
    };

    const onSaveAsync = async () => {
        try {
            const localUri = await captureRef(canvasRef, {
                width: 400,
                height: 400 * (16 / 9),
                quality: 1,
            });

            await saveToLibraryAsync(localUri);

            if (localUri) alert("Saved!");
        } catch (e) {
            console.error("Error on downloading:", e);
        }
    };

    return (
        <PreviewContext.Provider
            value={{
                color,
                paths,
                stickers,
                canvasRef,
                currentPath,
                currentSticker,
                handlePanGesture,
                isPanGestureEnded,
                onUndo,
                onDiscard,
                updateColor,
                updatePaths,
                onSaveAsync,
                updateStickers,
                updateCurrentSticker,
            }}
        >
            {children}
        </PreviewContext.Provider>
    );
};

const usePreviewContext = () => {
    const context = useContext(PreviewContext);

    if (!context)
        throw new Error(
            "usePreviewContext must be used within a PreviewProvider"
        );

    return context;
};

export { PreviewProvider, usePreviewContext };
