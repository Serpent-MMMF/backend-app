import {
  IGroupSessionDTO,
  IQueryGetGroupSession,
  IReqCreateGroupSession,
} from "../contract/group-session";
import { IGroupSessionRepo, groupSessionRepo } from "../repo/group-session";

export class GroupSessionUseCase implements IGroupSessionUseCase {
  private groupSessionRepository: IGroupSessionRepo;

  constructor(params: { groupSessionRepository: IGroupSessionRepo }) {
    this.groupSessionRepository = params.groupSessionRepository;
  }

  async create(mentorId: string, params: IReqCreateGroupSession) {
    if (params.date < new Date()) {
      throw new Error("Date must be greater than now");
    }

    const groupSession = await this.groupSessionRepository.create({
      mentorId: mentorId,
      ...params,
    });

    return groupSession;
  }

  async query(params: IQueryGetGroupSession) {
    const groupSessions = await this.groupSessionRepository.findManyFilterDate(
      params.limitStartDateTime,
      params.limitEndDateTime,
      {
        mentorId: params.mentorId ? params.mentorId : undefined,
      }
    );

    return groupSessions;
  }

  async findById(id: string) {
    const groupSession = await this.groupSessionRepository.findOne({
      id,
    });

    return groupSession;
  }
}

export type IGroupSessionUseCase = {
  create(
    mentorId: string,
    params: IReqCreateGroupSession
  ): Promise<IGroupSessionDTO>;

  query(params: IQueryGetGroupSession): Promise<IGroupSessionDTO[]>;

  findById(id: string): Promise<IGroupSessionDTO | null>;
};

export const groupSessionUseCase: GroupSessionUseCase = new GroupSessionUseCase(
  {
    groupSessionRepository: groupSessionRepo,
  }
);
