import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  BaseEntity,
  DatabaseType,
} from 'typeorm';
import { Type } from 'class-transformer';

// from https://github.com/typeorm/typeorm/issues/400#issuecomment-496190176

export class ExtraBaseEntity extends BaseEntity {
  @Column({
    type: 'timestamp with time zone',
    nullable: false,
    readonly: true,
    default: () => undefined,
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value,
    },
  })
  @Type(() => Date)
  createdAt!: Date;

  @Column({
    type: 'timestamp with time zone',
    nullable: false,
    default: () => undefined,
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => {
        return value;
      },
    },
  })
  @Type(() => Date)
  updatedAt!: Date;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  updateDateUpdate() {
    console.log(`BeforeUpdate`);
    this.updatedAt = new Date();
  }
}
