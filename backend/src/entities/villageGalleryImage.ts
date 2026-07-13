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
import type { Village } from "@/entities/village";

@Entity("village_gallery_images")
export class VillageGalleryImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Index("IDX_VILLAGE_GALLERY_VILLAGE")
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

  @ManyToOne("Village", (village: Village) => village.galleryImages, {
    onDelete: "CASCADE",
    nullable: false,
  })
  village: Relation<Village>;
}
