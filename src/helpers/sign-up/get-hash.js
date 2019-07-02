import crypto from 'crypto';

export const getHash = (data, secret) => {
  const hmac = crypto.createHmac('sha1', secret); 
  hmac.update(data);
  return hmac.digest('hex');
}
