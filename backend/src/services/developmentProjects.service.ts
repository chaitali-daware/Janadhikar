import { DevelopmentProject } from "@/entities/developmentProject";
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

class DevelopmentProjectsService {
  constructor(
    private readonly developmentProjectsRepository: Repository<DevelopmentProject>,
  ) {}

  async create(
    createProjectDto: DeepPartial<DevelopmentProject>,
    options?: SaveOptions,
  ) {
    return await this.developmentProjectsRepository.save(
      createProjectDto,
      options,
    );
  }

  findAll(
    options?: FindManyOptions<DevelopmentProject>,
  ): Promise<[DevelopmentProject[], number]> {
    return this.developmentProjectsRepository.findAndCount(options);
  }

  findOne(
    options: FindOneOptions<DevelopmentProject>,
  ): Promise<DevelopmentProject | null> {
    return this.developmentProjectsRepository.findOne(options);
  }

  update(
    criteria: FindOptionsWhere<DevelopmentProject>,
    updateProjectDto: QueryDeepPartialEntity<DevelopmentProject>,
  ): Promise<UpdateResult> {
    return this.developmentProjectsRepository.update(
      criteria,
      updateProjectDto,
    );
  }

  delete(
    criteria: FindOptionsWhere<DevelopmentProject>,
  ): Promise<DeleteResult> {
    return this.developmentProjectsRepository.delete(criteria);
  }

  getQueryBuilder(alias: string): SelectQueryBuilder<DevelopmentProject> {
    return this.developmentProjectsRepository.createQueryBuilder(alias);
  }
}

export default DevelopmentProjectsService;
