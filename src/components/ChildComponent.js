import React, {Component} from 'react'
import styled from 'styled-components'

export default class ChildComponent extends Component {

    static displayName = "Child";

    static defaultProps = {
        testArray : []
    }
  
    constructor(props) {
      super(props)
      this.timer = setInterval(
        ()=>{
          console.log("timer")
        },
        3000
      )
    }
  
    componentWillUnmount() {
      clearInterval(this.timer)
    }
  
    render() {
      return (
        <ChildContainer>
          <h3>Child</h3>
          <h4>this.props.random: {this.props.random}</h4>
        </ChildContainer>
      )
    }
}

const ChildContainer = styled.div`
    width: 50%;
    height: 200px;
    margin: auto;
    background-color: lightgreen;
    align-self: center;
`