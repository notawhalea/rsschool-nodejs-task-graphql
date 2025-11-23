import DataLoader from 'dataloader';
import type { PrismaClient, User } from '@prisma/client';
import { groupByKey } from '../utils/utils.js';

export const createIsUserSubscribedToLoader = (prisma: PrismaClient) =>
    new DataLoader<string, User[]>(async (ids) => {
        const subscriptions = await prisma.subscribersOnAuthors.findMany({
            where: { subscriberId: { in: [...ids] } },
            include: { author: true },
        });
        const groupedSubs = groupByKey(ids, subscriptions, (sub) => sub.subscriberId);

        return groupedSubs.map(subs => subs.map(s => s.author));
    });

export const createIsWeSubscribedToUserLoader = (prisma: PrismaClient) =>
    new DataLoader<string, User[]>(async (ids) => {
        const subscriptions = await prisma.subscribersOnAuthors.findMany({
            where: { authorId: { in: [...ids] } },
            include: { subscriber: true },
        });

        const groupedSubs = groupByKey(ids, subscriptions, (sub) => sub.authorId);

        return groupedSubs.map(subs => subs.map(s => s.subscriber));
    });