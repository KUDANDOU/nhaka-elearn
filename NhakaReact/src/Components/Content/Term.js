import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';



const styles = ({
  root: {
     margin: 10
  },
});

const grant = 'In consideration of your payment, we hereby grant you a licence to use the purchased e-learning courses (“the Products”). This licence is limited, revocable, non-exclusive and non-transferable and is subject to the rights and obligations granted under these Terms. This licence is personal to you and cannot be shared or exchanged with others.';
const general = 'We develop, distribute and maintain the Products and will also provide you with log in details. We will also manage your access to the Products and provide support to you, where necessary. You shall not copy, modify, transmit, distribute or in any way exploit the Products or any other copyrighted materials provided other than for your individual training. Any other purpose is expressly prohibited under these terms. You shall also not permit anyone else to copy, use, modify, transmit, distribute or in any way exploit the Products or any other copyrighted materials. We provide the materials ‘as is’ and without any warranties, whether express or implied, except those that cannot be excluded under statute. We also do not warrant that the materials will be error free, including technical inaccuracies';
const acc = 'The starting date of your access to the Products is deemed to be the date that you first have access. We will attempt to contact you where your access period has ended. Where this is the case, we cannot guarantee that certification or completion (as appropriate) will be possible. As such, it is your responsibility to ensure that you complete the content within the allocated time period. If you do not think this will be possible, then extensions of time are available for purchase at an additional cost. We will take all commercially reasonable steps to provide you with uninterrupted access to the Products. However, your access may be restricted from time to time for reasons beyond our control. Such reasons include force majeure events, power outages and actions from computer hackers and others acting outside the law. Your access may also be interrupted due to software issues, server downtime, and increased Internet traffic, programming errors, regular maintenance and other related reasons. Where this is the case, we will take commercially reasonable steps to restore your full access within a reasonable period of time. ‘Commercially reasonable’ in these terms shall mean reasonable efforts taken in good faith, without an unduly burdensome use or expenditure of time, resources, personnel or money. Our joint aim is to provide courses and materials of the highest quality. As such, improvements or changes to the Products or any other materials may occur at any time without prior notification in order to ensure that they are up to date and accurate. Where your access to the Products is restricted for any of the above reasons, we may provide you with a free extension of time at our sole discretion.';
const pay = ' We use third party payment provider, depending on the way in which you make payments – Paynow .Payment for the Products must be made at the point of purchase. You agree to provide payment for the Products in the stipulated currency and you will be liable to pay any relevant conversion charges, as well as applicable sales tax in your region. Please note that we must receive your payment in full before providing you with access to the Products. Your payment includes the licensing of the Products for a limited period of time that is appropriate for the e-learning content. We are unable to provide a refund if you fail to complete the content within the allocated time, except at our absolute and sole discretion. We reserve our right to review and change the pricing of any of our products. This will not affect products that have already been purchased';
const rest = 'Where Products are delivered to you immediately, you will not have the right to change your mind. In other cases, you may change your mind within fourteen (14) days of purchase, so long as materials have not been provided to you, downloaded, streamed or otherwise accessed. If you do wish to cancel, please contact us via email. It is your responsibility to ensure that you meet the system requirements, including compatible hardware, software, telecommunications equipment and Internet service, prior to purchasing any content. We are unable to provide refunds where your access to the Products is inhibited due to insufficient system requirements. We may restrict your access to the Products if you breach these terms, including without limitation: •\t •\ta) A failure to make any payment due to us; or •\tb) Failure to provide accurate information that is necessary for us to provide the Products to you. In these circumstances, we will inform you in writing with seven (7) days’ notice that your access to the Products will be restricted.  MOBILE AND OTHER DEVICES\n If you use a mobile device or Pluralsight-provided mobile application to access the Site, the following additional terms and conditions (“Mobile Terms”) also apply:      (a) You agree that you are solely responsible for all message and data charges that apply to use of your mobile device to access the Site. All such charges are billed by and payable to your mobile service provider. Please contact your participating mobile service provider for pricing plans, participation status, and details.     (b) You understand that wireless service may not be available in all areas at all times and may be affected by product, software, coverage, or service changes made by your service provider or otherwise. Additional terms and conditions may apply to your use of our mobile applications based on the type of mobile device that you use.';
const ip = 'All rights, title and interest in intellectual property rights relating to the Products including copyright, patents, trademarks, trade secrets, improvements, developments, proprietary information, know-how, processes, methods, business plans or models (including computer software and preparatory and design materials thereof) and all other intellectual property (whether registered or not) developed or created from time to time shall exclusively be owned by Nhaka e-Learning. While you may utilise the intellectual property, you understand that there shall be no transfer of ownership of the same. Nothing that you see or read in the Products may be copied, reproduced, modified, distributed, transmitted, republished, displayed or performed for commercial use. All other trademarks, service marks and trade names in this material are the marks of the respective owners and any unauthorised use is prohibited.  . OUR RESPONSIBILITY FOR LOSS OR DAMAGE SUFFERED BY YOU We are responsible to you for foreseeable loss and damage caused by us. If we fail to comply with these terms, we are responsible for loss or damage you suffer that is a foreseeable result of our breaking this contract or our failing to use reasonable care and skill. Loss or damage is foreseeable if it is either obvious that it will happen or if we are both aware it might happen, such as where you have discussed the possibility with us during the sales process. We are not liable to you in any way for any indirect, special, incidental, punitive or consequential damages of any character, including without limitation damages for loss of goodwill, work stoppage, computer failure or malfunction, loss of data, loss of productivity or contract or any and all other commercial damages or losses. We do not exclude or limit our liability to you in any case where it would be unlawful to do so. This includes liability for death or personal injury caused by our negligence or the negligence of our employees, agents or subcontractors; for fraud or fraudulent misrepresentation; for breach of your legal rights in relation to the products (summarised above at 6). If the Products damage your device or digital content belonging to you and this is caused by our failure to use reasonable care and skill, we will either repair the damage or pay you compensation. However, we will not be liable for damage which you could have avoided by following our advice, following installation/download instructions, or having in place the minimum system requirements as advised by us. Our liability to you for any damage to your computer system or loss of data resulting from the downloading of content is limited to the amount you have paid for the Products. In no event shall we be liable for damages in excess of this sum. ';
const other = 'You need our consent to transfer your rights under these terms to someone else. We may not agree to this as these terms grant a licence for your benefit only. Nobody else has any rights under these terms – they are between you and us. No other person shall have any rights to enforce any of its terms. If a court finds part of these terms illegal, then rest will continue in force. Even if we delay in enforcing this contract, we can still enforce it later. If we do not insist immediately that you do anything you are required to do under these terms, or if we delay in taking steps against you in respect of your breaking this contract, that will not mean that you do not have to do those things and it will not prevent us taking steps against you at a later date.';
const det = 'You can contact us by writing to us at support support@nhakaelearning.com ';
const info = 'We call data that identifies or could reasonably be used to identify you as an individual ‘Personal Data’. This includes information about you that you give us by filling on forms on this site, registering or by corresponding with us by phone, live web chat, email or otherwise. This information may include your full name, and contact details including your email address and telephone number.We do not collect or process any special categories of Personal Data. ';
const coll = 'Your Information and how we use it.We collect your data, including Personal Data, for certain legitimate business interests of ours. Processing under this basis may occur in the following circumstances:When you make a request for further information on our website, either through a demo form, live web chat, contact form or similar transmission, we will use the data you provide to fulfil your request for information. We will also store this information on our database and use it to follow up with you, either by telephone or through an electronic communication.When you register on our website, we will use the data provided to give you access to resources on the website and may contact you by telephone to help you get the most out of them..Any payment or transaction details are processed in accordance with Paynow’s terms and conditions Where you have provided us with your details, we may contact you to notify you of changes to our services.';
const pd = 'Where you have made a purchase, we will also process data for the performance of the contract, which will involve payment or transaction details being processed and shared with our payment providers.When you register on our website or download resources, you are also given the opportunity to provide us with your consent. If you choose to do this, then we will use the Personal Data provided with your registration to let you know about our products and services which we think you will find interesting. You will be able to access resources on the website and will be sent relevant email notifications based on your interests. Where appropriate, we may also contact you by telephone.You can subsequently withdraw your consent at any time by a) contacting our Data Protection Officer; b) letting us know over the telephone; or c) following the ‘unsubscribe’ link that is provided in emails.When you interact with our website, we use Google Analytics to better understand your journey and help us provide improvements. Google Analytics may record your geographical location, device, internet browser and operating system, none of which would be classified as Personal Data.Any information that we process, including Personal Data, will be stored on a secure server behind a firewall. We will not retain your Personal Data for longer than is necessary for the processing. Where you have registered and provided your consent to receive communications from us, then we will retain your Personal Data for this purpose until your consent is withdrawn';
const rights = 'Under the EU General Data Protection Regulation, you possess a number of rights in relation to yourPersonal Data. These rights include (i) the right to be informed; (ii) the right of access; (iii) the right to rectification; (iv) the right to erasure; (v) the right to restrict processing; (vi) the right to data portability; (vii) the right to object; and (viii) rights in relation to automated decision making and profiling. We are committed to upholding these rights. If you wish to exercise any of these rights, please contact us using the details below.Where you have provided us with consent, you have the right to withdraw this consent at any time. To reiterate, you can do this at any time by contacting us directly or following the ‘unsubscribe’ link provided in any electronic communications you receive from us';
const accInfo = 'If you wish to exercise your right of access, then you may make a subject access request by contacting us as per the below. In most cases, we will not charge you a fee and will respond within one month. Fees may be charged for repeated or vexatious requests and we may take two months to provide all information in response to particularly complex requests. We will let you know if this is the case';
const cookies = 'Our site uses cookies to distinguish you from other users. This helps us to provide you with a good experience when you browse our site.Cookies are small files that a site or its service provider transfers to your computer’s hard drive through your web browser. They enable the site or service provider systems to recognise your browser and capture and remember certain information, such as items saved in your online shopping basket.Any data gathered through the use of cookies will not identify you personally. It is strictly aggregate statistical data about our visitors and how they used the resources on this web page. No Personal Data will be shared at any time via cookies.You may choose to decline all cookies on your computer. Your browser has an option to disable the use of cookies. If you do choose to decline cookies, then you may be limited to certain areas of our website';
const third = 'We may sometimes include or offer third party products or services on our website. The websites of these third parties will have separate and independent privacy policies, with which you should familiarise yourself. We bear no responsibility or liability for the content and activities of these third party sites. Nonetheless, we seek to protect the integrity of our website and welcome any feedback regarding these third party websites.This Privacy Policy was updated in September  2018.';


class Terms extends React.Component {
  

  render() {
    const { classes} = this.props;

    return (
      <Fragment>
        <Paper>
		   <Typography variant='h5' className={classes.root}>
		      Terms and Conditions
		   </Typography>
		   <Typography className={classes.root} >
				The following terms and conditions (“T&C”)  govern the way in which we supply products to you, 
				including any e-learning courses. Please read these terms carefully before you submit your order to us. 
				These terms tell you who we are, how we will provide products to you, how you and we may change or end the
				contract, what to do if there is a problem and other important information. All rights not expressly granted in 
				these terms are hereby reserved. You agree to review this agreement periodically to ensure that you are aware of 
				any amendments to this agreement, which may be made at any time. INFORMATION ABOUT US AND HOW TO CONTACT US We are 
				trading as Nhaka e-Learning. You can contact us 
				by writing to us at support support@nhakaelearning.com 
		   </Typography>
		   <List className={classes.root}>
		      <ListItemText primary='Grant of license' secondary={grant} />
		   </List>
		   <List className={classes.root}>
		      <ListItemText primary='General' secondary={general} />
		   </List>
		    <List className={classes.root}>
		      <ListItemText primary='Access to materials' secondary={acc} />
		   </List>
			 <List className={classes.root}>
		      <ListItemText primary='Pricing and payments' secondary={pay} />
		   </List>
		    <List className={classes.root}>
		      <ListItemText primary='Cancellation and restriction policy' secondary={rest} />
		   </List>
		    <List className={classes.root}>
		      <ListItemText primary='Intellictual Property' secondary={ip} />
		   </List>
		    <List className={classes.root}>
		      <ListItemText primary='Other import terms' secondary={other} />
		   </List>
		   <Typography variant='h5' className={classes.root}>
		      Our Privacy Policy
		   </Typography>
		   <Typography className={classes.root} >
				Nhaka treats the privacy of our visitors and users with the highest importance. This policy details the measures that we take to preserve and safeguard your privacy when you visit our website. It also demonstrates how we may process data in accordance with the EU General Data Protection Regulation (“GDPR”).
               This Privacy Policy may be updated from time to time.
		   </Typography>
			 <List className={classes.root}>
		      <ListItemText primary='Our Details' secondary={det} />
		   </List>
		    <List className={classes.root}>
		      <ListItemText primary='Information Collection' secondary={info} />
		   </List>
		    <List className={classes.root}>
		      <ListItemText primary=' Your Information and how we use it' secondary={coll} />
		   </List>
		    <List className={classes.root}>
		      <ListItemText primary='Your rights' secondary={pd} />
		   </List>
		    <List className={classes.root}>
		      <ListItemText primary='More Rights' secondary={rights} />
		   </List>
		    <List className={classes.root}>
		      <ListItemText primary=' Accessing your Information' secondary={accInfo} />
		   </List>
		    <List className={classes.root}>
		      <ListItemText primary='Cookies' secondary={cookies} />
		   </List>
		    <List className={classes.root}>
		      <ListItemText primary='Third Party Links' secondary={third} />
		   </List>
		</Paper>
          
      </Fragment>
    );
  }
}

Terms.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Terms);