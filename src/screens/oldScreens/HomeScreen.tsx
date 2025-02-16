import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Headers from '../../components/Headers'
import List from '../../components/List'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootDrawerParams } from '../../../App'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native'

type ListProps = {
    _id: string,
    title: string,
    description: string,
    complete: false,
    dueDate: string;
    priority: string;
    status: string;
    category: string;
    __v: number
}

type todoData = ListProps[]

const HomeScreen = () => {
    const [data, setData] = useState<todoData | []>([]);
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation<DrawerScreenProps<RootDrawerParams, 'Home'>>();
    const getData = async () => {
        try {
            setLoading(true);
            const res = await fetch('https://todo-redux-backend.vercel.app/');
            const json = await res.json();
            setData(json);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    // useFocusEffect(
    //     useCallback(() => {
    //         StatusBar.setBackgroundColor("red");
    //         StatusBar.setBarStyle("dark-content");
    //     }, [])
    // );

    const handleRefresh = () => {
        getData();
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            {/* <ScrollView> */}
            <Headers title={'Home'} />
            <View style={styles.container}>
                {/* <Text style={styles.titleTxt}>Your Todos</Text> */}
                {/* {data?.length !== 0 ? (
                    data?.map((item) => <List getData={getData} key={item._id} data={item} />)
                ) : (
                    <Text>No Todo Is There.</Text>
                )} */}
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <List getData={getData} key={item?._id} data={item} />
                    )}
                    keyExtractor={(item) => item?._id}
                    ListEmptyComponent={<Text>No Todo Is There.</Text>}
                    ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                    ListHeaderComponent={
                        <Text style={styles.headerText}>Your Todos</Text>
                    }
                    refreshing={loading}
                    onRefresh={handleRefresh}
                />
            </View>
            {/* </ScrollView > */}
        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    area: {
        backgroundColor: 'red'
    },
    container: {
        flex: 1,
        padding: 10,
        // gap: 10,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    titleTxt: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 12,
    },
})