import { Module } from '@nestjs/common';
import { MysqlDbModule } from './mysql/mysql.db.module';

@Module({
  imports: [MysqlDbModule],
  exports: [MysqlDbModule],
})
export class DatabaseModule {}
