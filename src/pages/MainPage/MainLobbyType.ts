export interface MainLobbyData {
  status: string;
  fetchStatus: string;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  isInitialLoading: boolean;
  isLoading: boolean;
  data: LobbyData;
  dataUpdatedAt: number;
  error: any;
  errorUpdatedAt: number;
  failureCount: number;
  failureReason: any;
  errorUpdateCount: number;
  isFetched: boolean;
  isFetchedAfterMount: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isLoadingError: boolean;
  isPaused: boolean;
  isPlaceholderData: boolean;
  isRefetchError: boolean;
  isStale: boolean;
}

export interface LobbyData {
  content: LobbyContents[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort2;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface LobbyContents {
  roomId: number;
  roomName: string;
  participantCount: number;
  hostNickname?: string;
  gameState: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Sort2 {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
