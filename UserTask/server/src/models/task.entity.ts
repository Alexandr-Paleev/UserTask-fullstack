import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import User from './user.entity';
// import UserTask from './user-task.entity';
 
@Entity()
class Task {
  @PrimaryGeneratedColumn()
  public id?: number;
 
  @Column()
  public title: string;
 
  @Column()
  public description: string;

  @Column()
  public address: string;

  @Column()
  public startTime: string;

  @Column()
  public EndTime: string;

  @ManyToOne(() => User, (user: User) => user.address)
  public user_: User;
}
 
export default Task;