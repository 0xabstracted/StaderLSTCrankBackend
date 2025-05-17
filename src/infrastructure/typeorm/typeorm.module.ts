import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from '../environment-config';
import { EnvironmentConfigService } from '../environment-config';
require('dotenv').config();

@Module({
  imports: [
    EnvironmentConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: async (config: EnvironmentConfigService) => {
        const migrationsPath = process.env.NODE_ENV === 'production' ? '/prod-migrations/*{.ts,.js}' : '/migrations/*{.ts,.js}';
        
        return {
          type: 'postgres',
          url: config.getDbConnectionUrl(),
          migrations: [migrationsPath], // Use dynamic migrations path
          migrationsTableName: '_migrations',
          migrationsRun: true, // Auto-run migrations
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: false,
          logging: false,
        };
      },
    }),
  ],
})
export class TypeOrmConfigModule {}
