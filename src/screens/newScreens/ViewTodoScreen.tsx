import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Animated,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootDrawerParams } from '../../../App';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, fetchSingleTodo } from '../store/actions/todoActions/todoActions';

interface Todo {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
    category: string;
}

type ViewTodoProps = {
    // navigation: DrawerNavigationProp<RootDrawerParams>,
    route: RouteProp<RootDrawerParams, 'ViewTodo'>,
}

export default function ViewTodoScreen({ route }: ViewTodoProps) {
    const navigation = useNavigation<DrawerNavigationProp<RootDrawerParams>>();
    const { id } = route.params;
    // const [todo, setTodo] = useState<Todo | null>(null);
    // const [loading, setLoading] = useState(false);
    const fadeAnim = new Animated.Value(0);
    const { loading, error, todo, deleteTodoId } = useSelector((state: any) => state.todoReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSingleTodo(id))
        // fetchTodo();
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [id]);

    useEffect(() => {
        if (!deleteTodoId) return;
        if (id == deleteTodoId)
            navigation.navigate('Home')
    }, [deleteTodoId])

    const handleDeleteTodo = async (id: string) => {
        dispatch(deleteTodo(id));
    }

    const getPriorityColor = (priority: string) => {
        const colors = {
            Low: '#4CAF50',
            Medium: '#FFC107',
            High: '#FF9800',
            Urgent: '#F44336',
        };
        return colors[priority as keyof typeof colors] || '#757575';
    };

    const getStatusColor = (status: string) => {
        const colors = {
            Pending: '#757575',
            'In Progress': '#2196F3',
            Completed: '#4CAF50',
            Archived: '#9E9E9E',
        };
        return colors[status as keyof typeof colors] || '#757575';
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#5670cd" />
            </View>
        );
    }

    if (!todo) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Todo not found</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <Animated.View style={[styles.content, { opacity: fadeAnim }]}> */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" type="ionicon" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditTodoNew', { id })}>
                    <Icon name="create-outline" type="ionicon" size={24} color="#5670cd" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>{todo?.title}</Text>
                    <View style={styles.badges}>
                        <View style={[styles.badge, { backgroundColor: getPriorityColor(todo?.priority) }]}>
                            <Text style={styles.badgeText}>{todo?.priority}</Text>
                        </View>
                        <View style={[styles.badge, { backgroundColor: getStatusColor(todo?.status) }]}>
                            <Text style={styles.badgeText}>{todo?.status}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Icon name="calendar-outline" type="ionicon" size={20} color="#666" />
                            <Text style={styles.infoLabel}>Due Date</Text>
                            <Text style={styles.infoValue}>
                                {new Date(todo?.dueDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Icon name="pricetag-outline" type="ionicon" size={20} color="#666" />
                            <Text style={styles.infoLabel}>Category</Text>
                            <Text style={styles.infoValue}>{todo?.category}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.descriptionCard}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.description}>{todo?.description}</Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDeleteTodo(todo?._id)}
                >
                    <Icon name="trash-outline" type="ionicon" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.completeButton]}
                    onPress={() => {/* Handle complete */ }}
                >
                    <Text style={styles.actionButtonText}>
                        {todo?.status === 'Completed' ? 'Reopen' : 'Mark Complete'}
                    </Text>
                </TouchableOpacity>
            </View>
            {/* </Animated.View> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    content: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 8,
    },
    editButton: {
        padding: 8,
    },
    scrollView: {
        flex: 1,
    },
    titleSection: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    badges: {
        flexDirection: 'row',
        gap: 8,
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    infoCard: {
        flex: 1,
        backgroundColor: '#fff',
        gap: 20,
        margin: 16,
        borderRadius: 12,
        padding: 20,
        shadowColor: '#5670cd',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
    },
    infoRow: {
        // marginBottom: 16,'
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
        width: 80,
    },
    infoValue: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
    descriptionCard: {
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 12,
        padding: 20,
        shadowColor: '#5670cd',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 10,

    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    footer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.00,
        elevation: 5,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        flex: 0,
        width: 48,
        borderRadius: 50,
    },
    completeButton: {
        backgroundColor: '#5670cd',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    backButtonText: {
        color: '#5670cd',
        fontSize: 16,
        fontWeight: '600',
    },
});