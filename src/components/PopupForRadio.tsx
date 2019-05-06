import * as React from "react";
import { RadioBox } from "src/interface/InputBox";

interface IPopup {
  updateInputBox: (boxIndex: number, update: object) => void;
  boxIndex: number;
  boxData: RadioBox;
  addRadioButton: (nextTo: RadioBox) => void;
  deleteRadioGroup: (groupNum: number) => void;
}

class PopupForRadio extends React.Component<IPopup, React.ComponentState> {

  constructor(props) {
    super(props);
  }

  foo = () => {};

  handleAddRadioButton = () => {
    const {boxData, addRadioButton} = this.props;
    addRadioButton(boxData);
  }
  handleDeleteRadioGroup = () => {
    const {boxData, deleteRadioGroup} = this.props;
    deleteRadioGroup(boxData.gbnCd);
  }
  // handleFontChange = (e) => {
  //   const {name, value} = e.target;
  //   const { updateInputBox, boxIndex } = this.props;
  //   // 생성자 화면 및 서명자 화면에서 모두 호출되어야하는데 각 화면에서 글자체 변수명이 fontFamily 와 font 로 달라서 둘다 업데이트함
  //   updateInputBox(boxIndex, {fontFamily: value, font: value} );
  // }

  // handleFontSizeChange = (e) => {
  //   const {name, value} = e.target;
  //   const { updateInputBox, boxIndex } = this.props;
  //   // 생성자 화면 및 서명자 화면에서 모두 호출되어야하는데 각 화면에서 글자크기 변수명이 fontSize 와 charSize 로 달라서 둘다 업데이트함
  //   updateInputBox(boxIndex, {fontSize: Number(value), charSize: Number(value)} );
  // }

  render() {

    return (
      <React.Fragment>
        <div style={{
          padding: '10px',
        }}>
          <button onClick={this.handleAddRadioButton}>선택항목추가</button>
          <button onClick={this.handleDeleteRadioGroup}>전체삭제</button>
        </div>
      </React.Fragment>
    );
  }
}

export default PopupForRadio;