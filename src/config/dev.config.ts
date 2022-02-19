export default () => ({
  env: 'Devlopment',
  port: parseInt(process.env.PORT, 10) || 5000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});

// constructor(private configService: ConfigService<{ database: { host: string } }>) {
//   const dbHost = this.configService.get('database.host', { infer: true })!;
//   // typeof dbHost === "string"                                          |
//   //                                                                     +--> non-null assertion operator
// }
// The second generic relies on the first one, acting as a type assertion to get rid of all undefined types that ConfigService's methods can return when strictNullChecks is on. For instance:

// // ...
// constructor(private configService: ConfigService<{ PORT: number }, true>) {
//   //                                                               ^^^^
//   const port = this.configService.get('PORT', { infer: true });
//   //    ^^^ The type of port will be 'number' thus you don't need TS type assertions anymore
// }
