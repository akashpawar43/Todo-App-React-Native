import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer'
import { RootDrawerParams } from '../../App'
import { useNavigation } from '@react-navigation/native'

type ListProps = {
    getData: () => {},
    data: {
        _id: string,
        title: string,
        description: string,
        complete: false,
        __v: number
    },
    // navigation: DrawerNavigationProp<RootDrawerParams>;
}

const List = ({ getData, data }: ListProps) => {
    const navigation = useNavigation<DrawerNavigationProp<RootDrawerParams>>();
    const handleDeleteTodo = async (id: string) => {
        try {
            const res = await fetch(`https://todo-redux-backend.vercel.app/delete/${id}`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            getData();
        } catch (error) {
            console.log("error while delete:", error);
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('ViewTodo', { id: data._id })}>
                <Text style={styles.titletxt}>{data.title}</Text>
                <Text style={styles.descTxt} numberOfLines={3}>{data.description}</Text>
                <View style={styles.rightContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('ViewTodoNew', { todoId: data._id })}>
                        <Icon reverse name='eye' type='font-awesome' size={20} color='#5670cd' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('EditTodo', { id: data._id })}>
                        <Icon reverse name='edit' size={20} color='#5670cd' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteTodo(data._id)}>
                        <Icon reverse name='delete' size={20} color='#5670cd' />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default List;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#c4cded',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 8,
        // marginBottom: 15,
    },
    titletxt: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    descTxt: {
        flexWrap: 'wrap'
    },
    rightContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
    }
})