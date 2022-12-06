import * as React from "react";
import * as Progress from 'react-native-progress';
import { useState } from "react";
import { ScrollView, Text, View, StyleSheet, TextInput, Button, Image, Alert } from 'react-native';
import { launchImageLibrary } from "react-native-image-picker";
import { SelectList } from "react-native-dropdown-select-list"; 
import COLORS from "../../misc/Colors";
import storage from '@react-native-firebase/storage';
import { firebase } from '@react-native-firebase/database';

export default function CreateScreen({navigation}){
    const [recipeName, setRecipeName] = useState("");
    const [selected, setSelected] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const data = [
        { key: "1", value: "Pasta" },
        { key: "2", value: "Main Course" },
        { key: "3", value: "Asian" },
        { key: "4", value: "Dessert" }
    ]
    
    const handleImagePick = async () => {
        let result = await launchImageLibrary({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (result.assets) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadData = async () => {
        const filename = image.substring(image.lastIndexOf("/") + 1);
        const task = storage().ref(filename).putFile(image);
        setUploading(true);
        setTransferred(0);

        task.on("state_changed", snapshot => {
            setTransferred(Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000);
        })

        try {
            await task;
        } catch (err) {
            console.error(err);
        }

        await storage().ref(filename).getDownloadURL().then((downloadableImageUrl) => {
            const reference = firebase.app().database("https://programa2-ca5a9-default-rtdb.europe-west1.firebasedatabase.app/");
            let recordId = 0;
            reference.ref("recipes").once("value", (snapshot) => {
                recordId = snapshot.numChildren();
            }).then(() => {
                reference.ref("recipes/" + recipeName).set({
                    name: recipeName,
                    categoryId: selected,
                    imageURL: downloadableImageUrl,
                    recipeDescription: description,
                    id: recordId
                }).then(() => {
                    Alert.alert("Recipe Saved");
                    imageUrl = "";
                    setRecipeName("");
                    setDescription("");
                    setSelected("");
                    setImage(null);
                    setUploading(false);
                }).catch((err) => {
                    console.error(err);
                })
            })
        })
    }

    return (
        <View style = {{backgroundColor: COLORS.white, flex: 1}}>
            <ScrollView contentContainerStyle = {{
                    paddingTop: 50,
                    paddingHorizontal: 20,
                }}>
                <Text style = {{color: COLORS.black, fontSize: 40, fontWeigth: "bold"}}>
                    Create Recipe
                </Text>
                <TextInput
                    style = {styles.input}
                    placeholder = "Recipe Name"
                    onChangeText = {setRecipeName}
                    value = {recipeName}
                />
                <TextInput
                    style = {styles.input}
                    placeholder = "Description"
                    onChangeText = {setDescription}
                    value = {description}
                />
                
                <View style = {styles.space} />

                <SelectList
                    data = {data} 
                    setSelected = {setSelected} 
                    boxStyles = {[{ marginLeft: 0, marginRight: 0, margin: 15 }, styles.selectionBox]}
                    placeholder = "Recipe Category"
                />

                <Button style = {styles.button}
                    title = "Upload Image"
                    onPress = {handleImagePick}
                />
                <View style = {styles.space} />
                {image !== null ? (
                    <Image source = {{ uri: image }} style = {styles.imageBox} />
                ) : null}
                {uploading ? (
                    <View style = {styles.progressBarContainer}>
                        <Progress.Bar progress = {transferred} width = {300} alignSelf = "center" />
                    </View>
                ) : (
                    <Button 
                        style = {styles.button}
                        title = "Save Recipe"
                        onPress = {uploadData} >
                    </Button>
                )}
                <View style = {styles.hugeSpace} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 45,
        marginLeft: 0,
        marginRight: 0,
        margin: 15,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        marginBottom: 100,
    },
    progressBarContainer: {
        marginTop: 20
    },
    imageBox: {
        alignSelf: "center",
        width: 300,
        height: 300
    },
    space: {
        width: 20,
        height: 20,
    },
    hugeSpace: {
        width: 20,
        height: 200,
    },
    selectionBox: {
        borderRadius: 1,
        height: 45,
    }
});
