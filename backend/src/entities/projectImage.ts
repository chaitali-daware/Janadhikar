import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  type Relation,
} from "typeorm";
import type { DevelopmentProject } from "@/entities/developmentProject";

@Entity("project_images")
export class ProjectImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Index("IDX_PROJECT_IMAGE_PROJECT")
  @Column({ type: "text" })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ type: "text" })
  storage_key: string;

  @Column({ type: "text", nullable: true })
  mime_type: string | null;

  @Column({ type: "integer", default: 0 })
  size_bytes: number;

  @Column({ type: "integer", default: 0 })
  sort_order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    "DevelopmentProject",
    (project: DevelopmentProject) => project.images,
    {
      onDelete: "CASCADE",
      nullable: false,
    },
  )
  project: Relation<DevelopmentProject>;
}
