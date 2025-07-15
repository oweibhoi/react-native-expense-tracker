import { StyleSheet, Text, View } from "react-native";
import Input from "../ManageExpense/Input";
import Button from "../../components/UI/Button";

import { useState } from "react";
import { GlobalStyles } from "../../constant/style";

function LoginForm({ onRegister, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    email: {
      value: defaultValues ? defaultValues.email : "",
      isValid: true,
    },
    password: {
      value: defaultValues ? defaultValues.password : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const loginData = {
      email: inputs.email.value,
      password: inputs.password.value,
    };

    const emailIsValid =
      loginData.email.trim().length > 0 && loginData.email.includes("@");
    const passwordIsValid = loginData.password.trim().length > 0;

    if (!emailIsValid || !passwordIsValid) {
      //   Alert.alert("Invalid input", "Please check your input!");

      setInputs((cuurentInput) => {
        return {
          email: { value: cuurentInput.email.value, isValid: emailIsValid },
          password: {
            value: cuurentInput.password.value,
            isValid: passwordIsValid,
          },
        };
      });
      return;
    }

    onSubmit(loginData);
  }

  const formIsInvalid = !inputs.email.isValid || !inputs.password.isValid;

  return (
    <View>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputsRow}>
          <Input
            label={"Email Address"}
            invalid={!inputs.email.isValid}
            textInputConfig={{
              keyboardType: "email-address",
              placeholder: "Email Address",
              onChangeText: inputChangedHandler.bind(this, "email"),
              value: inputs.email.value,
            }}
          />
          <Input
            label={"Password"}
            invalid={!inputs.password.isValid}
            textInputConfig={{
              secureTextEntry: true,
              placeholder: "Password",
              onChangeText: inputChangedHandler.bind(this, "password"),
              value: inputs.password.value,
            }}
          />
        </View>
      </View>
      {formIsInvalid && <Text style={styles.errorText}>Invalid Fields!</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode={"flat"} onPress={onRegister}>
          Register
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          Login
        </Button>
      </View>
    </View>
  );
}

export default LoginForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 180,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  inputsRow: {
    marginVertical: 24,
    marginHorizontal: 24,
    paddingHorizontal: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
