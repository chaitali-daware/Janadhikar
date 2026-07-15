import { Textarea } from "@/components/ui/textarea";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

import { httpClient } from "@/lib/http-client";
import { Loading } from "@/components/loading";
import type { ApiResponse, Prediction } from "@/types";



export default function DashboardPage() {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { predictionId, projectId } = useParams();

  const predictionQuery = useQuery({
    queryKey: ["prediction", predictionId, projectId],
    queryFn: async () => {
      const response = await httpClient.get<
        ApiResponse<{ data: Prediction; success: boolean }>
      >(`/predictions/${predictionId}`);
      return response.data;
    },
    enabled: !!predictionId && !!projectId,
    refetchInterval: 8000,
  });

  if (predictionQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 overflow-hidden p-4 md:p-6">

      <div className="flex w-full shrink-0 flex-col gap-4">
        <div className="flex w-full flex-col rounded-2xl border bg-card shadow-sm transition-all cursor-text focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          <div className="relative flex-1 max-h-64.5 overflow-y-auto">
            <Textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Initiate a query or send a command to AI..."
              className="min-h-12 w-full resize-none border-0 bg-transparent! p-3 text-[16px] text-foreground shadow-none outline-none transition-[padding] duration-200 ease-in-out whitespace-pre-wrap wrap-break-word focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

// #94b909
// #8dcb55
// #031F7F
// #13A0AA
// #208c33
// #d8e021
