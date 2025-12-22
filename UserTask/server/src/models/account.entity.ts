import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm'

@Entity()
class Account {
  @PrimaryGeneratedColumn()
  public id?: number

  @Index({ unique: true })
  @Column()
  public email: string

  @Column()
  public passwordHash: string

  @CreateDateColumn()
  public createdAt: Date
}

export default Account



