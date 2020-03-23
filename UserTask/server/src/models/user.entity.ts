import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import Task from './task.entity';
import City from './city.entity';
// import UserTask from './user-task.entity';
 
@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;
 
  @Column()
  public firstname: string;
 
  @Column()
  public lastname: string;

  @Column()
  public address: string;

  @Column()
  public phone: string;

  @ManyToOne(() => City, (city: City) => city.user_)
  public city_: City;

  @OneToMany(() => Task, (task: Task) => task.address)
  public task_: Task[];
}
 
export default User;