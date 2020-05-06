import * as React from 'react';
import { Button, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import Constants from 'expo-constants';

let id = 0

const TodoCounters = props => (
  <View style={[styles.counters]}>
    <Text style={styles.counterHeadings}>
      Item count:
      <Text>{props.items}</Text>
    </Text>
    <Text style={styles.counterHeadings}>
      Unchecked count:
      <Text>{props.unchecked}</Text>
    </Text>
  </View>
);

const Todo = props => (
  <View style={styles.todoContainer}>
    <Switch 
      value={props.todo.checked}
      onValueChange={props.onToggle}/>
    <Button
      onPress={props.onDelete}
      title="Delete" />
    <Text>
      {props.todo.text}
    </Text>
  </View>
)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

   getItems() {
    return this.state.todos.length
  }

  getUnCheckedItems() {
    return [...this.state.todos.filter(todo => todo.checked === false)].length
  }

  addTodo() {
    let todo = `Todo # ${id}`
    this.setState({
      todos:[...this.state.todos, {
        id: id++,
        text: todo,
        checked: false
      }]
    }, ()=> console.log(this.state.todos))
  }

  toggleTodo(id) {
    this.setState({
      todos: [...this.state.todos.map(todo => {
        if (todo.id === id) todo.checked = !todo.checked
        return todo})]
    })
  }

  deleteTodo(id) {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    })
  }

  render() {
    return (
    <View style={styles.container}>
        <Text style={styles.heading}>My TODO App (ReactNative)</Text>
        <TodoCounters
          items={this.getItems()}
          unchecked={this.getUnCheckedItems()}
        />
        <Button onPress={() => this.addTodo()}
          title="New TODO" />
        <ScrollView>
          {
            this.state.todos.map(todo => {
              return (
                <Todo 
                  key={todo.id}
                  todo={todo}
                  onDelete={() => this.deleteTodo(todo.id)}
                  onToggle={() => this.toggleTodo(todo.id)}
                />
              )})
          }
        </ScrollView>
      </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  counters: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterHeadings: {
    flex:0.5,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default App