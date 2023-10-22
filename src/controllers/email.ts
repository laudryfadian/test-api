import { failed, success } from '../helpers/responses'
import express from 'express';
import { sendToMessageBroker } from '../helpers/message.broker'


export const sendMail = async (req: express.Request, res: express.Response) => {
  try {
    const { to, subject, text } = req.body;

    if (!to || !text) {
      return failed(res, 'Bad Request', null, 400);
    }

    sendToMessageBroker({to, subject, text});
    
    return success(res, 'Success send email', null)
    
  } catch (error) {
    return failed(res, error, null, 400)  
  }
}

