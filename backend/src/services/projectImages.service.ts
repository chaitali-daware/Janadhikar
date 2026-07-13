import { ProjectImage } from "@/entities/projectImage";
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

class ProjectImagesService {
  constructor(
    private readonly projectImagesRepository: Repository<ProjectImage>,
  ) {}

  async create(
    createProjectImageDto: DeepPartial<ProjectImage>,
    options?: SaveOptions,
  ) {
    return await this.projectImagesRepository.save(
      createProjectImageDto,
      options,
    );
  }

  findAll(
    options?: FindManyOptions<ProjectImage>,
  ): Promise<[ProjectImage[], number]> {
    return this.projectImagesRepository.findAndCount(options);
  }

  findOne(options: FindOneOptions<ProjectImage>): Promise<ProjectImage | null> {
    return this.projectImagesRepository.findOne(options);
  }

  update(
    criteria: FindOptionsWhere<ProjectImage>,
    updateProjectImageDto: QueryDeepPartialEntity<ProjectImage>,
  ): Promise<UpdateResult> {
    return this.projectImagesRepository.update(criteria, updateProjectImageDto);
  }

  delete(criteria: FindOptionsWhere<ProjectImage>): Promise<DeleteResult> {
    return this.projectImagesRepository.delete(criteria);
  }

  getQueryBuilder(alias: string): SelectQueryBuilder<ProjectImage> {
    return this.projectImagesRepository.createQueryBuilder(alias);
  }
}

export default ProjectImagesService;
