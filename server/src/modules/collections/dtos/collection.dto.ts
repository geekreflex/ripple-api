export interface CreateCollectionDto {
  name: string;
  description?: string;
}

export interface UpdateCollectionDto {
  name: string;
  description?: string;
  private?: boolean;
}
