import DataLoader from 'dataloader';
import type { PrismaClient, Post } from '@prisma/client';
import { groupByKey } from '../utils/utils.js';

export const createPostsLoader = (prisma: PrismaClient) =>
    new DataLoader<string, Post[]>(async (ids) => {
        const posts = await prisma.post.findMany({
            where: { authorId: { in: [...ids] } },
        });

        return groupByKey(ids, posts, (post) => post.authorId);
    });