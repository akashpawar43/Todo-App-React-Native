import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RootDrawerParams } from '../../../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from 'react-native-elements'

const RegisterScreen = () => {
    const navigation = useNavigation<DrawerNavigationProp<RootDrawerParams>>()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleRegister = async () => {
        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Error', 'Passwords do not match')
            return
        }

        try {
            const response = await fetch('https://your-api-url.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }),
            })

            const data = await response.json()

            if (response.ok) {
                Alert.alert('Success', 'Registration successful', [
                    { text: 'OK', onPress: () => navigation.navigate('Login') }
                ])
            } else {
                Alert.alert('Error', data.message || 'Registration failed')
            }
        } catch (error) {
            console.error('Registration error:', error)
            Alert.alert('Error', 'An unexpected error occurred')
        }
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
                        <Text style={styles.headerTitle}>Register</Text>
                        <View style={{ width: 24 }} />
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
                                value={formData.username}
                                onChangeText={(text) => setFormData({ ...formData, username: text })}
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
                                value={formData.email}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon
                                name="lock-closed-outline"
                                type="ionicon"
                                size={20}
                                color="#999"
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry
                                value={formData.password}
                                onChangeText={(text) => setFormData({ ...formData, password: text })}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon
                                name="lock-closed-outline"
                                type="ionicon"
                                size={20}
                                color="#999"
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                secureTextEntry
                                value={formData.confirmPassword}
                                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                            />
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.linkText}>Already have an account? Login</Text>
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
        justifyContent: 'center',
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
    linkText: {
        color: '#5670cd',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
})

export default RegisterScreen