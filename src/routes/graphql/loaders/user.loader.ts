import DataLoader from 'dataloader';
import type { PrismaClient, User } from '@prisma/client';
import { mapToKey } from '../utils/utils.js';

export const createUserLoader = (prisma: PrismaClient) =>
    new DataLoader<string, User | null>(async (ids) => {
        const users = await prisma.user.findMany({
            where: { id: { in: [...ids] } },
        });
        
        return mapToKey(ids, users, (user) => user.id);
    });