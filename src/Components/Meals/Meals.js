import React , {Fragment} from 'react'
import AvailableMeals from './AvailableMeals'
import MealsSummary from './SummaryMeals'

function Meals() {
  return (
    <Fragment>
        <MealsSummary />
        <AvailableMeals />
    </Fragment>
  )
}

export default Meals