import React,{useRef,useState} from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

function MealItemForm(props) {
  const[amtIsValid,setAmtValid]=useState(true)
  const AmtInputRef = useRef();

  const onSubmitHandler = (e) =>{
    e.preventDefault();
    const enteredAmt = AmtInputRef.current.value;
    const EnteredAmt = +enteredAmt

    if(enteredAmt.trim().length === 0 || EnteredAmt < 1 || EnteredAmt > 5){
      setAmtValid(false);
      return;
    }
    
    props.onAddtoCartHandler(EnteredAmt);
  }
  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={AmtInputRef}
        label="Amount"
        input={{
          id: "amount"+props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "P1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amtIsValid && <p>Entered item quantity should be between 1 and 5</p>}
    </form>
  );
}

export default MealItemForm;
