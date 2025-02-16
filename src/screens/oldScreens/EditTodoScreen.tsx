import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Headers from '../../components/Headers'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RootDrawerParams } from '../../../App'
import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import { StatusBar } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'

type TodoType = {
    title: string,
    description: string
}

type EditTodoProps = {
    // navigation: DrawerNavigationProp<RootDrawerParams>,
    route: RouteProp<RootDrawerParams, 'Edit Todo'>,
}

const EditTodoScreen = ({ route }: EditTodoProps) => {
    const navigation = useNavigation<DrawerNavigationProp<RootDrawerParams>>();
    const { id } = route.params;
    const [data, setData] = useState<TodoType>({ title: '', description: '' });

    const handleEditTodo = async () => {
        try {
            const res = await fetch(`https://todo-redux-backend.vercel.app/todo/${id}`, {
                method: 'patch',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            navigation.navigate('Home');
        } catch (error) {
            console.log('error:', error)
        }
    }

    const handleGetTodo = async () => {
        try {
            const res = await fetch(`https://todo-redux-backend.vercel.app/todo/${id}`, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' },
            });
            const json = await res.json();
            setData((prev) => ({
                ...prev,
                title: json.title,
                description: json.description
            }))
            console.log("post res:", json);
        } catch (error) {
            console.log('error:', error)
        }
    }

    useEffect(() => {
        handleGetTodo();
    }, [id]);

    return (
        <>
            <Headers title={'Edit Todo'} />
            <View style={styles.container}>
                {/* <Text style={styles.titleTxt}>Edit Todo</Text> */}
                <View style={styles.inputContainer}>
                    <View>
                        <Text style={styles.textLabel}>Enter Title</Text>
                        <TextInput
                            placeholder='Title'
                            value={data.title}
                            onChangeText={(value) => setData(data => ({
                                ...data,
                                title: value
                            }))}
                            placeholderTextColor={'gray'}
                            style={styles.txtInput}
                        />
                    </View>
                    <View>
                        <Text style={styles.textLabel}>Enter Description</Text>
                        <TextInput
                            placeholder='description'
                            value={data.description}
                            onChangeText={(value) => setData(data => ({
                                ...data,
                                description: value
                            }))}
                            placeholderTextColor={'gray'}
                            multiline={true}
                            numberOfLines={10}
                            style={[styles.txtInput, styles.textInputArea]}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={handleEditTodo}>
                    <Text style={styles.addButton}>Edit Todo</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default EditTodoScreen

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 0,
        gap: 10,
        flexDirection: 'column'
    },
    titleTxt: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    inputContainer: {
        gap: 10,
    },
    textLabel: {
        fontSize: 16,
        paddingBlock: 5,
        // fontWeight: 'semibold',
    },
    txtInput: {
        backgroundColor: '#c4cded',
        color: 'black',
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#5670cd',
        // borderColor: '#3550b1',
        padding: 15,
        fontSize: 18
    },
    textInputArea: {
        height: 200,
        textAlignVertical: 'top',
    },
    addButton: {
        backgroundColor: '#5670cd',
        color: 'white',
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 15,
        // marginHorizontal: 20,
        marginBottom: 40
    }
})