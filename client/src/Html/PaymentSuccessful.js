import React, { useLayoutEffect } from 'react'
import Navbar from './Navbar/Navbar';

export default function PaymentSuccessful() {

    useLayoutEffect(() => {
        import("../CSS/PaymentSuccessful.css");
    }, []);

  return (
      <div>
        <Navbar />
        {/* Content Start */}
        <table cellPadding={0} cellSpacing={0} cols={1} bgcolor="#d7d7d7" align="center" style={{maxWidth: '600px'}}>
          <tbody><tr bgcolor="#d7d7d7">
              <td height={50} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} />
            </tr>
            {/* This encapsulation is required to ensure correct rendering on Windows 10 Mail app. */}
            <tr bgcolor="#d7d7d7">
              <td style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}}>
                {/* Seperator Start */}
                <table cellPadding={0} cellSpacing={0} cols={1} bgcolor="#d7d7d7" align="center" style={{maxWidth: '600px', width: '100%'}}>
                  <tbody><tr bgcolor="#d7d7d7">
                      <td height={30} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} />
                    </tr>
                  </tbody></table>
                {/* Seperator End */}
                {/* Generic Pod Left Aligned with Price breakdown Start */}
                <table align="center" cellPadding={0} cellSpacing={0} cols={3} bgcolor="white" className="bordered-left-right" style={{borderLeft: '10px solid #d7d7d7', borderRight: '10px solid #d7d7d7', maxWidth: '600px', width: '100%'}}>
                  <tbody><tr height={50}><td colSpan={3} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} /></tr>
                    <tr align="center">
                      <td width={36} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} />
                      <td className="text-primary" style={{color: '#F16522', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}}>
                        <img src="http://dgtlmrktng.s3.amazonaws.com/go/emails/generic-email-template/tick.png" alt="GO" width={50} style={{border: 0, fontSize: 0, margin: 0, maxWidth: '100%', padding: 0}} />
                      </td>
                      <td width={36} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} />
                    </tr>
                    <tr height={17}><td colSpan={3} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} /></tr>
                    <tr align="center">
                      <td width={36} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} />
                      <td className="text-primary" style={{color: '#F16522', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}}>
                        <h1 style={{color: '#F16522', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '30px', fontWeight: 700, lineHeight: '34px', marginBottom: 0, marginTop: 0}}>Payment received</h1>
                      </td>
                      <td width={36} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} />
                    </tr>
                    <tr height={30}><td colSpan={3} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} /></tr>
                    <tr align="left">
                      <td width={36} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} />
                      <td style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}}>
                        <p style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '22px', margin: 0}}>
                          Hi [name], 
                        </p>
                      </td>
                      <td width={36} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} />
                    </tr>
                    <tr height={10}><td colSpan={3} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} /></tr>
                    <tr align="left">
                      <td width={36} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} />
                      <td style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}}>
                        <p style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '22px', margin: 0}}>Your transaction was successful!</p>
                        <br />
                        <p style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '22px', margin: 0}}><strong>Payment Details:</strong><br />
                          Amount: €$moneyFormatter.format(${'{'}amount{'}'}) <br />
                          Account: ${'{'}accountNumber{'}'}.<br /></p>
                        <br />
                        <p style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '22px', margin: 0}}>We advise to keep this email for future reference.&nbsp;&nbsp;&nbsp;&nbsp;<br /></p>
                      </td>
                      <td width={36} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} />
                    </tr>
                    <tr height={30}>
                      <td style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} />
                      <td style={{borderBottom: '1px solid #D3D1D1', color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} />
                      <td style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} />
                    </tr>
                    <tr height={30}><td colSpan={3} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} /></tr>
                    <tr align="center">
                      <td width={36} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} />
                      <td style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}}>
                        <p style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '22px', margin: 0}}><strong>Transaction reference: ${'{'}authorizationCode{'}'}</strong></p>
                        <p style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '22px', margin: 0}}>Order date: [time] [date]</p>
                        <p style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '22px', margin: 0}} />
                      </td>
                      <td width={36} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} />
                    </tr>
                    <tr height={50}>
                      <td colSpan={3} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} />
                    </tr>
                  </tbody></table>
                {/* Generic Pod Left Aligned with Price breakdown End */}
                {/* Seperator Start */}
                <table cellPadding={0} cellSpacing={0} cols={1} bgcolor="#d7d7d7" align="center" style={{maxWidth: '600px', width: '100%'}}>
                  <tbody><tr bgcolor="#d7d7d7">
                      <td height={50} style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', lineHeight: '16px', verticalAlign: 'top'}} />
                    </tr>
                  </tbody></table>
                {/* Seperator End */}
              </td>
            </tr>
          </tbody></table>
        {/* Content End */}
      </div>
  )
}
