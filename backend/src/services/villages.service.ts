import { Village } from "@/entities/village";
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

class VillagesService {
  constructor(private readonly villagesRepository: Repository<Village>) {}

  async create(createVillageDto: DeepPartial<Village>, options?: SaveOptions) {
    return await this.villagesRepository.save(createVillageDto, options);
  }

  findAll(options?: FindManyOptions<Village>): Promise<[Village[], number]> {
    return this.villagesRepository.findAndCount(options);
  }

  findOne(options: FindOneOptions<Village>): Promise<Village | null> {
    return this.villagesRepository.findOne(options);
  }

  update(
    criteria: FindOptionsWhere<Village>,
    updateVillageDto: QueryDeepPartialEntity<Village>,
  ): Promise<UpdateResult> {
    return this.villagesRepository.update(criteria, updateVillageDto);
  }

  delete(criteria: FindOptionsWhere<Village>): Promise<DeleteResult> {
    return this.villagesRepository.delete(criteria);
  }

  getQueryBuilder(alias: string): SelectQueryBuilder<Village> {
    return this.villagesRepository.createQueryBuilder(alias);
  }
}

export default VillagesService;
