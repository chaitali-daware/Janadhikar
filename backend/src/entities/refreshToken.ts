import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  type Relation,
} from "typeorm";
import type { User } from "@/entities/user";

@Entity("refresh-tokens")
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne("User", (user: User) => user.refreshTokens)
  user: Relation<User>;
}
