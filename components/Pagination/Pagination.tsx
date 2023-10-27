"use client";

import { pagination } from "@/services/orm/pagination.service";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({
  page,
  last,
  first,
  start,
  end,
}: ReturnType<typeof pagination>) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const stringSearchParams = searchParams.toString().replace(/page=[\w]/gi, '');

  if (last === first || last === 0) {
    return <></>;
  }
  const renderPages: { page: string | number }[] = [];

  if (start !== first) {
    renderPages.push(
      {
        page: first,
      },
      {
        page: "...",
      }
    );
  }

  for (let index = start; index <= end; index++) {
    renderPages.push({ page: index });
  }

  if (last !== end) {
    renderPages.push({
      page: "...",
      },
      {
        page: last,
      }
    );
  }

  return (
    <div>
      <ul>
        {renderPages.map((p) => (
          <li key={p.page}>
            {typeof p.page === "string" ? (
              <span>{p.page}</span>
            ) : (
              <Link className={`${p.page === page ? `active` : ''}`} href={`${path}?page=${p.page}${Boolean(stringSearchParams.trim()) ? `&${stringSearchParams}` : ''}`}>{p.page}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
