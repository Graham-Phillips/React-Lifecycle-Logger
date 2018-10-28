import ReactLogger from '../ReactLifeCycleLogger'
import ChildComponent from './ChildComponent'

import React, {Component} from 'react'
import styled from 'styled-components'

export default class ParentComponent extends Component {


    static displayName = "Parent"
  
    state = {
      random: Math.random(),
      showChild: true
    }
  
    newRandom = () => {
      this.setState({random: Math.random()})
    }
  
    toggleChild = () => {
      this.setState((prevState) => {
        return {
          showChild: !prevState.showChild
        }
      })
    }
  
    render() {
      let {showChild} = this.state
      return (
        <ParentContainer>
          <h2>Parent</h2>
          <button
            onClick={this.newRandom}
          >
            Pass New Props
          </button>
  
          <button
            onClick={this.toggleChild}
          >
             {(showChild) ? "Hide" : "Show"} child
          </button>
  
          <h3>this.state.random {this.state.random}</h3>
  
          {
            (showChild) ? (
              <WrappedChild
                random={this.state.random}
              />
            ):
            (
              null
            )
          }
  
  
        </ParentContainer>
      )
    }
  }

  
const ParentContainer = styled.div`
  width: 50%;
  height: 500px;
  margin: auto;
  background-color: salmon;
  display: flex;
  align-items: flex-start;
`


const WrappedChild = ReactLogger(ChildComponent)