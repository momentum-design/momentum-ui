
            import React from 'react';

            export default class CoreExample extends React.Component {

              render() {

              /* eslint-disable */
              // Disabled to ignore Dangerously Setting Inner HTML

                return <div dangerouslySetInnerHTML={{__html: ` <div class="messagebox-backdrop login-box">
   <div class="message-box">
     <div class="message-box__content">
       <img class="message-box__logo" src="">
       <h2 class="message-box__title ">Cisco Webex</h2>
       <h4 class="message-box__login-title">Enter your email address</h4>
       <div class="validation-messages error">
       </div>
       <form name="loginForm" novalidate>
         <div class="row">
           <div class="cui-input-group small-10 small-offset-1 columns">
             <input
              class="cui-input"
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              required >
             <div class="cui-input__messages" role="alert">
               <div class="message">This field is required</div>
             </div>
           </div>
         </div>
       </form>
       <button cui-btn class="cui-button cui-button--blue cui-button-52 message-box__btn" ng-click="login.loginDelay(2000)" loading="login.loading">
           <span>Sign In</span>
       </button>
       <a href="javascript:void(0)" class="body-small password-link">Can’t access your account?</a>
     </div>
   </div>
   <div class="messagebox-backdrop__footer">
     <i class="icon icon-cisco-logo"></i>
     <div class="body-smallest">
       <a href="javascript:void(0)">Terms of Service</a> | Privacy Statement © 2016 Cisco and/or affiliates. All rights reserved.
     </div>
   </div>
 </div>`}} />

              /* eslint-enable */
              }
            }
          