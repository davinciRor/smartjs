import React, { Component } from 'react';
import Menu from './components/Menu';
import ImagesGrid from './components/ImagesGrid';
import Carousel from './components/Carousel';
import AppStore from './stores/AppStore';
import * as AppActions from './actions/AppActions';

export default class App extends Component {
  constructor() {
    super();

    this.handleStoresChanged = this.handleStoresChanged.bind(this);
    this.state = AppStore.getState();
  }

  componentWillMount() {
    AppStore.addChangeListener(this.handleStoresChanged);
    AppActions.getImages();
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this.handleStoresChanged);
  }

  handleStoresChanged() {
    this.setState(AppStore.getState());
  }

  render() {
    let { rows, cells, images } = this.state;
    let { carouselImages, width, count, position } = this.state.carousel;

    return (
      <div>
        <div className='col-md-12'>
          {!!carouselImages.length &&
            <Carousel carouselImages={carouselImages}
                      width={width}
                      count={count}
                      position={position}/>
          }
        </div>
        <div className='main'>
          <div className='col-md-2'>
            <Menu/>
          </div>
          <div className='col-md-10'>
            <ImagesGrid cells={cells}
                rows={rows}
                images={images}/>
          </div>
        </div>
      </div>
    );
  }
}

React.render(<App/>, document.body);
