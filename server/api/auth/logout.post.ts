import { User } from '~~/server/models/User';

export default defineEventHandler(async (event) => {
  await connectDB();
  
  deleteCookie(event, 'refresh_token');

  return { message: 'Başarıyla çıkış yapıldı' };
});