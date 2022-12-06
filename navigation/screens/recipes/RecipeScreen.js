import * as React from "react";
import { ImageBackground, StyleSheet, Text, View, Dimensions, Button, TouchableHighlight } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from "../../../misc/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function RecipeScreen({route}){
    const [comments, setComments] = React.useState([]);
    const [comment, setComment] = React.useState("");
    const loadData = async(key) => {
        setComments([]);
        //await AsyncStorage.clear();
        try {
            await AsyncStorage.getItem(key).then(JSON.parse).then(items => {
                items.forEach(element => {
                    setComments(oldArray => [ ...oldArray, {
                        newComment: element
                    } ])
                });
            });
        } catch (err) {
            console.log(err);
        }
    }
    const storeData = async(key, value) => {
        try {
            await AsyncStorage.getItem(key).then(async items => {
                items = items == null ? [] : JSON.parse(items);
                items.push(value);
    
                await AsyncStorage.setItem(key, JSON.stringify(items));
                console.log(JSON.stringify(items));
            }).then(() => {
                alert("Comment posted!");
                loadData(key);
            })
        } catch (err) {
            console.log(err);
        }
    }
    const updateData = async(key, elementIndex) => {
        try {
            await AsyncStorage.removeItem(key);
            alert("Comment deleted!");
            const newArray = comments.filter((_, index) => index !== elementIndex);
            setComments([]);
            let jsonItems = [];
            await AsyncStorage.getItem(key).then(items => {
                items = items == null ? [] : JSON.parse(items);
                newArray.forEach(element => {
                    items.push(element.newComment);
                })
                jsonItems = items;
            }).then(async () => {
                await AsyncStorage.setItem(key, JSON.stringify(jsonItems));
            }).then(() => {
                loadData(key);
            })
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        loadData(route.params.id.toString());
    }, [])

    return (
        <ScrollView>
            <View style = {styles.container}>
                <ImageBackground style = {styles.icon} source = {{uri: route.params.imageUrl}}>
                    <Text style = {styles.boxTitle}>{route.params.name}</Text>
                </ImageBackground>
                <Text style = {{ paddingLeft: 10, paddingTop: 25, paddingBottom: 25, fontSize: 25,}}>{route.params.description }</Text>
                <Text style = {{ paddingLeft: 10, paddingTop: 10, fontSize: 20, marginBottom: 10 }}>Comments ({comments.length})</Text>
                { comments.length !== 0 ? (
                    <View>
                        {comments.map((element, index) =>
                            <View key= {index} style = {styles.commentBox}> 
                                <Text style = {{ paddingLeft: 10, paddingTop: 5, fontSize: 20 }}>{element.newComment}</Text> 
                                <Ionicons name = "close-sharp" size = {40} style = {styles.deleteBox} onPress = {() => updateData(route.params.id.toString(), index)}/>
                            </View>
                        )}
                    </View>
                ) : (
                    <Text style = {{ paddingLeft: 25, paddingTop: 5, fontSize: 20, paddingBottom: 30 }}>No comments added yet!</Text>
                ) }

                <Text style = {{ paddingLeft: 10, paddingTop: 50, fontSize: 20 }}>Write a comment</Text>

                <TextInput
                    style = {styles.commentInputBox}
                    placeholder = "Write a comment"
                    onChangeText = {setComment}
                    value = {comment}
                />
                <TouchableHighlight style = {styles.commentPostButton}>
                    <Button 
                        title = "Post comment"
                        onPress = {() => storeData(route.params.id.toString(), comment)}
                    />
                </TouchableHighlight>
            </View>
        </ScrollView>
    )
}

let screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent:'center',
    },
    boxTitle: {
        textAlign: "center",
        fontSize: 40,
        color: COLORS.white,
        position: "absolute",
        bottom: 40,
        fontWeight: "bold",
        textShadowColor: COLORS.black,
        textShadowRadius: 5,
    },
    icon: {
        flexGrow: 1,
        width: screenWidth,
        height: 500,
        alignItems: 'center',
        justifyContent:'center',
    },
    commentInputBox: {
        height: 50,
        margin: 10,
        borderWidth: 2,
        padding: 10,
        fontSize: 20,
    },
    commentPostButton: {
        height: 40,
        width: screenWidth - 25,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 50,
    },
    commentBox: {
        width: screenWidth - 20, 
        height: 40,
        marginTop: -5,
        marginBottom: 30,
        margin: 10, 
        borderWidth: 2,
        borderColor: COLORS.black, 
    },
    deleteBox: {
        alignSelf: "flex-end", 
        position: "absolute", 
        bottom: -5
    }
})