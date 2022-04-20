import React, {Fragment} from 'react'
import classes from './Header.module.css'
import image from '../../assests/1.jpg'
import HeaderCartButton from './HeaderCartButton'

function Header(props) {
  return (
    <Fragment>
        <header className={classes.header}>
            <h1>React Meal Site</h1>
            <HeaderCartButton onShowCart={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={image} alt="Logo" />
        </div>
    </Fragment>
  )
}

export default Header