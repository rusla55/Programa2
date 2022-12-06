import React, { useEffect, useState } from "react";
import COLORS from "../../../misc/Colors";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import { firebase } from '@react-native-firebase/database';
import { ScrollView } from "react-native-gesture-handler";

const AsiansScreen = ({navigation}) => {
    const [array, setArray] = useState([]);

    useEffect(() => {
        setArray([]);
        handleDataOnPageLoad();
    }, [])

    const handleDataOnPageLoad = () => {
        const reference = firebase.app().database("https://programa2-ca5a9-default-rtdb.europe-west1.firebasedatabase.app/");
        reference.ref("recipes")
        .orderByChild("categoryId")
        .equalTo("3")
        .once("value", (snapshot) => {
            snapshot.forEach((child) => {
                setArray(oldArray => [ ...oldArray, 
                    {
                        description: child.val().recipeDescription,
                        categoryId: child.val().categoryId,
                        imageUrl: child.val().imageURL,
                        name: child.val().name,
                        id: child.val().id
                    } 
                ]);
            })
        })
    }

    return (
        <View style={styles.center}>
            {array.length !== 0 ? (
                <ScrollView>
                    <View style = {styles.container}>
                    {array.map((element) => 
                      <TouchableOpacity key = {element.id} onPress={() => navigation.navigate("Recipe", { 
                                imageUrl: element.imageUrl, 
                                name: element.name, 
                                description: element.description, 
                                id: element.id 
                            })}>
                                <View style = {styles.box}>
                                    <ImageBackground style = {styles.icon} source = {{uri: element.imageUrl}}></ImageBackground>
                                    <Text style = {styles.boxTitle}>{element.name}</Text>
                                </View>
                        </TouchableOpacity>
                    )}
                    </View>
                </ScrollView>
            ) : null }
        </View>
    );
};

let screenWidth = Dimensions.get("window").width / 2;
const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 40,
        backgroundColor: COLORS.white,
    },
    box: {
        width: screenWidth - 20,
        height: 300,
        backgroundColor: COLORS.lightgrey,
        margin: 10,
        borderRadius: 15,
        opacity: 0.8,
    },
    boxTitle: {
        paddingLeft: 20,
        position: 'absolute',
        bottom: 10,
        fontSize: 20,
        color: COLORS.lightblack,
    },
    icon: {
        width: "100%",
        height: "85%",
        resizeMode: 'contain',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: "hidden",
    },
});

export default AsiansScreen;