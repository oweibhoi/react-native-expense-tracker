import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      fallbackText={"No Expenses"}
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
    />
  );
}

export default AllExpenses;
