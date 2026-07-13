import { Facility } from "@/entities/facility";
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

class FacilitiesService {
  constructor(private readonly facilitiesRepository: Repository<Facility>) {}

  async create(
    createFacilityDto: DeepPartial<Facility>,
    options?: SaveOptions,
  ) {
    return await this.facilitiesRepository.save(createFacilityDto, options);
  }

  findAll(options?: FindManyOptions<Facility>): Promise<[Facility[], number]> {
    return this.facilitiesRepository.findAndCount(options);
  }

  findOne(options: FindOneOptions<Facility>): Promise<Facility | null> {
    return this.facilitiesRepository.findOne(options);
  }

  update(
    criteria: FindOptionsWhere<Facility>,
    updateFacilityDto: QueryDeepPartialEntity<Facility>,
  ): Promise<UpdateResult> {
    return this.facilitiesRepository.update(criteria, updateFacilityDto);
  }

  delete(criteria: FindOptionsWhere<Facility>): Promise<DeleteResult> {
    return this.facilitiesRepository.delete(criteria);
  }

  getQueryBuilder(alias: string): SelectQueryBuilder<Facility> {
    return this.facilitiesRepository.createQueryBuilder(alias);
  }
}

export default FacilitiesService;
