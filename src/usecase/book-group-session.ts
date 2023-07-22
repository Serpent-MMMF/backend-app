import { IBookGroupSessionDTO } from "../contract/book-group-session";
import {
  IBookGroupSessionRepo,
  IGroupSessionRepo,
  bookGroupSessionRepo,
  groupSessionRepo,
} from "../repo";

export class BookGroupSessionUseCase implements IBookGroupSessionUseCase {
  private groupSessionRepository: IGroupSessionRepo;
  private bookGroupSessionRepository: IBookGroupSessionRepo;

  constructor(params: {
    groupSessionRepository: IGroupSessionRepo;
    bookGroupSessionRepository: IBookGroupSessionRepo;
  }) {
    this.groupSessionRepository = params.groupSessionRepository;
    this.bookGroupSessionRepository = params.bookGroupSessionRepository;
  }

  async create(menteeId: string, groupSessionId: string) {
    const groupSession = await this.groupSessionRepository.findOne({
      id: groupSessionId,
    });

    if (!groupSession) {
      throw new Error("Group session not found");
    }

    const bookGroupSessions = await this.bookGroupSessionRepository.findMany({
      sessionId: groupSessionId,
    });

    if (bookGroupSessions.length >= groupSession?.maxParticipant!) {
      throw new Error("Group session is full");
    } else if (bookGroupSessions.find((b) => b.menteeId === menteeId)) {
      throw new Error("You already booked this group session");
    }

    const newBookGroupSession = await this.bookGroupSessionRepository.create({
      sessionId: groupSessionId,
      menteeId: menteeId,
    });

    return newBookGroupSession;
  }

  async query(menteeId?: string, groupSessionId?: string) {
    const bookGroupSessions = await this.bookGroupSessionRepository.findMany({
      sessionId: groupSessionId,
      menteeId: menteeId,
    });

    return bookGroupSessions;
  }

  async findById(id: string) {
    const bookGroupSession = await this.bookGroupSessionRepository.findOne({
      id,
    });

    return bookGroupSession;
  }
}

export type IBookGroupSessionUseCase = {
  create(
    menteeId: string,
    groupSessionId: string
  ): Promise<IBookGroupSessionDTO>;

  query(
    menteeId?: string,
    groupSessionId?: string
  ): Promise<IBookGroupSessionDTO[]>;

  findById(id: string): Promise<IBookGroupSessionDTO | null>;
};

export const bookGroupSessionUseCase: BookGroupSessionUseCase =
  new BookGroupSessionUseCase({
    groupSessionRepository: groupSessionRepo,
    bookGroupSessionRepository: bookGroupSessionRepo,
  });
