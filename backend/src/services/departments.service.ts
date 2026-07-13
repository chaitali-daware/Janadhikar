import { Department } from "@/entities/department";
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

class DepartmentsService {
  constructor(private readonly departmentsRepository: Repository<Department>) {}

  async create(
    createDepartmentDto: DeepPartial<Department>,
    options?: SaveOptions,
  ) {
    return await this.departmentsRepository.save(createDepartmentDto, options);
  }

  findAll(
    options?: FindManyOptions<Department>,
  ): Promise<[Department[], number]> {
    return this.departmentsRepository.findAndCount(options);
  }

  findOne(options: FindOneOptions<Department>): Promise<Department | null> {
    return this.departmentsRepository.findOne(options);
  }

  update(
    criteria: FindOptionsWhere<Department>,
    updateDepartmentDto: QueryDeepPartialEntity<Department>,
  ): Promise<UpdateResult> {
    return this.departmentsRepository.update(criteria, updateDepartmentDto);
  }

  delete(criteria: FindOptionsWhere<Department>): Promise<DeleteResult> {
    return this.departmentsRepository.delete(criteria);
  }

  getQueryBuilder(alias: string): SelectQueryBuilder<Department> {
    return this.departmentsRepository.createQueryBuilder(alias);
  }
}

export default DepartmentsService;
