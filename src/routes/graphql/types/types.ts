type MemberRole = 'BASIC' | 'BUSINESS';

export interface CreateUserInputType {
    name: string;
    balance: number;
}

export interface CreatePostInputType {
    title: string;
    content: string;
    authorId: string;
}

export interface CreateProfileInputType {
    isMale: boolean;
    yearOfBirth: number;
    userId: string;
    memberTypeId: MemberRole;
}

export type UpdateUserInputType = Partial<CreateUserInputType>;
export type UpdatePostInputType = Partial<Omit<CreatePostInputType, 'authorId'>>;
export type UpdateProfileInputType = Partial<Omit<CreateProfileInputType, 'userId'>>;