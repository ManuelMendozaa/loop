import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE: z.string().url(),
  PORT: z.string().default('3000').transform(Number),
  SERVER_HOST: z.string().default('0.0.0.0'),
  CORS_ORIGINS: z.string().default('["*"]'),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});
type Environment = z.infer<typeof envSchema>;

export class Config {
  private static _instance: Config;
  static env: Environment;

  private constructor() {
    const parsedEnv = envSchema.safeParse(process.env);

    if (!parsedEnv.success) {
      console.error('Invalid environment variables:');
      const errors = z.treeifyError(parsedEnv.error).properties;

      Object.keys(errors).forEach((key) => {
        console.error(`- ${key}: ${errors[key].errors}`);
      });

      process.exit(1);
    }

    Config.env = parsedEnv.data;
  }

  public static init() {
    if (this.env) return;
    this._instance = new Config();
  }
}
