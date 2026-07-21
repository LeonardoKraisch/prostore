"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
  page: number;
  totalPages: number;
  urlParamName?: string;
};

export const Pagination = ({
  page,
  totalPages,
  urlParamName,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (direction: "prev" | "next") => {
    const pageValue = direction === "prev" ? page - 1 : page + 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });
    router.push(newUrl);
  };

  return (
    <div className="flex items-center justify-center gap-2 py-10">
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        disabled={page <= 1}
        onClick={() => handleClick("prev")}
      >
        Previous
      </Button>
      {page}
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        disabled={page >= totalPages}
        onClick={() => handleClick("next")}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
