import 'raf/polyfill';
import 'es6-shim';
import 'es6-promise';
// import 'reset-css/reset.css';
import "@babel/polyfill";
import * as React from 'react';
import CompleteContainer from '../../src/containers/desktop/Complete';
import HTML5Backend from "react-dnd-html5-backend";
import {DragDropContextProvider} from "react-dnd";
import {getCompleteInfo} from "../../src/api/complete/getCompleteInfo";
import ContractContainer from '../../src/containers/desktop/Contract';
import Head from 'next/head';
import {getParameterByName} from '../../src/util/getParameterByName';

class Complete extends React.Component<any, React.ComponentState> {

  // static async getInitialProps({ query }) {
  //   const { docNo, signerNo } = query;

  //   return {signerNo, documentNo: docNo}
  // }

  constructor(props) {
    super(props);

    this.state = {
      signer: {},
      inputs: [],
      documentUrl: ''
    }
  }

  componentDidMount() {

    // const signerNo = getParameterByName('signerNo', null);
    // const documentNo = getParameterByName('docNo', null);

    const signerNo = window.signerNo;
    const documentNo = window.docNo;

    // const { signerNo, documentNo } = this.props;

    getCompleteInfo(documentNo, signerNo)
      .then((data: any) => {
        // console.log(data.inputs);
        this.setState({
          signer: data.signer,
          inputs: data.inputs,
          documentUrl: data.filePath,
          documentNo,
          signerNo
        });
      });
  }

  render() {
    // const { documentNo } = this.props;
    const { documentNo } = this.state;
    const { signer, inputs, documentUrl } = this.state;
    

    if(inputs != undefined){
      if(inputs.length < 1) return null;
    }

    return(
      <div>
        <Head>
          <title>kt</title>
          {/* <link href="/static/assets/css/style.css" rel="stylesheet" /> */}
          <link href="/static/assets/css/viewer.css" rel="stylesheet" />
        </Head>
        <DragDropContextProvider backend={HTML5Backend}>
          <ContractContainer
            signer={signer}
            inputs={inputs}
            documentUrl={documentUrl}
            documentNo={documentNo}
            completePage={true}
          />
        </DragDropContextProvider>
      </div>
    );
  }
}

export default Complete;