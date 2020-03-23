import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import User from './user.entity';
 
@Entity()
class City {
  @PrimaryGeneratedColumn()
  public id?: number;
 
  @Column()
  public title: string;

  @OneToMany(() => User, (user: User) => user.city_)
  public user_: User[];
}
 
export default City;