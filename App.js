import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react"; 
import { StyleSheet, Text, View, Pressable,  TextInput,SafeAreaView } from 'react-native';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  }
});

export default function App() {
  const [timerTitle, setTimerTitle] = useState("")
  const [timerOn, setTimerOn] = useState(false)
  const [hours, setHours] =  useState(0)
  const [minutes, setMinutes] =  useState(0)
  const [seconds, setSeconds] =  useState(0)

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Timer is Finished',
        body: timerTitle,
      },
      trigger: null,
    });
  }

  const zeroingClock = () => {
    setHours(0); 
    setMinutes(0); 
    setSeconds(0);
  }
  const resetButtonLogic = () => {
    setTimerOn(false);
    zeroingClock();
  }
  const countDownLogic = () => {
    if(timerOn == true) {
      setSeconds(seconds-1); 
      if(minutes == 0 && seconds == 0){
        setMinutes(59);
        setSeconds(59);
        setHours(hours-1);
      }
      else if(seconds == 0){
        setSeconds(59);
        setMinutes(minutes-1);
      }
      if(hours <= 0 && minutes <= 0 && seconds <= 0){
        setTimerOn(false);
        zeroingClock();
        scheduleNotificationHandler();
      }
  }}
  useEffect(()=> {
    const timer = setTimeout(() => {countDownLogic()}, 1000);
    return () => clearTimeout(timer);
    })
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleInputTextContainer}>
        <TextInput
          style= {styles.titleInputText}
          placeholder= "Notifcation message goes here!"
          onChangeText={setTimerTitle}
          value={timerTitle}
        />
      </View>
      <View style={styles.clockContainer}>
        <View style= {styles.singleTimeBox}>
          <TextInput 
            style={styles.timerBox} 
            placeholder={String(hours)}
            onChangeText={setHours}
            value={String(hours)}
            keyboardType='number-pad'
          />
          <Text>Hours</Text>
        </View>
        <View style= {styles.singleTimeBox}>
          <TextInput 
            style={styles.timerBox}
            placeholder={String(minutes)}
            onChangeText={setMinutes}
            value={String(minutes)}
            keyboardType='number-pad'
          />
          <Text>Minutes</Text>
        </View>
        <View style= {styles.singleTimeBox}>
          <TextInput 
            style={styles.timerBox}
            placeholder={String(seconds)}
            onChangeText={setSeconds}
            value={String(seconds)}
            keyboardType='number-pad'
          />
          <Text>Seconds</Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
          {timerOn ? (
            <Pressable 
            style={styles.stopButton}
            onPress={()=>{setTimerOn(!timerOn);}}
            >
              <Text>Stop</Text>
            </Pressable>
          ) : (
            <Pressable 
            style={styles.startButton}
            onPress={()=>{setTimerOn(!timerOn);}}
            >
              <Text>Start</Text>
            </Pressable>
          )}
        <Pressable 
          style={styles.resetButton} 
          onPress={()=>{resetButtonLogic()}}
        >
          <Text>Reset</Text>         
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockContainer: {
    flex: 2,
    width:'70%',
    alignItems: 'center',
    justifyContent: 'space-around',
    //backgroundColor: 'blue',
    flexDirection: 'row',
    
  },
  timerBox: {
    width: '66%',
    height: '20%',
    borderColor:'black',
    borderWidth:1,
    textAlign: 'center',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    //backgroundColor: 'red',
    width: '100%',
  },
  singleTimeBox: {
    flex: 1,
    height: '100%',
    width: '33.3%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
  },
  titleInputTextContainer: {
    flex: 1,
    width: '100%',
    //backgroundColor: "yellow",
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleInputText: {
    height: '22%',
    width: '75%',
    borderColor: 'black',
    borderWidth:1,
    textAlign: 'left',
    padding: 5,
  },
  resetButton: {
    backgroundColor:'#0096FF',
    padding: 10,
  },
  startButton:{
    backgroundColor:'#50C878',
    padding: 10,
  },
  stopButton:{
    backgroundColor:'#FF3131',
    padding: 10,
  },
});
