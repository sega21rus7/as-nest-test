// export interface IAuthService {
//   host: string;
//   port: number;
// }

// const authService: IAuthService = {
//   host: process.env.auth_service_host || 'localhost',
//   port: +process.env.auth_service_port || 3000,
// };
export interface IMongodb {
  host: string;
  port: number;
  dbName: string;
  username: string;
  password: string;
}

const mongodb: IMongodb = {
  host: process.env.mongodb_host || 'localhost',
  port: +process.env.mongodb_port || 27017,
  dbName: process.env.mongodb_dbName || 'as-products',
  username: process.env.mongodb_username || '',
  password: process.env.mongodb_password || '',
};

export default () => ({
  port: 3000,
  mongodb,
});