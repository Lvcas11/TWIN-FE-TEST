import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001', // Base URL of your backend API
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface SupplyChainItem {
  id: number;
  item: string;
  creationDate: string;
  action?: string;
  state: EventTypes; // Use the EventTypes enum for the state
  // Add other fields as per your API response
}

export enum EventTypes {
  DRAFT = 0,
  CREATE,
  UPDATE,
  DELETE,
  RECEIVE,
}

// GET /items - Fetch all items
export const getItems = async (): Promise<SupplyChainItem[]> => {
  const response = await apiClient.get<SupplyChainItem[]>('/items');
  return response.data;
};

// POST /items - Create a new item
export const createItem = async (item: {
  name: string;
  color: string;
  price: number;
  user: string;
}): Promise<SupplyChainItem> => {
  const response = await apiClient.post<SupplyChainItem>('/items', item);
  return response.data;
};

// GET /items/{id} - Retrieve an item by its ID
export const getItemById = async (
  id: number | string,
): Promise<SupplyChainItem> => {
  const response = await apiClient.get<SupplyChainItem>(`/items/${id}`);
  return response.data;
};

// PUT /items/{id} - Update an item's information
export const updateItem = async (
  id: number,
  item: Partial<SupplyChainItem>,
): Promise<SupplyChainItem> => {
  const response = await apiClient.put<SupplyChainItem>(`/items/${id}`, item);
  return response.data;
};

// PUT /items/state/{id} - Update an item's state
export const updateItemState = async (
  id: number,
  state: EventTypes,
): Promise<SupplyChainItem> => {
  const response = await apiClient.put<SupplyChainItem>(`/items/state/${id}`, {
    state,
  });
  return response.data;
};
