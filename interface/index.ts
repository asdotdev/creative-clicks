import { ImageSourcePropType, View } from "react-native";
import { PanGesture } from "react-native-gesture-handler";
import { SharedValue } from "react-native-reanimated";

export interface Photo {
    uri: string;
    width: number;
    height: number;
}

export interface Line {
    path: string;
    color: string;
}

export interface Coordinate {
    x: number;
    y: number;
}

export type StickerId = `sticker-${string}`;

export interface Sticker {
    id: StickerId;
    width: number;
    height: number;
    coord: Coordinate[];
    image: ImageSourcePropType;
}

export interface CurrentSticker {
    id: StickerId;
    coord: Coordinate;
    touchCoord: Coordinate;
    isUpdating: boolean;
}

export type InteractionTypes = "drawLine" | StickerId;

export type PanInteractionTypes = InteractionTypes | "none";

export interface PreviewState {
    color: string;
    paths: Line[];
    stickers: Sticker[];
    handlePanGesture: PanGesture;
    canvasRef: React.RefObject<View>;
    currentPath: SharedValue<string>;
    currentSticker: SharedValue<CurrentSticker | null>;
    isPanGestureEnded: SharedValue<PanInteractionTypes>;
    onUndo: () => void;
    onDiscard: () => void;
    updatePaths: () => void;
    onSaveAsync: () => Promise<void>;
    updateStickers: (sticker: Sticker) => void;
    updateColor: ({ hex }: { hex: string }) => void;
    updateCurrentSticker: (obj: CurrentSticker) => void;
}
