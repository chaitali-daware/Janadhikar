import { ProjectDocument } from "@/entities/projectDocument";
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

class ProjectDocumentsService {
  constructor(
    private readonly projectDocumentsRepository: Repository<ProjectDocument>,
  ) {}

  async create(
    createProjectDocumentDto: DeepPartial<ProjectDocument>,
    options?: SaveOptions,
  ) {
    return await this.projectDocumentsRepository.save(
      createProjectDocumentDto,
      options,
    );
  }

  findAll(
    options?: FindManyOptions<ProjectDocument>,
  ): Promise<[ProjectDocument[], number]> {
    return this.projectDocumentsRepository.findAndCount(options);
  }

  findOne(
    options: FindOneOptions<ProjectDocument>,
  ): Promise<ProjectDocument | null> {
    return this.projectDocumentsRepository.findOne(options);
  }

  update(
    criteria: FindOptionsWhere<ProjectDocument>,
    updateProjectDocumentDto: QueryDeepPartialEntity<ProjectDocument>,
  ): Promise<UpdateResult> {
    return this.projectDocumentsRepository.update(
      criteria,
      updateProjectDocumentDto,
    );
  }

  delete(criteria: FindOptionsWhere<ProjectDocument>): Promise<DeleteResult> {
    return this.projectDocumentsRepository.delete(criteria);
  }

  getQueryBuilder(alias: string): SelectQueryBuilder<ProjectDocument> {
    return this.projectDocumentsRepository.createQueryBuilder(alias);
  }
}

export default ProjectDocumentsService;
