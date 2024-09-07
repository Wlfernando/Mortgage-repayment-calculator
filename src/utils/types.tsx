export interface Mortgage {
  monthly: string;
  total: string;
}

export type CollectValue = (name: string, value: string) => void
