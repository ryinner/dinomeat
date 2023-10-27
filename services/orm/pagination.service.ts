interface PaginationSettings {
  limit: number;
  page: number;
  count: number;
  maxPages?: number;
}

export function pagination ({ page, limit, count, maxPages = 11 }: PaginationSettings) {
  const last = Math.ceil(count / limit);
  const first = 1;

  let start = first;
  let end = last;

  if (last > maxPages) {
    const middle = Math.floor(maxPages / 2);
    const leftBound = page - middle;
    const rightBound = page + middle;

    start = (leftBound < 1 ? 1 : leftBound) - (rightBound > last ? rightBound - last : 0);
    end = (rightBound > last ? last : rightBound) + (leftBound < 1 ? 1 - leftBound : 0);

    if (start !== 1) {
      start += 2;
    }
    if (end !== last) {
      end -= 2;
    }
  }

  return {
    page,
    last,
    first,
    start,
    end,
    previous: page > first ? page - 1 : first,
    next: page < last ? page + 1 : last,
    total: count,
  }
}