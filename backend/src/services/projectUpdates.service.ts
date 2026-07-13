import { ProjectUpdate } from "@/entities/projectUpdate";
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

class ProjectUpdatesService {
  constructor(
    private readonly projectUpdatesRepository: Repository<ProjectUpdate>,
  ) {}

  async create(
    createProjectUpdateDto: DeepPartial<ProjectUpdate>,
    options?: SaveOptions,
  ) {
    return await this.projectUpdatesRepository.save(
      createProjectUpdateDto,
      options,
    );
  }

  findAll(
    options?: FindManyOptions<ProjectUpdate>,
  ): Promise<[ProjectUpdate[], number]> {
    return this.projectUpdatesRepository.findAndCount(options);
  }

  findOne(
    options: FindOneOptions<ProjectUpdate>,
  ): Promise<ProjectUpdate | null> {
    return this.projectUpdatesRepository.findOne(options);
  }

  update(
    criteria: FindOptionsWhere<ProjectUpdate>,
    updateProjectUpdateDto: QueryDeepPartialEntity<ProjectUpdate>,
  ): Promise<UpdateResult> {
    return this.projectUpdatesRepository.update(
      criteria,
      updateProjectUpdateDto,
    );
  }

  delete(criteria: FindOptionsWhere<ProjectUpdate>): Promise<DeleteResult> {
    return this.projectUpdatesRepository.delete(criteria);
  }

  getQueryBuilder(alias: string): SelectQueryBuilder<ProjectUpdate> {
    return this.projectUpdatesRepository.createQueryBuilder(alias);
  }
}

export default ProjectUpdatesService;
