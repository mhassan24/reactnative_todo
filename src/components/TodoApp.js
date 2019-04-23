import React, { Component } from "react";
import {View,StyleSheet,TextInput,Button,ScrollView} from "react-native";
import { connect } from 'react-redux'
import { addTodo } from '../actions/actionCreater';
import RenderTodo from './RenderTodo'

const mapStateToProps = state => ({
    // state.todos coz the state handled by todos reducer is todo,
    // one reducer should only handle one state  
    todos: state.todos
})

const mapDispatchToProps = (dispatch)=>({
    addTodo:(text)=>{
       dispatch(addTodo(text))
     }
  })
  
class TodoApp extends Component {

    state = {
        text: ''
    }

    addTodo = (text) => {
        // empty todo will not be added
        if(text!==""){
        // Now calling the addTodo method in action file through mapDispatchToProps method above
        // didn't do the whole thing in mapDispatch method above, coz can't access state there..
        this.props.addTodo(text)
        this.setState({ text: '' })
    }
}

    render() {
        return (
         <View>
          <View>
            <TextInput placeholder="Add Todo" style={styles.Input}  
                 onChangeText={(text) => this.setState({ text })}
                 value={this.state.text}/>
            <Button
            onPress={() => this.addTodo(this.state.text)}
            title="Add"
            color="#841584"
            />

           </View>

           <ScrollView>
           {this.props.todos.map(todo =>
            <RenderTodo key={todo.id} text={todo.text} id={todo.id} />
            )}
            </ScrollView>

          </View>
        );
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoApp);

const styles = StyleSheet.create({
    Input:{
        marginTop:10,
        paddingLeft:"10%",
        width:"85%",
        fontSize:15
       }
});