import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import CreateScreen from "./screens/CreateScreen";
import SearchScreen from "./screens/SearchScreen";
import PastasScreen from "./screens/recipes/PastasScreen";
import MainCoursesScreen from "./screens/recipes/MainCoursesScreen";
import AsiansScreen from "./screens/recipes/AsiansScreen";
import DessertsScreen from "./screens/recipes/DessertsScreen";
import RecipeScreen from "./screens/recipes/RecipeScreen";
import COLORS from "../misc/Colors";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
      backgroundColor: COLORS.white,
    },
    headerTintColor: COLORS.lightblack,
    headerBackTitle: "Back",
};
  
const MainStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name = "Home Page" component={HomeScreen} options = {{
            headerTitleAlign: 'center',
        }}/>
      </Stack.Navigator>
    );
}

const SearchStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name = "Search Recipe" component={SearchScreen} options = {{  
            headerTitleAlign: 'center' 
        }} />
        <Stack.Screen name = "Pasta Category" component={PastasScreen} options = {{
            headerTitleAlign: 'center',
        }} />
        <Stack.Screen name = "Main Courses Category" component={MainCoursesScreen} options = {{
            headerTitleAlign: 'center',
        }} />
        <Stack.Screen name = "Asians Category" component={AsiansScreen} options = {{
            headerTitleAlign: 'center',
        }} />
        <Stack.Screen name = "Desserts Category" component={DessertsScreen} options = {{
            headerTitleAlign: 'center',
        }} />
        <Stack.Screen name = "Recipe" component={RecipeScreen} options = {{
            headerTitleAlign: 'center',
        }} />
      </Stack.Navigator>
    );
}

const CreateRecipeStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name = "Create Recipe" component={CreateScreen} options = {{
            headerTitleAlign: 'center',
        }}/>
      </Stack.Navigator>
    );
}

export { MainStackNavigator, SearchStackNavigator, CreateRecipeStackNavigator };