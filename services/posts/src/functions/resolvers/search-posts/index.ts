import SearchPostRequest from "./request";
import SearchPostResponse from "./response";
import { algoliaSearch } from "../../../lib/algolia/search/index";

import { AppSync } from "../../../../../../utils/app-sync";

export const handler = AppSync.handler<SearchPostRequest>(
  async (event): Promise<SearchPostResponse> => {
    const { query, nextToken, limit } = event.arguments;
    const perPage = limit || 100;
    const page = Number(nextToken || 0);
    const response = await algoliaSearch(query, page, perPage);

    return {
      items: response.items,
      nextToken:
        response.nextToken === null ? null : String(response.nextToken),
    };
  }
);
