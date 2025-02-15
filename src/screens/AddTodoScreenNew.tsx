import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ScrollView,
} from 'react-native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RootDrawerParams } from '../../App'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import Toast from 'react-native-toast-message'

type ZodFieldError = {
  _errors: string[];
};

type ZodErrorResponse = {
  // error: {
  _errors: string[];
  title?: ZodFieldError;
  description?: ZodFieldError;
  // };
};

const AddTodoScreenNew = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParams>>();
  const [errors, setErrors] = useState<ZodErrorResponse | {}>({});
  const [data, setData] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'Medium',
    status: 'Pending',
    category: 'Personal'
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const handleAddTodo = async () => {
    try {
      const res = await fetch('https://todo-redux-backend.vercel.app/add', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        const errorResponse = json.error as ZodErrorResponse
        const showErrors = Object.values(errorResponse)
          .flatMap(item => 
            Array.isArray(item) ? item : item._errors ?? []
          ).join('\n');

        Toast.show({
          type: 'error',
          text1: 'Required Fields',
          text2: `${showErrors}`,
          // text2: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A inventore voluptas debitis! Dicta recusandae cum suscipit nulla iure dignissimos eos deleniti nemo eaque!",
          props: {
            text2NumberOfLines: 5,
          }
        })
        return
      }
      navigation.navigate('Home')
    } catch (error) {
      console.log('error:', error)
    }
  }

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(animation, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(animation, { toValue: 0, duration: 200, useNativeDriver: true })
    ]).start()
  }

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || data.dueDate
    setShowDatePicker(Platform.OS === 'ios')
    setData({ ...data, dueDate: currentDate })
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back"
              type="ionicon"
              size={24}
              color="#333"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Todo</Text>
          <View style={{ width: 24 }} />
        </View>

        {JSON.stringify(errors)}
        <ScrollView style={styles.scrollView}>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Icon
                name="create-outline"
                type="ionicon"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <TextInput
                placeholder='Title'
                value={data.title}
                onChangeText={(value) => setData(data => ({ ...data, title: value }))}
                placeholderTextColor={'#999'}
                style={styles.input}
              />
            </View>
            {/* {(errors?.title && (data.title.length <= 3)) && <Text style={styles.errMsg}>{errors?.title?._errors[0]}</Text>} */}
            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
              <Icon
                name="document-text-outline"
                type="ionicon"
                size={20}
                color="#999"
                style={styles.textAreaIcon}
              />
              <TextInput
                placeholder='Description'
                value={data.description}
                onChangeText={(value) => setData(data => ({ ...data, description: value }))}
                placeholderTextColor={'#999'}
                multiline={true}
                numberOfLines={5}
                style={[styles.input, styles.textArea]}
              />
            </View>
            {/* {errors?.description && <Text style={styles.errMsg}>{errors?.description?._errors[0]}</Text>} */}
            <TouchableOpacity
              style={styles.inputWrapper}
              onPress={() => setShowDatePicker(true)}
            >
              <Icon
                name="calendar-outline"
                type="ionicon"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <Text style={styles.dateText}>
                {data.dueDate.toLocaleString()}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={data.dueDate}
                mode="datetime"
                display="default"
                onChange={onDateChange}
              />
            )}

            <View style={styles.inputWrapper}>
              <Icon
                name="flag-outline"
                type="ionicon"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <Picker
                selectedValue={data.priority}
                onValueChange={(value) => setData({ ...data, priority: value })}
                style={styles.picker}
              >
                <Picker.Item label="Low" value="Low" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="High" value="High" />
                <Picker.Item label="Urgent" value="Urgent" />
              </Picker>
            </View>

            <View style={styles.inputWrapper}>
              <Icon
                name="hourglass-outline"
                type="ionicon"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <Picker
                selectedValue={data.status}
                placeholder='Status'
                onValueChange={(value) => setData({ ...data, status: value })}
                style={styles.picker}
              >
                <Picker.Item label="Pending" value="Pending" />
                <Picker.Item label="In Progress" value="In Progress" />
                <Picker.Item label="Completed" value="Completed" />
                <Picker.Item label="Archived" value="Archived" />
              </Picker>
            </View>

            <View style={styles.inputWrapper}>
              <Icon
                name="pricetag-outline"
                type="ionicon"
                size={20}
                color="#999"
                style={styles.inputIcon}
              />
              <Picker
                selectedValue={data.category}
                onValueChange={(value) => setData({ ...data, category: value })}
                style={styles.picker}
              >
                <Picker.Item label="Personal" value="Personal" />
                <Picker.Item label="Work" value="Work" />
                <Picker.Item label="Shopping" value="Shopping" />
                <Picker.Item label="Fitness" value="Fitness" />
              </Picker>
            </View>
          </View>
        </ScrollView>

        <Animated.View style={{
          transform: [{
            scale: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.95]
            })
          }]
        }}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              animateButton()
              handleAddTodo()
            }}
          >
            <Text style={styles.addButtonText}>Add Todo</Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView >
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
  inputContainer: {
    padding: 20,
    gap: 15,
  },
  errMsg: {
    color: 'red'
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    shadowColor: "#5670cd",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    paddingLeft: 5,
    fontSize: 16,
    color: '#333',
    width: '95%',
    // height: '100%',
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  textAreaWrapper: {
    alignItems: 'flex-start',
    // paddingVertical: 15,
  },
  textAreaIcon: {
    marginRight: 10,
    marginTop: 15,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  dateText: {
    flex: 1,
    padding: 15,
    paddingLeft: 5,
    fontSize: 16,
    color: '#333',
  },
  picker: {
    flex: 1,
    height: 53,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#5670cd',
    borderRadius: 10,
    padding: 15,
    margin: 20,
    alignItems: 'center',
    shadowColor: "#5670cd",
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
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
})

export default AddTodoScreenNew