
export class PagedUtils<T> {
    page: number = 0;
    per_page: number = 0;
    total: number = 0;
    total_pages: number = 0;
    data: T[] = [];
}