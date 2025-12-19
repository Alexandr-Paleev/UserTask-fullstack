import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Task from './task.entity'
import City from './city.entity'

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number

  // Multi-tenant ownership: records belong to an authenticated account
  @Column({ type: 'int', nullable: true })
  public ownerId?: number

  // Demo records are visible to everyone but not editable/deletable
  @Column({ default: false })
  public isDemo: boolean

  @Column()
  public firstname: string

  @Column()
  public lastname: string

  @Column()
  public address: string

  @Column()
  public phone: string

  @ManyToOne(() => City, (city: City) => city.users)
  public city: City

  @OneToMany(() => Task, (task: Task) => task.user)
  public tasks: Task[]
}

export default User
