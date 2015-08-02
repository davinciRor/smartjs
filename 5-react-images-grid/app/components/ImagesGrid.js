import React from 'react';
import Images from './Images';
import * as AppActions from '../actions/AppActions';

export default class ImagesGrid {

  shouldComponentUpdate(nextProps) {
    return nextProps.cells !== this.props.cells || nextProps.rows !== this.props.rows;
  }

  renderRows() {
    let result = [];
    for(let i = 0; i < this.props.rows; i++) {
      result.push(<tr key={i}>{this.renderCells()}</tr>)
    }
    return result;
  }

  renderCells() {
    let result = [];
    for(let i = 0; i < this.props.cells; i++) {
      result.push(<td key={i}><Images imageSrc={this.randomImage()}/></td>)
    }
    return result;
  }

  randomImage() {
    let { images } = this.props;
    let rand = Math.floor(Math.random() * (images.length-1 + 1));
    return images[rand];
  }

  render() {
    return (
      <div className='table-responsive'>
        <table className='table'>
          {this.renderRows()}
        </table>
      </div>
    );
  }

}
