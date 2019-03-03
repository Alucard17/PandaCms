export interface IAuthor {
    name: string,
    slug: string,
    description: string,
    socialLinks: [{ platform: string, url: string}]
    createdAt?: Date,
    updatedAt?: Date
}