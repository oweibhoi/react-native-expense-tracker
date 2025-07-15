import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../constant/style";
import RegisterForm from "../components/Authentication/RegisterForm";
import { createUser } from "../util/auth";
import { useContext, useState } from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { AuthContext } from "../store/auth-context";

function Signup({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);

  function loginHandler() {
    navigation.replace("LoginScreen");
  }

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const user = await createUser(email, password);
      authCtx.authenticate(user.token);
    } catch (error) {
      setError("Could not register user! Please try again later.");
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
      <RegisterForm onLogin={loginHandler} onSubmit={signupHandler} />
    </View>
  );
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
