import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    Image
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RootDrawerParams } from '../../../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from 'react-native-elements'

const ProfileScreen = () => {
    const navigation = useNavigation<DrawerNavigationProp<RootDrawerParams>>()
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        avatar: 'https://picsum.photos/150'
    })

    useEffect(() => {
        fetchUserData()
    }, [])

    const fetchUserData = async () => {
        // In a real app, you would fetch the user data from your API
        // For this example, we'll use dummy data
        setUserData({
            username: 'JohnDoe',
            email: 'john@example.com',
            avatar: 'https://picsum.photos/150'
            // avatar: 'https://via.placeholder.com/150'
        })
    }

    const handleUpdateProfile = async () => {
        try {
            // In a real app, you would send the updated data to your API
            // For this example, we'll just show a success message
            Alert.alert('Success', 'Profile updated successfully')
        } catch (error) {
            console.error('Update profile error:', error)
            Alert.alert('Error', 'An unexpected error occurred')
        }
    }

    const handleLogout = () => {
        // In a real app, you would clear the user's token and navigate to the login screen
        // For this example, we'll just navigate to the login screen
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon
                                name="arrow-back"
                                type="ionicon"
                                size={24}
                                color="#333"
                            />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Profile</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: userData.avatar }}
                            // source={{ uri: `${userData.avatar}?timestamp=${new Date().getTime()}` }}
                            onError={() => setUserData(prev => ({ ...prev, avatar: 'https://via.placeholder.com/150' }))}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.changeAvatar}>
                            <Icon
                                name="camera-outline"
                                type="ionicon"
                                size={24}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Icon
                                name="person-outline"
                                type="ionicon"
                                size={20}
                                color="#999"
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Username"
                                value={userData.username}
                                onChangeText={(text) => setUserData({ ...userData, username: text })}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon
                                name="mail-outline"
                                type="ionicon"
                                size={20}
                                color="#999"
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                keyboardType="email-address"
                                value={userData.email}
                                onChangeText={(text) => setUserData({ ...userData, email: text })}
                            />
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
                            <Text style={styles.buttonText}>Update Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    changeAvatar: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#5670cd',
        borderRadius: 20,
        padding: 8,
    },
    form: {
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#5670cd',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    logoutButton: {
        backgroundColor: '#f44336',
        marginTop: 20,
    },
})

export default ProfileScreen