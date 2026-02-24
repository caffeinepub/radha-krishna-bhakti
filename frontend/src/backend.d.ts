import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type FavoriteId = string;
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addFavoritePrayer(prayerId: FavoriteId): Promise<[string, Array<FavoriteId>]>;
    addFavoriteQuote(quoteId: FavoriteId): Promise<[string, Array<FavoriteId>]>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearFavorites(): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getFavorites(): Promise<{
        quotes: Array<FavoriteId>;
        prayers: Array<FavoriteId>;
    }>;
    isCallerAdmin(): Promise<boolean>;
    removeFavoritePrayer(prayerId: FavoriteId): Promise<Array<FavoriteId>>;
    removeFavoriteQuote(quoteId: FavoriteId): Promise<Array<FavoriteId>>;
}
