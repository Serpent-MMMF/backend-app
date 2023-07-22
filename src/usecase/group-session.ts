import { Role } from "@prisma/client";
import {
  IDataGroupSessionDetailSelf,
  IGroupSessionDTO,
  IQueryGetGroupSession,
  IReqCreateGroupSession,
  IRespGroupSessionDetailSelf,
} from "../contract/group-session";
import {
  IBookGroupSessionRepo,
  IUserRepo,
  bookGroupSessionRepo,
} from "../repo";
import { IGroupSessionRepo, groupSessionRepo, userRepo } from "../repo";
import {
  IBookGroupSessionUseCase,
  bookGroupSessionUseCase,
} from "./book-group-session";

export class GroupSessionUseCase implements IGroupSessionUseCase {
  private gsRepo: IGroupSessionRepo;
  private bgsRepo: IBookGroupSessionRepo;
  private uRepo: IUserRepo;

  constructor(params: {
    groupSessionRepository: IGroupSessionRepo;
    bookGroupSessionRepository: IBookGroupSessionRepo;
    userRepository: IUserRepo;
  }) {
    this.gsRepo = params.groupSessionRepository;
    this.bgsRepo = params.bookGroupSessionRepository;
    this.uRepo = params.userRepository;
  }

  async create(mentorId: string, params: IReqCreateGroupSession) {
    if (params.date < new Date()) {
      throw new Error("Date must be greater than now");
    }

    const groupSession = await this.gsRepo.create({
      mentorId: mentorId,
      ...params,
    });

    return groupSession;
  }

  async query(params: IQueryGetGroupSession) {
    const groupSessions = await this.gsRepo.findManyFilterDate(
      params.limitStartDateTime,
      params.limitEndDateTime,
      {
        mentorId: params.mentorId ? params.mentorId : undefined,
      }
    );

    return groupSessions;
  }

  async findById(id: string) {
    const groupSession = await this.gsRepo.findOne({
      id,
    });

    return groupSession;
  }

  async availability(id: string, userId: string) {
    const groupSession = await this.findById(id);
    if (!groupSession) {
      throw new Error("Group session not found");
    }

    const user = await this.uRepo.findOne({
      id: userId,
    });
    if (!user) {
      throw new Error("User not found");
    }

    const bookGroupSessions = await this.bgsRepo.findMany({
      menteeId: userId,
    });

    const isJoined = !!bookGroupSessions.find((b) => b.sessionId === id);

    const data: IRespGroupSessionDetailSelf["data"] = {
      groupSession,
      meta: {
        canJoin:
          user.role === Role.MENTEE &&
          groupSession.maxParticipant > bookGroupSessions.length &&
          !isJoined,
        isJoined: isJoined,
        isOwner: user.role === Role.MENTOR && groupSession.mentorId === userId,
      },
    };

    return data;
  }
}

export type IGroupSessionUseCase = {
  create(
    mentorId: string,
    params: IReqCreateGroupSession
  ): Promise<IGroupSessionDTO>;

  query(params: IQueryGetGroupSession): Promise<IGroupSessionDTO[]>;

  findById(id: string): Promise<IGroupSessionDTO | null>;

  availability(
    id: string,
    userId: string
  ): Promise<IDataGroupSessionDetailSelf>;
};

export const groupSessionUseCase: GroupSessionUseCase = new GroupSessionUseCase(
  {
    groupSessionRepository: groupSessionRepo,
    bookGroupSessionRepository: bookGroupSessionRepo,
    userRepository: userRepo,
  }
);
