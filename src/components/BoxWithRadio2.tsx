import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import { RadioBox } from 'src/interface/InputBox';
import { ISigner } from 'src/interface/ISigner';
import RadioMarker from './RadioMarker';
import RadioMarker2 from './RadioMarker2';
import Popup from './Popup';
import PopupForRadio from './PopupForRadio';


interface Props {
  boxData: RadioBox;
  users: Array<ISigner>;
  updateInputBox: (boxIndex: number, update: object) => void;
  deleteInputBox: (index: number) => void;
  scale: number;
  addRadioButton: (nextTo: RadioBox) => void;
  deleteRadioGroup: (groupNum: number) => void;
}

class BoxWithRadio2 extends Component<Props, any> {

  constructor(props) {
    super(props);
    this.state = {
      isShowPopup: false,
    }
  }

  radioMarker = null;

  showPopup = () => {
    this.setState({
      isShowPopup: true,
    })
  }

  hidePopup = () => {
    this.setState({
      isShowPopup: false,
    })
  }

  togglePopup = () => {
    this.setState({
      isShowPopup: !this.state.isShowPopup
    })
  }

  render() {
    let {
      top,
      left,
      width,
      height,
      page,
      type,
      boxIndex,
      signerIndex,
      minHeight,
      minWidth,
      maxHeight,
      maxWidth,
      gbnCd,
    } = this.props.boxData;


    const {
      users,
      deleteInputBox,
      updateInputBox,
      scale,
    } = this.props;

    top *= scale;
    left *= scale;
    width *= scale;
    height *= scale;

    const { backgroundColor } = users[signerIndex];



    console.log(this.radioMarker && this.radioMarker.state.mode)

    return (
        <Rnd // 리사이즈 및 드래그 모듈
          size={{ width: width,  height: height }}
          position={{ x: left, y: top }}
          // 객체이동 드래그 멈춤시 위치 업데이트
          onDragStop={(e, d) => { updateInputBox(boxIndex, {left: d.x / scale, top: d.y / scale}) }}
          // onResizeStop={(e, direction, ref, delta, position) => {
          //     const w = (width + delta.width) / scale;
          //     const h = (height + delta.height) / scale;

          //     updateInputBox(boxIndex, {
          //       width: w,
          //       height: h,
          //         // ...position,
          //     });

          //     if(w > h) {
          //       this.setState({mode: 'horizontal'})
          //     } else {
          //       this.setState({mode: 'vertical'})
          //     }
          // }}

          // 크기조절 드래그시 크기 업데이트
          // onResize={(e, direction, ref, delta, position) => {
          //   let width = Number(ref.style.width.replace('px', '')) / scale;
          //   let height = Number(ref.style.height.replace('px', '')) / scale;
            
          //   updateInputBox(boxIndex, {
          //     width, 
          //     height
          //   });
          // }}
          onResizeStop={(e, direction, ref, delta, position) => {
            updateInputBox(boxIndex, {
              width: (width + delta.width) / scale,
              height: (height + delta.height) / scale,
                // ...position,
            });
          }}
          // 리사이징 허용여부 - 우측하단만 true로함
          enableResizing={{ top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:true, bottomLeft:false, topLeft:false }}
          enableUserSelectHack={true}
          bounds='parent' // 부모 요소 안에서만 이동 및 리사이징 가능
          lockAspectRatio={true}
          resizeHandleStyles={{ // 우측하단의 리사이즈 핸들 스타일
            bottomRight: {
                position: 'absolute',
                width: '10px',
                height: '10px',
                background: `${backgroundColor}`,
                borderRadius: '10px 0 0 0',
                right: 0,
                bottom: 0,
                cursor: 'se-resize',
            }
          }}
          // // 최소 가로길이
          // minWidth={this.radioMarker && this.radioMarker.state.mode === 'vertical' ? minWidth * scale : undefined}
          // // 최소 세로길이
          // minHeight={this.radioMarker && this.radioMarker.state.mode === 'horizontal' ? minWidth * scale : undefined}
          minWidth={minWidth * scale} // 최소 가로길이
          minHeight={minWidth * scale} // 최소 세로길이
        >

          <Popup
            isShowPopup={this.state.isShowPopup}
            customStyle={{top: '-90px', width: '130px'}}
          >
            <PopupForRadio
              updateInputBox={updateInputBox}
              boxIndex={boxIndex}
              boxData={this.props.boxData}
              addRadioButton={this.props.addRadioButton}
              deleteRadioGroup={this.props.deleteRadioGroup}
            />
          </Popup>

          <RadioMarker2
            boxData={this.props.boxData}
            users={this.props.users}
            updateInputBox={this.props.updateInputBox}
            deleteInputBox={this.props.deleteInputBox}
            className={`radioMarker-${boxIndex}`}
            ref={ref => this.radioMarker = ref}
            width={width}
            height={height}
            togglePopup={this.togglePopup}
          />
          <span
            style={{
              borderRadius: '50%',
              textAlign: 'center',
              width: `1.2em`,
              height: `1.2em`,
              
              position: 'absolute',
              left: 1,
              top: 1,
              border: 'solid 1px black',
              margin: 'auto',
              backgroundColor: 'white',
              fontSize: `0.85em`,
              boxSizing: 'border-box',
              opacity: 0.7,
            }}
          >{gbnCd}</span>
        </Rnd>
    );
  }
}

export default BoxWithRadio2;