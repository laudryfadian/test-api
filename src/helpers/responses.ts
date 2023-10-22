import moment from 'moment-timezone';

export const failed = (res: any, message: string, data: any = null, statusCode: number) => {
  res.status(statusCode).json({
    status: false,
    statusCode: statusCode,
    timestamp: moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
    message: message,
    data: data,
  });
};

export const success = (res: any, message: string, data: any, statusCode = 200) => {
  res.status(statusCode).json({
    status: true,
    statusCode: statusCode,
    timestamp: moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
    message: message,
    data: data,
  });
};
