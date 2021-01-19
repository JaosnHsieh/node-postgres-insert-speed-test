import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  BaseEntity,
  DatabaseType,
} from 'typeorm';
import { Type } from 'class-transformer';
import * as _ from 'lodash';
// from https://github.com/typeorm/typeorm/issues/400#issuecomment-496190176
const QUEUE_BULK_SAVE_THROTTLE_MS = 1000;

export class ExtraBaseEntity extends BaseEntity {
  private static isBulkSaveRunning: boolean = false;
  private static queuedBulkSaveInstances: BaseEntity[] = [];
  private static readonly queueBulkSaveThrottle: (
    t: typeof ExtraBaseEntity,
  ) => void = _.throttle(
    (t: typeof ExtraBaseEntity) => {
      if (ExtraBaseEntity.isBulkSaveRunning === true) {
        return;
      }
      const currentInstances = ExtraBaseEntity.queuedBulkSaveInstances;
      const nextIndex = currentInstances.length;
      ExtraBaseEntity.isBulkSaveRunning = true;
      t.save(currentInstances)
        .then(() => {
          console.log(new Date(), `$ saved ${nextIndex} rows`);
          ExtraBaseEntity.queuedBulkSaveInstances = ExtraBaseEntity.queuedBulkSaveInstances.slice(
            nextIndex,
          );
        })
        .catch((err) => {
          console.error(`$ throttleQueueBulkSave err`, err);
        })
        .finally(() => {
          ExtraBaseEntity.isBulkSaveRunning = false;
        });
    },
    QUEUE_BULK_SAVE_THROTTLE_MS,
    {
      trailing: true,
    },
  );
  queueBulkSave: (
    instance: ExtraBaseEntity,
    t: typeof ExtraBaseEntity,
  ) => void = (i, t) => {
    ExtraBaseEntity.queuedBulkSaveInstances.push(i);
    ExtraBaseEntity.queueBulkSaveThrottle(t);
  };
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
    // console.log(`BeforeUpdate`);
    this.updatedAt = new Date();
  }
}
