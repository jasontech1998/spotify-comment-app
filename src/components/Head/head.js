import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import { Helmet } from 'react-helmet';


const Head = (props) => {
  let head = <Helmet title={`PodSpot | ${props.title}`}/>
  if (!props.title) {
    head = <Helmet title="PodSpot"/>
  }
  return (
    <Auxiliary>
      {head}
    </Auxiliary>
  )
}

export default Head;