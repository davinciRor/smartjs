import React from 'react';
import * as AppActions from '../actions/AppActions';

export default class Images {

  handleOnClick() {
    AppActions.addImageInCarousel(this.props.imageSrc);
  }

  render() {
    return <img src={this.props.imageSrc}
                className='img-thumbnail'
                onClick={this.handleOnClick.bind(this)}/>
  }
}
