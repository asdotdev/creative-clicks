import React from "react";
import { StyleSheet, View } from "react-native";
import Cta, { ActionsProps } from "./Cta";

export default function Actions({
    ctas,
    boxMargin,
}: {
    ctas: ActionsProps[];
    boxMargin?: number;
}) {
    return (
        <View style={[styles.buttonContainer, { margin: boxMargin || 0 }]}>
            {ctas.map((cta) => (
                <Cta key={cta.name} cta={cta} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding: 32,
    },
});
