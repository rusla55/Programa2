import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../../misc/Colors";

export default function HomeScreen({navigation}){
    return (
        <View style = {styles.container}>
            <Text
                style = {{ fontSize: 26, fontWeight: "bold", alignSelf: "center"}}>
                Home Screen
            </Text>   
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 15,
        paddingTop: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: 500,
        color: "#41423F",
    },
    searchContainer: {
        flexDirection: "row",
        backgroundColor: "#F2f4EC",
    },
})