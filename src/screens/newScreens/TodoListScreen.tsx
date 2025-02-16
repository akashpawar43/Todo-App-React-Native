import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  StyleProp,
  ViewStyle
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RootDrawerParams } from '../../../App'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from '../store/actions/todoActions/todoActions'

type Todo = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  category: string;
}

const TodoListScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParams>>()
  // const [todos, setTodos] = useState<Todo[]>([])
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('dueDate')
  const [filterBy, setFilterBy] = useState('all')
  // const [refreshing, setRefreshing] = useState(false)
  const { loading, error, todos } = useSelector((state: any) => state.todoReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
    // fetchTodos()
  }, [])

  useEffect(() => {
    applyFiltersAndSort()
  }, [todos, searchQuery, sortBy, filterBy])

  // const fetchTodos = async () => {
  //   try {
  //     const response = await fetch('https://todo-redux-backend.vercel.app/')
  //     const data = await response.json()
  //     setTodos(data)
  //   } catch (error) {
  //     console.error('Error fetching todos:', error)
  //   }
  // }

  const applyFiltersAndSort = () => {
    let filtered = todos.filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (filterBy !== 'all') {
      filtered = filtered.filter(todo => todo.status.toLowerCase() === filterBy)
    }

    filtered.sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      } else if (sortBy === 'priority') {
        const priorityOrder = { 'Low': 0, 'Medium': 1, 'High': 2, 'Urgent': 3 }
        return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder]
      }
      return 0
    })

    setFilteredTodos(filtered)
  }

  const onRefresh = async () => {
    dispatch(fetchTodos());
  }

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const priorityStyle = styles[item.priority.toLowerCase() + 'Priority' as keyof typeof styles] as ViewStyle || {};
    const statusStyle = styles[item.status.toLowerCase().replace(/\s/g, '') + 'Status' as keyof typeof styles] as ViewStyle || {};

    return (
      <TouchableOpacity
        style={styles.todoItem}
        onPress={() => navigation.navigate('ViewTodo', { id: item._id })}
      >
        <View style={styles.todoHeader}>
          <Text style={styles.todoTitle}>{item.title}</Text>
          <View style={[styles.badge, priorityStyle]}>
            <Text style={styles.badgeText}>{item.priority}</Text>
          </View>
        </View>
        <Text style={styles.todoDescription} numberOfLines={2}>{item.description}</Text>
        <View style={styles.todoFooter}>
          <Text style={styles.todoDate}>{new Date(item.dueDate).toLocaleDateString()}</Text>
          <View style={[styles.badge, statusStyle]}>
            <Text style={styles.badgeText}>{item.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name='menu' size={33}
          // color='white'
          onPress={() => navigation.toggleDrawer()}
        />
        <Text style={styles.headerTitle}>Todo List</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddTodo')}>
          <Icon
            name="add-circle-outline"
            type="ionicon"
            size={24}
            color="#333"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Icon
          name="search-outline"
          type="ionicon"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search todos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterSort}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSortBy(sortBy === 'dueDate' ? 'priority' : 'dueDate')}
        >
          <Text style={styles.filterButtonText}>
            Sort by: {sortBy === 'dueDate' ? 'Due Date' : 'Priority'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterBy(filterBy === 'all' ? 'pending' : 'all')}
        >
          <Text style={styles.filterButtonText}>
            Filter: {filterBy === 'all' ? 'All' : 'Pending'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        // data={todos}
        data={filteredTodos}
        renderItem={renderTodoItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
    shadowColor: "#5670cd",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  filterSort: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#5670cd',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContainer: {
    padding: 10,
  },
  todoItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    // shadowColor: "#000",
    shadowColor: "#5670cd",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 8,
  },
  todoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  todoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  todoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoDate: {
    fontSize: 12,
    color: '#999',
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
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
})

export default TodoListScreen