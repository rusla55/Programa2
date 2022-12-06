import * as React from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity  } from "react-native";
import COLORS from "../../misc/Colors";

export default function SearchScreen({navigation}){
    return (
        <View style = {styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Pasta Category")}>
                <View style = {styles.box}>
                    <Image 
                        style = {styles.icon} 
                        source={require("../../icons/pasta.png")} 
                    />
                    <Text style = {styles.boxTitle}>Pasta</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Main Courses Category")}>
                <View style = {styles.box}>
                    <Image 
                        style = {styles.icon} 
                        source={require("../../icons/main.png")} 
                    />
                    <Text style = {styles.boxTitle}>Main</Text>
                </View>
            </TouchableOpacity>
              
            <TouchableOpacity onPress={() => navigation.navigate("Asians Category")}>
                <View style = {styles.box}>
                    <Image 
                        style = {styles.icon} 
                        source={require("../../icons/asian.png")} 
                    />
                    <Text style = {styles.boxTitle}>Asian</Text>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate("Desserts Category")}>
                <View style = {styles.box}>
                    <Image 
                        style = {styles.icon} 
                        source={require("../../icons/dessert.png")} 
                    />
                    <Text style = {styles.boxTitle}>Dessert</Text>
                </View>
            </TouchableOpacity>
              <View>
            </View>
        </View>
    )
}

let screenWidth = Dimensions.get("window").width / 2;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 40,
    },
    box: {
        width: screenWidth - 10,
        height: 140,
        backgroundColor: "#D0D0D0",
        margin: 5,
        borderRadius: 15,
        opacity: 0.8,
        elevation: 25,
        shadowColor: COLORS.black
    },
    boxTitle: {
        alignSelf: "center",
        position: 'absolute',
        bottom: 10,
        fontSize: 20,
        color: COLORS.lightblack,
    },
    icon: {
        width: 200,
        height: 150,
        aspectRatio: 0.9,
        alignSelf: "center",
        resizeMode: 'contain',
        bottom: 20,
    },
})