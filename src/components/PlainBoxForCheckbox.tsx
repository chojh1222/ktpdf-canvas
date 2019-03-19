import * as React from "react";
import {IoMdCheckmark} from 'react-icons/io';
import { IconContext } from "react-icons";

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

class PlainBoxForCheckbox extends React.Component<IBoxForCheckboxProps, React.ComponentState> {

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
      backgroundColor: backgroundColor ? backgroundColor : '#fff',
      opacity: 0.7,
      border: 'dotted 2px black',
    }

    return (
      <div
        style={editable ? editableStyle : nonEditableStyle}
        onClick={editable ? this.toggleCheckbox : this.doNothing}
      >
        {this.props.addText && 
        <IconContext.Provider value={checkicon}>
          <IoMdCheckmark />
        </IconContext.Provider>
        }
      </div>
    );
  }
}

export default PlainBoxForCheckbox;