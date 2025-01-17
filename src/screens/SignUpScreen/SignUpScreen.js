import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
//import {Auth} from 'aws-amplify'
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const [checkboxState, setCheckboxState] = useState(false); //CheckBox
  const pwd = watch('password');
  const navigation = useNavigation();

  const onRegisterPressed = async data => {
    navigation.navigate('Home');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
      <Text style={styles.title}>
          註冊
        </Text>

        <CustomInput
          name="Name"
          control={control}
          placeholder="帳號"
          rules={{
            required: '請輸入帳號',
            minLength: {
              value: 3,
              message: '帳號長度應大於3',
            },
            maxLength: {
              value: 24,
              message: '帳號長度應小於24',
            },
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="電子信箱"
          rules={{
            required: '請輸入電子信箱',
            pattern: {value: EMAIL_REGEX, message: '電子信箱無效'},
          }}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="密碼"
          secureTextEntry
          rules={{
            required: '請輸入密碼',
            minLength: {
              value: 8,
              message: '密碼長度應大於8',
            },
          }}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="請重複確認密碼"
          secureTextEntry
          rules={{
            validate: value => value === pwd || '請輸入相同的密碼',
          }}
        />
        <View style={styles.section}>
          <BouncyCheckbox
            innerIconStyle={{borderRadius:7, marginRight:0, borderWidth: 1, borderColor: '#e8e8e8', backgroundColor:'f6f6f6'}}
            fillColor="#e8e8e8"
            text='我想接收到有關此應用程式的最新消息'
            textStyle={{textDecorationLine: "none"}}
            style={{ marginTop: 16, marginLeft: '0%', marginRight: '15.5%'}}
            isChecked = {checkboxState}
            onPress={() => setCheckboxState(!checkboxState)}
          />
        </View>
        <CustomButton
          text="註冊"
          onPress={handleSubmit(onRegisterPressed)}
          type="SIGNUP"
        />
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    paddingTop: '11%',
    color:'#EB7943',
    fontWeight: 900,
    borderColor: '#FFC700',
    borderBottomWidth: 5.3,
    paddingHorizontal:6,
    marginBottom: '3.5%',
  },
  text: {
    color: 'gray',
    marginVertical: '3%',
    alignSelf: 'baseline',
    marginTop: '2.5%',
    marginRight: '27%',
  },
  link: {
    color: '#FDB075',
  },
});

export default SignUpScreen;
