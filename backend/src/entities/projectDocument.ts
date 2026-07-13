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

@Entity("project_documents")
export class ProjectDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Index("IDX_PROJECT_DOCUMENT_PROJECT")
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

  @Column({ type: "text", nullable: true })
  document_type: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    "DevelopmentProject",
    (project: DevelopmentProject) => project.documents,
    {
      onDelete: "CASCADE",
      nullable: false,
    },
  )
  project: Relation<DevelopmentProject>;
}
