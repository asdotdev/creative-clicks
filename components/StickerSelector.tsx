import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { stickers } from "@/stickers";
import React from "react";
import {
    FlatList,
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import { usePreviewContext } from "@/contexts/PreviewContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function StickerSelectors({
    closeModal,
}: {
    closeModal: () => void;
}) {
    const { bottom } = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const { updateStickers } = usePreviewContext();

    const handlePress = (image: ImageSourcePropType) => {
        const size = Math.round(width / 3);
        updateStickers({
            image,
            width: size,
            height: size,
            coord: [{ x: 0, y: 0 }],
            id: `sticker-${uuidv4()}`,
        });

        closeModal();
    };

    return (
        <FlatList
            data={stickers}
            renderItem={({ item, index }) => (
                <Pressable
                    onPress={() => handlePress(item)}
                    key={`sticker-${index}`}
                    style={styles.box}
                >
                    <Image
                        source={item}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </Pressable>
            )}
            keyExtractor={(_, index) => `sticker-${index}`}
            style={styles.container}
            numColumns={3}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            ListHeaderComponent={() => <View style={{ height: 20 }} />}
            ListFooterComponent={() => <View style={{ height: bottom }} />}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    box: {
        width: "28%",
        aspectRatio: 1,
        marginLeft: "4%",
        padding: 4,
    },
    itemSeparator: {
        width: "4%",
        aspectRatio: 1,
    },
    image: {
        width: "100%",
        height: "100%",
    },
});
