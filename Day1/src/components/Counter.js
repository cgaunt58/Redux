
import { connect } from 'react-redux'
import React, { useState } from 'react'

function Counter(props) {

    const [value, setValue] = useState('')

    const handleIncrement = () => {
      props.onIncrement()
    }
    const handleDecrement = ()=> {
      props.onDecrement()
    }

    
    const handleTextChange = (e) => {
        setValue(e.target.value)
    }

    const handleAdd = () => {
        props.onAdd(parseInt(value))
    }

    const handleSub = () => {
        props.onSubtract(parseInt(value))
    }

    return (
        <div>
            <h1>Increment Decrement Counter</h1>
            <button onClick = {handleIncrement}>Increment</button>
            <button onClick = {handleDecrement}>Decrement</button>
            <br></br>
            <br></br>
            <h1>Add Subtract Counter</h1>
            <input type = "text" onChange = {handleTextChange} />
            <button onClick = {handleAdd}>Add</button>
            <button onClick = {handleSub}>Subtract</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        ctr:state.counter
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onIncrement: () => dispatch({type: 'INCREMENT'}),
        onDecrement: () => dispatch({type: 'DECREMENT'}),
        onAdd: (value) => dispatch({type: 'ADD', payload: value}),
        onSubtract: (value) => dispatch({type: 'SUBTRACT', payload: value})
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)