import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Headers from '../../components/Headers'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RootDrawerParams } from '../../../App'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

type AddTodoProps = {
    navigation: DrawerNavigationProp<RootDrawerParams>
}

const AddTodoScreen = () => {
    const navigation = useNavigation<DrawerNavigationProp<RootDrawerParams>>();
    const [data, setData] = useState({ title: '', description: '' });

    const handleAddTodo = async () => {
        try {
            const res = await fetch('https://todo-redux-backend.vercel.app/add', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            navigation.navigate('Home');
        } catch (error) {
            console.log('error:', error)
        }
    }

    return (
        <>
            <Headers title={'Add Todo'} />
            <View style={styles.container}>
                <Text style={styles.titleTxt}>Add Todo</Text>
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
                <TouchableOpacity onPress={handleAddTodo}>
                    <Text style={styles.addButton}>Add Todo</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default AddTodoScreen

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