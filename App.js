import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView,TextInput,StyleSheet, Text, View,TouchableOpacity, Keyboard, Alert } from 'react-native';
import React,{useState,useEffect} from 'react';
import Task from './components/Task';
import axios from 'axios';

export default function App() {
  const [task,setTask]=useState("");
  const handleAddTask=()=>{
    Keyboard.dismiss();
    var data={
      "task":task,
    }
    axios({
      url:"https://web-production-58d3.up.railway.app",
      method:"POST",
      data:data,
      headers:{
        "Content-Type":"application/json"
      }
    }).then((res)=>{
      getList();
      setTask("");
      Keyboard.dismiss();
      // var response=res.data;
      // setTaskItems(response.message)
      // // console.log(response.message);
      // console.log(taskItems);
    })
  }
  const [taskItems,setTaskItems]=useState([
    // {id:1,task:"I am Noob"},
  ]);
  useEffect(() => {
    // async function getData(){
    //   try{
    //     const data=await axios.get('http://192.168.29.7:8000/')
    //     console.log(data.data)
    //     setTaskItems(data.data)
    //   }
    //   catch(error){
    //     console.log(error)
    //   }
    // }
    // getData()},[])
    // fetch('http://192.168.29.7:8000/',{
    //   method:"GET"
    // })

    // .then(resp=>resp.json())
    // .then(data=>{
    //   setTaskItems(data)
    //   console.log(data);
    // })
    // .catch(error=>Alert.error("Error",error))
    getList()
  },[])
  const getList=()=>{
    axios({
      url:"https://web-production-58d3.up.railway.app",
      method:"GET"
    }).then((res)=>{
      var response=res.data;
      setTaskItems(response.message)
      // console.log(response.message);
      console.log(taskItems);
    })
  }

  const completeTask=(value)=>{
    console.log(value)
    var data={
      "id":value,
    }
    console.log(data)
    axios({
      url:"https://web-production-58d3.up.railway.app",
      method:"DELETE",
      data:data,
      headers:{
        "Content-Type":"application/json"
      }
    }).then((res)=>{
      getList();
    })
    // let itemsCopy=[...taskItems];
    // itemsCopy.splice(index,1);
    // setTaskItems(itemsCopy);
  }
  
  const onChangeTask=(value)=>{
    setTask(value)
  }

  return (
    <View style={styles.container}>
      {/* <Text>Hello World!</Text>
      <StatusBar style="auto" /> */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          {
            taskItems.map((item)=>{
              return (
              <TouchableOpacity key={item.id} onPress={()=>completeTask(item.id)}>
                <Task key={item.id} text={item.task}/>
              </TouchableOpacity> )
            })
          }
          {/* <Task text={'Task 1'}/>
          <Task text={'Task 2'}/> */}

        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS==="ios"?"padding":"height"} style={styles.writeTaskWrapper}>
       <TextInput style={styles.input} placeholder={'Write a Task'} value={task} onChangeText={onChangeTask}/> 
       <TouchableOpacity onPress={() => handleAddTask()}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
       </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    
  },
  tasksWrapper:{
    paddingTop:80,
    paddingHorizontal:20,
  },
  sectionTitle:{
    fontSize:24,
    fontWeight:'bold',
  },
  items:{
    marginTop:30,
  },
  writeTaskWrapper:{
    position:'absolute',
    bottom:60,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  input:{
    paddingVertical:15,
    paddingHorizontal:15,
    width:250,
    backgroundColor:'#FFF',
    width:250,
    borderRadius:60,
    borderColor:'#C0C0C0',
    borderWidth:1,



  },
  addWrapper:{
    width:60,
    height:60,
    backgroundColor:'#FFF',
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#C0C0C0',
    borderWidth:1,
  },
  addText:{},
});
