import React from 'react';
import CarouselGallery from './CarouselGallery';
import * as AppActions from '../actions/AppActions';

export default class Carousel {

  onClickPrev(e) {
    let newPosition = Math.min(this._position + this._width * this._count, 0);
    
    AppActions.carouselPrev(newPosition);
    e.preventDefault();
  }

  onClickNext(e) {
    let newPosition = Math.max(
      this._position - this._width * this._count,
      -this._width * (this._images.length - this._count));

    AppActions.carouselNext(newPosition);
    e.preventDefault();
  }

  render() {
    this._position = this.props.position;
    this._count = this.props.count;
    this._width = this.props.width;
    this._images = this.props.carouselImages;

    return (
      <div className='carousel'>
        <div className='gallery'>
          <ul className='images' style={{marginLeft: this._position + 'px'}}>

            {this._images.map((image, i) => {
              return <CarouselGallery key={i} image={image}/>
            })}

          </ul>
        </div>

        {this._images.length > 3 &&
          <div>
            <button className='arrow prev glyphicon glyphicon-chevron-left'
                    onClick={this.onClickPrev.bind(this)}></button>
            <button className='arrow next glyphicon glyphicon-chevron-right'
                    onClick={this.onClickNext.bind(this)}></button>
          </div>        
        }
      </div>
    );
  }

}
