import type { PrismaClient } from '@prisma/client';
import { createUserLoader } from './loaders/user.loader.js';
import { createProfileLoader } from './loaders/profile.loader.js';
import { createPostsLoader } from './loaders/post.loader.js';
import { createMemberTypeLoader } from './loaders/member-type.loader.js';
import { createIsUserSubscribedToLoader, createIsWeSubscribedToUserLoader } from './loaders/subscribe.loader.js';

export interface DataLoaderType {
    userLoader: ReturnType<typeof createUserLoader>;
    profileLoader: ReturnType<typeof createProfileLoader>;
    postsLoader: ReturnType<typeof createPostsLoader>;
    memberTypeLoader: ReturnType<typeof createMemberTypeLoader>;
    isUserSubscribedToLoader: ReturnType<typeof createIsUserSubscribedToLoader>;
    isWeSubscribedToUserLoader: ReturnType<typeof createIsWeSubscribedToUserLoader>;
}

export const createDataLoaders = (prisma: PrismaClient): DataLoaderType => {
    return {
        userLoader: createUserLoader(prisma),
        profileLoader: createProfileLoader(prisma),
        postsLoader: createPostsLoader(prisma),
        memberTypeLoader: createMemberTypeLoader(prisma),
        isUserSubscribedToLoader: createIsUserSubscribedToLoader(prisma),
        isWeSubscribedToUserLoader: createIsWeSubscribedToUserLoader(prisma),
    };
};