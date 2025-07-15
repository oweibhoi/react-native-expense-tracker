import { StyleSheet, Text, View } from "react-native";
import Input from "../ManageExpense/Input";
import Button from "../UI/Button";

import { useState } from "react";
import { GlobalStyles } from "../../constant/style";

function RegisterForm({ onLogin, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    email: {
      value: defaultValues ? defaultValues.email : "",
      isValid: true,
    },
    password: {
      value: defaultValues ? defaultValues.password : "",
      isValid: true,
    },
    confirmEmail: {
      value: defaultValues ? defaultValues.confirmEmail : "",
      isValid: true,
    },
    confirmPassword: {
      value: defaultValues ? defaultValues.confirmPassword : "",
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
    const registerData = {
      email: inputs.email.value,
      password: inputs.password.value,
      confirmEmail: inputs.confirmEmail.value,
      confirmPassword: inputs.confirmPassword.value,
    };

    const emailIsValid =
      registerData.email.trim().length > 0 && registerData.email.includes("@");
    const passwordIsValid = registerData.password.trim().length > 6;
    const confirmEmailIsValid =
      registerData.confirmEmail.trim().length > 0 &&
      registerData.confirmEmail.includes("@") &&
      registerData.confirmEmail === registerData.email;
    const confirmPasswordIsValid =
      registerData.confirmPassword.trim().length > 6 &&
      registerData.confirmPassword === registerData.password;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      !confirmEmailIsValid ||
      !confirmPasswordIsValid
    ) {
      //   Alert.alert("Invalid input", "Please check your input!");

      setInputs((cuurentInput) => {
        return {
          email: { value: cuurentInput.email.value, isValid: emailIsValid },
          password: {
            value: cuurentInput.password.value,
            isValid: passwordIsValid,
          },
          confirmEmail: {
            value: cuurentInput.confirmEmail.value,
            isValid: confirmEmailIsValid,
          },
          confirmPassword: {
            value: cuurentInput.confirmPassword.value,
            isValid: confirmPasswordIsValid,
          },
        };
      });
      return;
    }

    onSubmit({ email: registerData.email, password: registerData.password });
  }

  const formIsInvalid =
    !inputs.email.isValid ||
    !inputs.password.isValid ||
    !inputs.confirmEmail ||
    !inputs.confirmPassword;

  return (
    <View>
      <View style={styles.form}>
        <Text style={styles.title}>Register</Text>
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
            label={"Confirm Email Address"}
            invalid={!inputs.confirmEmail.isValid}
            textInputConfig={{
              keyboardType: "email-address",
              placeholder: "Confirm Email Address",
              onChangeText: inputChangedHandler.bind(this, "confirmEmail"),
              value: inputs.confirmEmail.value,
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
          <Input
            label={"Confirm Password"}
            invalid={!inputs.confirmPassword.isValid}
            textInputConfig={{
              secureTextEntry: true,
              placeholder: "Confirm Password",
              onChangeText: inputChangedHandler.bind(this, "confirmPassword"),
              value: inputs.confirmPassword.value,
            }}
          />
        </View>
      </View>
      {formIsInvalid && <Text style={styles.errorText}>Invalid Fields!</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode={"flat"} onPress={onLogin}>
          Login
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          Register
        </Button>
      </View>
    </View>
  );
}

export default RegisterForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 150,
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
