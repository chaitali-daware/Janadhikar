import { VillageGalleryImage } from "@/entities/villageGalleryImage";
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SaveOptions,
  SelectQueryBuilder,
  UpdateResult,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

class VillageGalleryImagesService {
  constructor(
    private readonly villageGalleryImagesRepository: Repository<VillageGalleryImage>,
  ) {}

  async create(
    createVillageGalleryImageDto: DeepPartial<VillageGalleryImage>,
    options?: SaveOptions,
  ) {
    return await this.villageGalleryImagesRepository.save(
      createVillageGalleryImageDto,
      options,
    );
  }

  findAll(
    options?: FindManyOptions<VillageGalleryImage>,
  ): Promise<[VillageGalleryImage[], number]> {
    return this.villageGalleryImagesRepository.findAndCount(options);
  }

  findOne(
    options: FindOneOptions<VillageGalleryImage>,
  ): Promise<VillageGalleryImage | null> {
    return this.villageGalleryImagesRepository.findOne(options);
  }

  update(
    criteria: FindOptionsWhere<VillageGalleryImage>,
    updateVillageGalleryImageDto: QueryDeepPartialEntity<VillageGalleryImage>,
  ): Promise<UpdateResult> {
    return this.villageGalleryImagesRepository.update(
      criteria,
      updateVillageGalleryImageDto,
    );
  }

  delete(
    criteria: FindOptionsWhere<VillageGalleryImage>,
  ): Promise<DeleteResult> {
    return this.villageGalleryImagesRepository.delete(criteria);
  }

  getQueryBuilder(alias: string): SelectQueryBuilder<VillageGalleryImage> {
    return this.villageGalleryImagesRepository.createQueryBuilder(alias);
  }
}

export default VillageGalleryImagesService;
