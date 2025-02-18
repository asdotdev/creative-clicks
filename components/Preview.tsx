import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Actions from "./Actions";
import CreateModal, { ModalType } from "./Modal";
import { usePreviewContext } from "@/contexts/PreviewContext";
import { Photo } from "@/interface";
import { ActionsProps } from "./Cta";
import Canvas from "./Canvas";

export default function Preview({
    photo,
    deletePhoto,
}: {
    photo: Photo;
    deletePhoto: () => void;
}) {
    const { color, onUndo, onDiscard, onSaveAsync } = usePreviewContext();
    const [modalVisible, setModalVisible] = useState<ModalType>();

    const handleModalVisibility = (type: ModalType) => {
        setModalVisible(type);
    };

    const handleSave = async () => {
        await onSaveAsync();
        deletePhoto();
    };

    const ctas: ActionsProps[] = [
        { name: "camera-retake", action: deletePhoto },
        {
            name: "sticker-emoji",
            action: () => handleModalVisibility("stickerSelector"),
        },
        {
            name: "checkbox-blank-circle",
            action: () => handleModalVisibility("colorSelector"),
            color: color,
        },
        { name: "undo-variant", action: onUndo },
        { name: "trash-can", action: onDiscard },
        { name: "file-download", action: handleSave },
    ];

    return (
        <SafeAreaView style={[styles.flexOne, styles.container]}>
            <Canvas photo={photo} />

            <View style={styles.actionBox}>
                <Actions ctas={ctas} />
            </View>

            <CreateModal
                modalVisible={modalVisible}
                closeModal={() => setModalVisible(undefined)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flexOne: { flex: 1 },
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    actionBox: {
        position: "relative",
        width: "100%",
    },
});
