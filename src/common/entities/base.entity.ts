import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
export class Base {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;
}
