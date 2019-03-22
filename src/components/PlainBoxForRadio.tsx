import * as React from "react";
import {IoMdCheckmark} from 'react-icons/io';
import { IconContext } from "react-icons";
import {IoMdRadioButtonOn, IoMdRadioButtonOff} from 'react-icons/io';

interface IBoxForCheckboxProps {
  backgroundColor: string;
  name: string;
  color: string;
  updateTextArea: (...args) => void;
  boxIndex: number;
  w: string;
  h: string;
  addText: string;
  editable: boolean 
}

class PlainBoxForRadio extends React.Component<IBoxForCheckboxProps, React.ComponentState> {

  constructor(props) {
    super(props);

    this.state = {
      checked: !!this.props,
    }
  }

  toggleCheckbox = (e) => {
    
    const {addText: checked, updateTextArea, boxIndex} = this.props;
    console.log('toggleCheckbox')
    console.log(checked, boxIndex)
    updateTextArea(boxIndex, !checked);
  }

  checkFirstRadioButton = e => {
    console.log('checkFirstRadioButton')
    const {updateTextArea, boxIndex} = this.props;
    updateTextArea(boxIndex, '1');
  }

  checkSecondRadioButton = e => {
    console.log('checkSecondRadioButton')
    const {updateTextArea, boxIndex} = this.props;
    updateTextArea(boxIndex, '2');
  }

  doNothing = () => {

  }

  render() {
    const {
      backgroundColor,
      name,
      color,
      w,
      h,
      signUrl,
      editable
    } = this.props;

    const checkicon = {
      color: backgroundColor, 
      className: "global-class-name", 
      size: "100%",
      padding: 0,
      margin: 0,
      // width: '100%',
      // height: '100%',
      style: {
        // position: 'absolute',
      }
    }

    const nonEditableStyle = {
      position: 'relative',
      width: `${w}px`,
      height: `${h}px`,
      border: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.0)',
      color
    };

    const editableStyle = {
      ...nonEditableStyle,
      // border: '1px solid #000',
      // backgroundColor: backgroundColor ? backgroundColor : '#fff',
      opacity: 0.7,
      // border: 'dotted 2px black',
    }

    const radioicon = {
      color: backgroundColor, 
      className: "global-class-name", 
    //   size: "100%",
      padding: 0,
      margin: 0,
      style: {
        position: 'absolute',
        top: '0px',
        height: '100%',
        width: `${h}px`,
      }
    }

    const radioiconLeft = {
      ...radioicon,
      style: {
          ...radioicon.style,
          left: '0px',
      }
    }

    const radioiconRight = {
        ...radioicon,
        style: {
            ...radioicon.style,
            right: '0px',
        }
    }

    const {addText: radioSelection} = this.props;
    
    return (
      
      <div
        style={editable ? editableStyle : nonEditableStyle}
        // onClick={editable ? this.toggleCheckbox : this.doNothing}
      >
        {radioSelection == '1' 
        ? (
          <IconContext.Provider value={radioiconLeft}>
            <IoMdRadioButtonOn 
              onClick={this.checkFirstRadioButton}
            />
          </IconContext.Provider>
        )
        : (
          <IconContext.Provider value={radioiconLeft}>
            <IoMdRadioButtonOff 
              onClick={this.checkFirstRadioButton}
            />
          </IconContext.Provider>
        )}
        
        {radioSelection == '2' 
        ? (
          <IconContext.Provider value={radioiconRight}>
            <IoMdRadioButtonOn 
              onClick={this.checkSecondRadioButton}
            />
          </IconContext.Provider>         
        )
        : ( 
          <IconContext.Provider value={radioiconRight}>
            <IoMdRadioButtonOff 
              onClick={this.checkSecondRadioButton}
            />
          </IconContext.Provider>         
        )}
        
      </div>
    );
  }
}

export default PlainBoxForRadio;
