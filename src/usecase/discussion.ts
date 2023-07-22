import { Role } from "@prisma/client";
import { IDiscussionDTO, IReqCreateDiscussion } from "../contract";
import {
  IBookGroupSessionRepo,
  IDiscussionRepo,
  IGroupSessionRepo,
  bookGroupSessionRepo,
  discussionRepo,
  groupSessionRepo,
} from "../repo";

export class DiscussionUseCase implements IDiscussionUseCase {
  private discussionRepository: IDiscussionRepo;
  private groupSessionRepository: IGroupSessionRepo;
  private bookGroupSessionRepository: IBookGroupSessionRepo;

  constructor(params: {
    discussionRepository: IDiscussionRepo;
    groupSessionRepository: IGroupSessionRepo;
    bookGroupSessionRepository: IBookGroupSessionRepo;
  }) {
    this.discussionRepository = params.discussionRepository;
    this.groupSessionRepository = params.groupSessionRepository;
    this.bookGroupSessionRepository = params.bookGroupSessionRepository;
  }

  async create(userId: string, userRole: Role, params: IReqCreateDiscussion) {
    const { sessionId, content } = params;

    await this.checkEligibility(userId, userRole, sessionId);

    const newDiscussion = await this.discussionRepository.create({
      userId,
      sessionId,
      content,
    });

    return newDiscussion;
  }

  async query(sessionId?: string, userId?: string) {
    const discussions = await this.discussionRepository.findMany({
      sessionId,
      userId,
    });

    return discussions;
  }

  private async checkEligibility(
    userId: string,
    userRole: Role,
    sessionId: string
  ) {
    const groupSession = await this.groupSessionRepository.findOne({
      id: sessionId,
    });

    if (!groupSession) {
      throw new Error("Group session not found");
    }

    if (userRole === Role.MENTEE) {
      const bookGroupSessions = await this.bookGroupSessionRepository.findMany({
        sessionId: sessionId,
      });

      if (!bookGroupSessions.find((b) => b.menteeId === userId)) {
        throw new Error("You are not member of this group session");
      }
    } else if (userRole === Role.MENTOR) {
      if (groupSession.mentorId !== userId) {
        throw new Error("You are not mentor of this group session");
      }
    }
  }
}

export type IDiscussionUseCase = {
  create(
    userId: string,
    userRole: Role,
    params: IReqCreateDiscussion
  ): Promise<IDiscussionDTO>;

  query(sessionId?: string, userId?: string): Promise<IDiscussionDTO[]>;
};

export const discussionUseCase: DiscussionUseCase = new DiscussionUseCase({
  discussionRepository: discussionRepo,
  groupSessionRepository: groupSessionRepo,
  bookGroupSessionRepository: bookGroupSessionRepo,
});
