import React from "react"
import "./loading.css"

class Loading extends React.Component {
    render() {
        return (<div class="loading">
            <img alt="Loading" src="/SuccessLoading.png"/>
        </div>)
    }
}

export default Loading