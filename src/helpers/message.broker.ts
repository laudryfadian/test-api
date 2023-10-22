import amqp from 'amqplib';
import nodemailer from 'nodemailer';
import { config } from '../config';

export const sendToMessageBroker = async (msg: any) => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    process.once('SIGINT', () => {
      if (connection) connection.close();
    });

    const channel = await connection.createChannel();
    const queue = 'my_queue';
    const messageString = JSON.stringify(msg);

    await channel.assertQueue(queue, {
      exclusive: false,
      durable: true,
      autoDelete: false,
      arguments: {
        'x-queue-type': 'stream',
        'x-max-length-bytes': 2_000_000_000
      }
    });

    await channel.sendToQueue(queue, Buffer.from(messageString)); // Send the JSON string as a message
    console.log(" [x] Sent '%s'", messageString);
    await channel.close();

    connection.close();
  } catch (e) {
    console.error(e);
  }
}