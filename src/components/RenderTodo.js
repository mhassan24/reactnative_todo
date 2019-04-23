import { connect } from 'react-redux'
import React,{Component} from "react";
import {View,Text,TextInput,Button} from "react-native";
import {editText,deleteTodo } from '../actions/actionCreater';

const mapDispatchToProps =(dispatch)=>({
  editText:(id,edit_text)=>{
    dispatch(editText(id,edit_text))
   },
  deleteTodo:(id) => {
     dispatch(deleteTodo(id))
   }
})

class RenderTodo extends Component{
    
  editText=(id,edit_text)=>{
    if(edit_text!==""){
    // Now calling the editText method in action file through mapDispatchToProps method above,
    // didn't do the whole thing in mapDispatch method above, coz can't access state there..
        this.props.editText(id,edit_text)
        this.setState({editId:0})}
        else 
    // if in editing text is null then todo will be deleted
        this.props.deleteTodo(id)
     }

   editId=()=>{
     this.setState({
         editId:1,
         text:this.props.text
    })
   }

    state={
       editId:0,
       text:""
   }

    render(){
       return(
        <View>
          { this.state.editId=== 0 ?
// If editId is 0
           <View > 
             <Text >{this.props.text}</Text>
             <Button title="Edit"  color="#66bb6a" 
               onPress={()=>this.editId()}/>
             <Button title="delete" color="#66bb6a"
               onPress={ () => this.props.deleteTodo(this.props.id)}  />
           </View>
:
// If editId is 1
           <View>
             <TextInput 
               value={this.state.text}  onChangeText={(text) => this.setState({ text })} />
             <Button title="Update"  style={{ color: 'white'}} 
               onPress={ ()=>this.editText(this.props.id,this.state.text) }/>
            </View>
        }
        </View>   
    )}       
 }
 export default connect(null,mapDispatchToProps)(RenderTodo)