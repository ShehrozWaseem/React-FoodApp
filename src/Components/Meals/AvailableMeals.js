import React,{useEffect,useState} from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailMeal.module.css";
const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];



function AvailableMeals() {
  const [meals,setMeals]=useState([])
  const [isLoading,setisLoading]=useState(true)
  const [error, hasHttpError]=useState(null)

  useEffect(()=>{
    const fetchMeal = async () =>{
      const response = await fetch("https://react-d2186-default-rtdb.firebaseio.com/meals.json")

      if(!response.ok){
        throw new Error('Something went wrong')
      }

      const responseJson = await response.json()
      
      const loadedMeals = [];

      for (const key in responseJson){
        loadedMeals.push({
          id:key,
          name:responseJson[key].name,
          description:responseJson[key].desc,
          price:+responseJson[key].price
        })
      }
      setMeals(loadedMeals);
      setisLoading(false)
      
    };

    fetchMeal().catch((error)=>{
      setisLoading(false)
      hasHttpError(error.message)
    });

  },[])
  if(isLoading){
    return(
      <section className={classes.Loading}>
        <h3>Loading meals...</h3>
      </section>
    )
  }
  if(error){
    return(
      <section className={classes.mealss}>
        <h3>{error} !</h3>
      </section>
    )
  }
  return (
    
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
