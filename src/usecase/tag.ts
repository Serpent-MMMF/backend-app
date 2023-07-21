import {
  IQueryGetTag,
  ITagDTO,
  IUserTagDTO,
  IUserTagDetailDTO,
} from "../contract/tag";
import { ITagRepo, tagRepo, IUserTagRepo, userTagRepo } from "../repo";

export class TagUsecase implements ITagUsecase {
  private tagRepository: ITagRepo;
  private userTagRepository: IUserTagRepo;

  constructor(params: {
    tagRepository: ITagRepo;
    userTagRepository: IUserTagRepo;
  }) {
    this.tagRepository = params.tagRepository;
    this.userTagRepository = params.userTagRepository;
  }

  async upsertUserTag(tagIds: string[], userId: string) {
    const userTags = await this.userTagRepository.findMany({ userId });
    const userTagIds = userTags.map((userTag) => userTag.tagId);

    const toDelete = userTagIds.filter(
      (userTagId) => !tagIds.includes(userTagId)
    );
    const toCreate = tagIds.filter((tagId) => !userTagIds.includes(tagId));

    await Promise.all(
      toDelete.map((tagId) =>
        this.userTagRepository.deleteMany({ userId, tagId })
      )
    );
    await Promise.all(
      toCreate.map((tagId) => this.userTagRepository.create({ userId, tagId }))
    );

    return this.userTagRepository.findMany({ userId });
  }

  findTags() {
    return this.tagRepository.findMany();
  }

  async findUserTags(params: IQueryGetTag) {
    const userTags = await this.userTagRepository.findMany(params);
    const tags = await Promise.all(
      userTags.map(async (userTag) => {
        const tag = await this.tagRepository.findOne({
          id: userTag.tagId,
        });

        return {
          ...userTag,
          tag,
        };
      })
    );

    return tags;
  }
}

export type ITagUsecase = {
  upsertUserTag: (tagIds: string[], userId: string) => Promise<IUserTagDTO[]>;
  findTags: () => Promise<ITagDTO[]>;
  findUserTags: (params: IQueryGetTag) => Promise<IUserTagDetailDTO[]>;
};

export const tagUsecase = new TagUsecase({
  tagRepository: tagRepo,
  userTagRepository: userTagRepo,
});
