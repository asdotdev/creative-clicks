import Home from "@/components/Home";
import { useCameraPermissions } from "expo-camera";
import { Button, Text, View } from "react-native";
import { usePermissions as useMediaLibraryPermissions } from "expo-media-library";
import RequestPermission from "@/components/RequestPermission";

export default function Index() {
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaLibraryPermissions, requestMediaLibraryPermissions] =
        useMediaLibraryPermissions();

    if (!cameraPermission || !mediaLibraryPermissions) {
        // Permissions are still loading.
        return <View />;
    }

    if (!cameraPermission.granted) {
        // Camera permissions are not granted yet.
        return (
            <RequestPermission
                target="camera"
                requestPermission={requestCameraPermission}
            />
        );
    }

    if (!mediaLibraryPermissions.granted) {
        // MediaLibrary permissions are not granted yet.
        return (
            <RequestPermission
                target="media library"
                requestPermission={requestMediaLibraryPermissions}
            />
        );
    }

    return <Home />;
}
