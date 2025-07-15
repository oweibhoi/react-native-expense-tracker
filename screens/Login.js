import { StyleSheet, Text, View } from "react-native";
import LoginForm from "../components/Authentication/LoginForm";
import { GlobalStyles } from "../constant/style";
import { useContext, useState } from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { login } from "../util/auth";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { AuthContext } from "../store/auth-context";

function Login({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);

  function signupHandler() {
    navigation.replace("SignupScreen");
  }

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const user = await login(email, password);
      authCtx.authenticate(user.token);
    } catch (error) {
      setError("Could not login user! Please try again later.");
      setIsAuthenticating(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isAuthenticating) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <LoginForm onRegister={signupHandler} onSubmit={loginHandler} />
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
