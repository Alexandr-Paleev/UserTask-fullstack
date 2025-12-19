import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import User from './user.entity'

@Entity()
class Task {
  @PrimaryGeneratedColumn()
  public id?: number

  @Column({ type: 'int', nullable: true })
  public ownerId?: number

  @Column({ default: false })
  public isDemo: boolean

  @Column()
  public title: string

  @Column()
  public description: string

  @Column()
  public address: string

  @Column()
  public startTime: string

  @Column()
  public endTime: string

  @ManyToOne(() => User, (user: User) => user.tasks)
  public user: User
}

export default Task
