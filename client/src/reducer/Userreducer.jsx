

export const reducer = (state, action)=>{
    if(action.type=== "USER"){
        state = action.payload
        console.log("state in action is")
        console.log(state)
        return  state
    }

}