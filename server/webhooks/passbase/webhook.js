const express = require("express");
const router = express.Router();
// const { Connection } = require("../../../../mongoUtil.js");
const webhookHelper = require("./controllers/webhookController.js");
const transporter = require("../../controllers/nodemailer/transportConfig.js");
const axios = require("axios");
const config = require("config");

router.post("/", (req, respppppppp, next) => {

    const webhook = webhookHelper.decryptWebhookIfNeeded(req);

    console.log("webhook active/ran in processWebhook helper function: ", webhook);

    const configuration = {
        headers: {
            "X-API-KEY": config.get("passbaseSecretApiKey")
        }
    };
    axios.get(`https://api.passbase.com/verification/v1/identities/${webhook.key}`, configuration).then(async (res) => {
        console.log("HERE: ", res.data);

        const { owner } = res.data;

        // console.log("owner.email", owner.email);

        switch (webhook.event) {
            case "VERIFICATION_COMPLETED":
              // Do logic here for VERIFICATION_COMPLETED event
              const mailOptions = {
                from: 'blongjeremy@gmail.com',
                to: owner.email,
                subject: 'CyberHunt Verification Completed!',
                html: `<table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td bgcolor="#7366ff" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                            <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Verification Completed!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;">You have successfully COMPLETED your verification requirements, we are continuously working on and reviewing incoming verifications on a daily basis. We understand you'd like to start fully participating and we are processing requests as quickly as possible - typically this usually takes anywhere from 1-3 days, please bear with us!</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#ffffff" align="left">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td align="center" style="border-radius: 3px;" bgcolor="#7366ff"><a href="#" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #000000; display: inline-block;">Visit CyberHunt!</a></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr> <!-- COPY -->
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;">Once a decision is made, you will be notified and your account will be automatically updated accordingly. In the meantime, feel free to browse and explore our platform/marketplace to get an understanding of how things work so you're ready to go when a decision is made!</p>
                                        </td>
                                    </tr> <!-- COPY -->
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;">If you have any questions, just reply to this email — we're always happy to help out.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;">Cheers,<br>CyberHunt Team</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#7366ff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
                                            <p style="margin: 0;"><a href="#" target="_blank" style="color: #ffffff;">We&rsquo;re here to help you out</a></p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                            <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>`
                };
            
                await transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        // error
                        console.log("error!", error);

                        respppppppp.status(200).json({
                            message: "Error sending alert email!",
                            err: error
                        })
                    } else {
                        // success
                        console.log("successfully sent email ! : ", info);
            
                        respppppppp.status(200).json({
                            message: "Success!",
                            info
                        })
                    }
                });
                break;
            case "VERIFICATION_REVIEWED":
              // Do logic here for VERIFICATION_REVIEWED event 
              if (webhook.status === "approved") {
                  // APPROVED!
                  const mailOptions = {
                      from: 'blongjeremy@gmail.com',
                      to: owner.email,
                      subject: 'CyberHunt Verification Completed/Finished!',
                      html: `<table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                              <td bgcolor="#7366ff" align="center" style="padding: 0px 10px 0px 10px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                      <tr>
                                          <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                              <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Verification Finished!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                      <tr>
                                          <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                              <p style="margin: 0;">We're excited to inform you that we have VERIFIED your account successfully and you now have FULL access to all features and functionality within our platform. User's on CyberHunt will also be able to see that you're verified now as well but more importantly qualifies you to apply for any work on our platform or start posting listings if you're an employer!</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td bgcolor="#ffffff" align="left">
                                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                  <tr>
                                                      <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                          <table border="0" cellspacing="0" cellpadding="0">
                                                              <tr>
                                                                  <td align="center" style="border-radius: 3px;" bgcolor="#7366ff"><a href="#" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #000000; display: inline-block;">Visit CyberHunt!</a></td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr> <!-- COPY -->
                                      <tr>
                                          <td bgcolor="#ffffff" align="left" style="padding: 10px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                              <p style="margin: 0;">We have successfully VERIFIED your account which will boost your social standing on our platform as well as allow you to START actively participating within our platform/marketplace! Congrats, Welcome aboard!</p>
                                          </td>
                                      </tr> <!-- COPY -->
                                      
                                      <tr>
                                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                              <p style="margin: 0;">If you have any questions, just reply to this email — we're always happy to help out.</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                              <p style="margin: 0;">Cheers,<br>CyberHunt Team</p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                      <tr>
                                          <td bgcolor="#7366ff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                              <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
                                              <p style="margin: 0;"><a href="#" target="_blank" style="color: #ffffff;">We&rsquo;re here to help you out</a></p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                      <tr>
                                          <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                              <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>`
                    };

                    // ~ INSERT AXIOS REQUEST TO FETCH USER BASED ON PASSBASE KEY/ID ~ 
                    axios.post(`${config.get("baseServerURL")}/update/user/fully/verified`, {
                        passbaseIDAccessKey: webhook.key
                    }).then(async (secondResponse) => {
                        if (secondResponse.data.message === "Successfully updated account!") {
                            console.log(secondResponse.data);

                            await transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    // error
                                    console.log("error!", error);

                                    respppppppp.status(200).json({
                                        message: "Error sending alert email to verified user!",
                                        err: error
                                    })
                                } else {
                                    // success
                                    console.log("successfully sent email ! : ", info);
                        
                                    respppppppp.status(200).json({
                                        message: "Success!",
                                        info
                                    })
                                }
                            });
                        } else {
                            console.log("ERROR : ", secondResponse.data);
                        }
                    }).catch((errrrrrror) => {
                        console.log(errrrrrror);
                    });
                } else {
                  // DENIED!
                  const mailOptions = {
                      from: 'blongjeremy@gmail.com',
                      to: owner.email,
                      subject: 'CyberHunt Verification Completed/Finished!',
                      html: `<table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                              <td bgcolor="#7366ff" align="center" style="padding: 0px 10px 0px 10px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                      <tr>
                                          <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                              <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Verification Finished!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                      <tr>
                                          <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                              <p style="margin: 0;">We regret to inform you that we are unable to verify your identity with the provided documents at this time. There are a variety of reasons that verifications are denied such as improper/expired documents or poor photo documentation of such indentifying documents as some examples. You are welcome to try again with different documents or by providing more accurate/better documentation of previously used documents.</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td bgcolor="#ffffff" align="left">
                                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                  <tr>
                                                      <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                          <table border="0" cellspacing="0" cellpadding="0">
                                                              <tr>
                                                                  <td align="center" style="border-radius: 3px;" bgcolor="#7366ff"><a href="#" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #000000; display: inline-block;">Visit CyberHunt!</a></td>
                                                              </tr>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr> <!-- COPY -->
                                      <tr>
                                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                              <p style="margin: 0;">It can be common to be denied "account verification status" and it is possible you'll be approved on your next attempt but there is no guarentee, but we always recommend doing another attempt if you feel compelled! If you need more clarification or understanding of accepted documentation, please visit the link below for more information...</p>
                                          </td>
                                      </tr> <!-- COPY -->
                                      
                                      <tr>
                                          <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                              <a href="https://support.passbase.com/what-documents-do-you-support" style="color: blue">Verification documentation help!</a>
                                          </td>
                                      </tr>
                                      
                                      <tr>
                                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                              <p style="margin: 0;">If you have any questions, just reply to this email — we're always happy to help out.</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                              <p style="margin: 0;">Cheers,<br>CyberHunt Team</p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                      <tr>
                                          <td bgcolor="#7366ff" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                              <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
                                              <p style="margin: 0;"><a href="#" target="_blank" style="color: #ffffff;">We&rsquo;re here to help you out</a></p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                      <tr>
                                          <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                              <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>`
                  };
                
                  await transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            // error
                            console.log("error!", error);

                            respppppppp.status(200).json({
                                message: "Error sending alert email!",
                                err: error
                            })
                        } else {
                            // success
                            console.log("successfully sent email ! : ", info);
                
                            respppppppp.status(200).json({
                                message: "Success!",
                                info
                            })
                        }
                  });
              }
              break;
            default:
              console.log("Couldn't process webhook event");
        }
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = router;