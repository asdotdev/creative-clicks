import { useTheme } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";

export default function RequestPermission({
    target,
    requestPermission,
}: {
    target: string;
    requestPermission: () => void;
}) {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color: colors.text }]}>
                {`We need your permission to use the ${target}`}
            </Text>
            <Button
                onPress={requestPermission}
                title={`grant ${target} permission`}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
    },
    text: {
        textAlign: "center",
        fontSize: 18,
    },
});
