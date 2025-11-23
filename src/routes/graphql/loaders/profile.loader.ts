import DataLoader from 'dataloader';
import type { PrismaClient, Profile } from '@prisma/client';
import { mapToKey } from '../utils/utils.js';

export const createProfileLoader = (prisma: PrismaClient) =>
    new DataLoader<string, Profile | null>(async (ids) => {
        const profiles = await prisma.profile.findMany({
            where: { userId: { in: [...ids] } },
        });

        return mapToKey(ids, profiles, (profile) => profile.userId);
    });