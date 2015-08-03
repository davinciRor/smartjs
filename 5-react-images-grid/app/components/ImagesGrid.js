import React from 'react';
import Images from './Images';
import * as AppActions from '../actions/AppActions';

export default class ImagesGrid {

  shouldComponentUpdate(nextProps) {
    return nextProps.cells !== this.props.cells || 
           nextProps.rows !== this.props.rows;
  }

  _renderRows() {
    let result = [];
    for(let i = 0; i < this.props.rows; i++) {
      result.push(<tr key={i}>{this._renderCells()}</tr>)
    }
    return result;
  }

  _renderCells() {
    let result = [];
    for(let i = 0; i < this.props.cells; i++) {
      result.push(<td key={i}><Images imageSrc={this._randomImage()}/></td>)
    }
    return result;
  }

  _randomImage() {
    let { images } = this.props;
    let rand = Math.floor(Math.random() * (images.length-1 + 1));
    return images[rand];
  }

  render() {
    return (
      <div className='table-responsive'>
        <table className='table'>
          <tbody>
            {this._renderRows()}
          </tbody>
        </table>
      </div>
    );
  }

}
