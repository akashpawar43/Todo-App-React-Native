import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Alert,
    ViewStyle
} from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RootDrawerParams } from '../../../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from 'react-native-elements'

type ViewTodoRouteProp = RouteProp<RootDrawerParams, 'ViewTodo'>

const ViewTodoScreenNew = () => {
    const navigation = useNavigation<DrawerNavigationProp<RootDrawerParams>>()
    const route = useRoute<ViewTodoRouteProp>()
    const { id } = route.params
    const [todo, setTodo] = useState<any>(null)

    const priorityStyle = styles[todo.priority.toLowerCase() + 'Priority' as keyof typeof styles] as ViewStyle || {};
    const statusStyle = styles[todo.status.toLowerCase().replace(/\s/g, '') + 'Status' as keyof typeof styles] as ViewStyle || {};

    useEffect(() => {
        fetchTodo()
    }, [])

    const fetchTodo = async () => {
        try {
            const response = await fetch(`https://todo-redux-backend.vercel.app/todo/${id}`)
            const data = await response.json()
            setTodo(data)
        } catch (error) {
            console.error('Error fetching todo:', error)
        }
    }

    const handleDelete = () => {
        Alert.alert(
            "Delete Todo",
            "Are you sure you want to delete this todo?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            await fetch(`https://todo-redux-backend.vercel.app/delete/${id}`, {
                                method: 'DELETE',
                            })
                            navigation.navigate('Home')
                        } catch (error) {
                            console.error('Error deleting todo:', error)
                        }
                    }
                }
            ]
        )
    }

    if (!todo) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon
                        name="arrow-back"
                        type="ionicon"
                        size={24}
                        color="#333"
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>View Todo</Text>
                <TouchableOpacity onPress={() => navigation.navigate('EditTodo', { id })}>
                    <Icon
                        name="create-outline"
                        type="ionicon"
                        size={24}
                        color="#333"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.contentContainer}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Title</Text>
                        <Text style={styles.sectionContent}>{todo.title}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.sectionContent}>{todo.description}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Due Date & Time</Text>
                        <Text style={styles.sectionContent}>
                            {new Date(todo.dueDate).toLocaleString()}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Priority</Text>
                        <View style={[styles.badge, priorityStyle]}>
                            <Text style={styles.badgeText}>{todo.priority}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Status</Text>
                        <View style={[styles.badge, statusStyle]}>
                            <Text style={styles.badgeText}>{todo.status}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Category</Text>
                        <View style={[styles.badge, styles.categoryBadge]}>
                            <Text style={styles.badgeText}>{todo.category}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
            >
                <Icon
                    name="trash-outline"
                    type="ionicon"
                    size={24}
                    color="white"
                    style={styles.buttonIcon}
                />
                <Text style={styles.deleteButtonText}>Delete Todo</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginBottom: 5,
    },
    sectionContent: {
        fontSize: 18,
        color: '#333',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 8,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
    },
    badgeText: {
        color: '#fff',
        fontWeight: '600',
    },
    lowPriority: {
        backgroundColor: '#4caf50',
    },
    mediumPriority: {
        backgroundColor: '#ff9800',
    },
    highPriority: {
        backgroundColor: '#f44336',
    },
    urgentPriority: {
        backgroundColor: '#9c27b0',
    },
    pendingStatus: {
        backgroundColor: '#ffc107',
    },
    inprogressStatus: {
        backgroundColor: '#2196f3',
    },
    completedStatus: {
        backgroundColor: '#4caf50',
    },
    archivedStatus: {
        backgroundColor: '#9e9e9e',
    },
    categoryBadge: {
        backgroundColor: '#3f51b5',
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f44336',
        borderRadius: 10,
        padding: 15,
        margin: 20,
        shadowColor: "#f44336",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    buttonIcon: {
        marginRight: 10,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
})

export default ViewTodoScreenNew