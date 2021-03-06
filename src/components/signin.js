import React from 'react';
import {Button} from 'semantic-ui-react';
import classNames from 'classnames';
import { loginuser,sendTracyOTP ,verifyTheOTP} from '../common/apicall';
export default class Register extends React.Component {
    state = {
        mobNo: '',
        userName: '',
        passPhrase: '',
        errorInCreation: false,
        validationInProgress: false,
        requestForEnteringOTP : false,
        verificationFailed : false
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        if(await verifyTheOTP(this.state.mobNo,this.state.passPhrase)) {
            let data = {
                mobile: this.state.mobNo
            }
            this.setState({validationInProgress : true})
            if(await loginuser(data)) {
                this.setState({validationInProgress : false})
                window.location = '/#/home';
            }else {
                this.setState({validationInProgress : false,validationFailed : true});
                setTimeout(()=>this.setState({validationFailed : false}),3000)
            }
        }else {
            this.setState({verificationFailed : true});
            setTimeout(()=> {
                this.setState({verificationFailed : false});
            },2000);
        }
        
    }
    render() {
        return (
            <div className="ui divided selection list">
                <div id="listitem-c19">
                    <div id="inputLabel2" className="ui horizontal label">
                        Mobile Number
                    </div><br />
                    <div className="ui transparent input" style={{ borderBottom: '1px solid #585858', paddingBottom: '5px', marginTop: '5px', marginLeft: '62px ' }}>
                        <input id="l_userName"
                            value={this.state.mobNo}
                            onChange={e => this.setState({ mobNo: e.target.value })}
                            type="phone" placeholder="Enter your mobile number"
                            style={{ fontSize: '13px', width: '300px', color: '#fff' }} />
                    </div>
                </div>
                {this.state.requestForEnteringOTP  ? 
                    <React.Fragment><div id="listitem-c19">
                        <div id="inputLabel2" className="ui horizontal label">
                            OTP
                        </div><br />
                        <div className="ui transparent input" style={{ borderBottom: '1px solid #585858', paddingBottom: '5px', marginTop: '5px', marginLeft: '62px ' }}>
                            <input id="l_userEnteredSecret"
                                value={this.state.passPhrase}
                                onChange={e => this.setState({ passPhrase: e.target.value })}
                                type="text" placeholder="Enter the one time password"
                                style={{ fontSize: '13px', width: '300px', color: '#fff' }} />
                        </div>
                        <br />
                        {/* <span style={{fontSize:'14px',color:'#fff',marginTop:'10px'}}> (01:00) </span> */}
                    </div>
                    <div id={this.state.verificationFailed ? "invalid_pswd" : "dontShow"}>Authentication Failed! Please try again</div>
                    <div id={this.state.errorInCreation ? "invalid_pswd" : "dontShow"}>Something went wrong! Try after sometime</div>
                    <center>
                        <div className={classNames(
                            {
                                "button_with_pointer_events_enable": true,
                                "disable_button": this.state.passPhrase.length !== 0 && this.state.mobNo.length !== 0 ? false : true
                            }
                        )} style={{ display: 'inline-block' }}
                            onClick={(e)=>this.handleSubmit(e)}
                        >
                            Login
                            <span style={{ marginLeft: '5px' }}>
                                {this.state.validationInProgress ? <i aria-hidden="true" id="contract_comm_id" className="circle notch loading icon"></i> :
                                    <i aria-hidden="true" id="unlock_comm_id" className="arrow alternate circle right outline icon"></i>}
                            </span>
                        </div>
                    </center> 
                </React.Fragment> : <center><Button style={{padding:'10px'}} onClick={async ()=> {
                    await sendTracyOTP(this.state.mobNo);
                    this.setState({requestForEnteringOTP : true})
                }} primary>Send OTP</Button>  

                </center>}
            </div>

        )
    }
}
