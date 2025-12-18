import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Task from './task.entity';
import City from './city.entity';

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

  @ManyToOne(() => City, (city: City) => city.users)
  public city: City;

  @OneToMany(() => Task, (task: Task) => task.user)
  public tasks: Task[];
}

export default User;
