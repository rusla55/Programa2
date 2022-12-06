import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator, SearchStackNavigator, CreateRecipeStackNavigator } from "./StackNavigator";
import Ionicons from "react-native-vector-icons/Ionicons";

const homePage = "Home";
const searchPage = "Search";
const recipeCreationPage = "Create";

const Tab = createBottomTabNavigator();

export default function TabNavigator(){
    return(
        <Tab.Navigator
            initialRouteName = {homePage}
            screenOptions = {({route}) => ({
                tabBarIcon: ({focused, color, size}) =>{
                    let iconName;
                    let routeName = route.name;
                    if (routeName == homePage){
                        iconName = focused ? "home" : "home-outline";
                    } else if (routeName == searchPage){
                        iconName = focused ? "search-sharp" : "search-outline";
                    } else if (routeName == recipeCreationPage){
                        iconName = focused ? "add-circle" : "add-circle-outline";
                    }
                    return <Ionicons name = { iconName } size = {size} color = {color}/>
                },
            })}>
            
            <Tab.Screen name = {homePage} component = {MainStackNavigator} options = {{ headerShown: false }}/>
            <Tab.Screen name = {searchPage} component = {SearchStackNavigator} options = {{ headerShown: false }}/>
            <Tab.Screen name = {recipeCreationPage} component = {CreateRecipeStackNavigator} options = {{ headerShown: false }}/>
        </Tab.Navigator>
    )
}