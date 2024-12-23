export type Category = {
    id: string;
    name: string;
    slug: string;
    description?: string;
    categoryCount?: number;
};

export type AddCategoryPayload = {
    name: string;
};

