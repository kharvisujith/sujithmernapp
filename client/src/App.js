import react, {createContext, useReducer} from 'react'
import {Switch, Route , Redirect} from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Contact from "./components/Contact"
import Error404 from "./components/Error404"
import Logout from "./components/Logout"
import { reducer } from './reducer/Userreducer'


export const usercontext = createContext()

const App = ()=>{

    const initialState = false
    const [state, dispatch] = useReducer(reducer, initialState,)




    return (
        <>
        <usercontext.Provider value={{state, dispatch}}>
        <Navbar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/logout" component= {Logout} />
            <Route component={Error404} />
        </Switch>
        </usercontext.Provider>
        </>
    )
}

export default App