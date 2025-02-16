import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Header, Icon } from 'react-native-elements';
import { DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerParams } from '../../App';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

type HeaderProps = {
    title: string,
    // navigation: DrawerNavigationProp<RootDrawerParams>
}

const Headers = ({ title }: HeaderProps) => {
    const navigation = useNavigation<DrawerNavigationProp<RootDrawerParams>>();
    const rightIcon = title == "Home"
        ? <Icon name='add' size={33} color='white'
            onPress={() => navigation.navigate('AddTodo')}
        /> : <Icon name='home' size={33} color='white'
            onPress={() => navigation.navigate('Home')}
        />

    return (
        <>
            <Header
                placement="left"
                containerStyle={{
                    backgroundColor: '#5670cd',
                    borderBottomWidth: 0,
                }}
                statusBarProps={{ backgroundColor: "#5670cd", barStyle: 'dark-content' }}
                leftComponent={<Icon name='menu' size={33} color='white'
                    onPress={() => navigation.toggleDrawer()}
                />}
                centerComponent={{ text: title, style: { color: '#fff', fontSize: 22 } }}
                rightComponent={rightIcon}
            />
        </>
    )
}

export default Headers

const styles = StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: 'space-between',
    }
})