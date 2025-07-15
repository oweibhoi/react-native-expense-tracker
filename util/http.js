import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_URL =
  "https://react-native-course-56aa7-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const authToken = await AsyncStorage.getItem("authToken");
  const response = await axios.post(
    BACKEND_URL + "/expenses.json?auth=" + authToken,
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const authToken = await AsyncStorage.getItem("authToken");

  const response = await axios.get(
    BACKEND_URL + "/expenses.json?auth=" + authToken
  );

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export async function updateExpense(id, expenseData) {
  const authToken = await AsyncStorage.getItem("authToken");
  return axios.put(
    BACKEND_URL + `/expenses/${id}.json?auth=` + authToken,
    expenseData
  );
}

export async function deleteExpense(id) {
  const authToken = await AsyncStorage.getItem("authToken");
  return axios.delete(BACKEND_URL + `/expenses/${id}.json?auth=` + authToken);
}

