import { Modal, Pressable, StyleSheet, View } from "react-native";
import StickerSelector from "./StickerSelector";
import ColorSelector from "./ColorSelector";

export type ModalType = "colorSelector" | "stickerSelector";

export default function CreateModal({
    modalVisible,
    closeModal,
}: {
    modalVisible?: ModalType;
    closeModal: () => void;
}) {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={!!modalVisible}
            onRequestClose={closeModal}
        >
            <Pressable style={StyleSheet.absoluteFill} onPress={closeModal} />
            <View style={styles.box}>
                {modalVisible === "colorSelector" && <ColorSelector />}
                {modalVisible === "stickerSelector" && (
                    <StickerSelector closeModal={closeModal} />
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    box: {
        maxHeight: "85%",
        marginTop: "auto",
        backgroundColor: "#232323",
        justifyContent: "center",
        alignItems: "center",
    },
});
