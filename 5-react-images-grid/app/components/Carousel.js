import React from 'react';
import CarouselImages from './CarouselImages';
import * as AppActions from '../actions/AppActions';

export default class Carousel {

  _onClickPrev(e) {
    let newPosition = Math.min(this._position + this._width * this._count, 0);
    
    AppActions.carouselPrev(newPosition);
    e.preventDefault();
  }

  _onClickNext(e) {
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
              return <CarouselImages key={i} image={image}/>
            })}

          </ul>
        </div>

        {this._images.length > this._count &&
          <div>
            <button className='arrow prev glyphicon glyphicon-chevron-left'
                    onClick={this._onClickPrev.bind(this)}></button>
            <button className='arrow next glyphicon glyphicon-chevron-right'
                    onClick={this._onClickNext.bind(this)}></button>
          </div>        
        }
      </div>
    );
  }

}
