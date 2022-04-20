import react,{useRef,useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;


const Checkout = (props) => {
    const [formInputValidity,setFormInputValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true
    })
    
    const nameInput=useRef()
    const streetInput=useRef()
    const postalInput = useRef()
    const cityInput = useRef()

    const confirmHandler = (event) => {
    event.preventDefault();

    const eneteredName = nameInput.current.value;
    const eneteredStreet = streetInput.current.value;
    const enteredPostal = postalInput.current.value;
    const eneteredCity = cityInput.current.value;

    // console.log(eneteredName,eneteredCity,eneteredStreet,enteredPostal)

    const nameValid = !isEmpty(eneteredName);
    const streetValid = !isEmpty(eneteredStreet);
    const postalValid =  isFiveChars(enteredPostal) && !isEmpty(enteredPostal);
    const cityValid = !isEmpty(eneteredCity);

    // console.log(eneteredName,eneteredCity)

    // const nameValid = false
    // const streetValid = false
    // const postalValid = false
    // const cityValid = false

    setFormInputValidity({
        name: nameValid,
        street: streetValid,
        postal: postalValid,
        city: cityValid
    });

    const formValid = nameValid && streetValid && postalValid && cityValid;

    if(!formValid){
        return;
    }
    console.log('run 1')
    props.onConfirm({
        name: eneteredName,
        city: eneteredCity,
        street:eneteredStreet,
        postal:enteredPostal})
        console.log('run 2')

  };

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? '' : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputValidity.postal ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? '' : classes.invalid
  }`;



  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInput}  />
        {!formInputValidity.name && <p>Name input field is not valid</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInput} />
        {!formInputValidity.street && <p>Street input field is not valid</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInput} />
        {!formInputValidity.postal && <p>Postal input field is not valid</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInput} />
        {!formInputValidity.city && <p>City input field is not valid</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;