import DataLoader from 'dataloader';
import type { PrismaClient, MemberType } from '@prisma/client';
import { mapToKey } from '../utils/utils.js';

export const createMemberTypeLoader = (prisma: PrismaClient) =>
    new DataLoader<string, MemberType | null>(async (ids) => {
        const memberTypes = await prisma.memberType.findMany({
            where: { id: { in: [...ids] } },
        });

        return mapToKey(ids, memberTypes, (mt) => mt.id);
    });