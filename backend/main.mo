import Map "mo:core/Map";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type FavoriteId = Text;
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Favorites = {
    quotes : Set.Set<FavoriteId>;
    prayers : Set.Set<FavoriteId>;
  };

  let userFavorites = Map.empty<Principal, Favorites>();

  func getOrCreateFavorites(user : Principal) : Favorites {
    switch (userFavorites.get(user)) {
      case (?favorites) { favorites };
      case (null) {
        let newFavorites : Favorites = {
          quotes = Set.empty<FavoriteId>();
          prayers = Set.empty<FavoriteId>();
        };
        userFavorites.add(user, newFavorites);
        newFavorites;
      };
    };
  };

  func verifyUser(caller : Principal) {
    if (caller.isAnonymous()) {
      Runtime.trap("Action not allowed for anonymous users");
    };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can perform this action");
    };
  };

  public shared ({ caller }) func addFavoriteQuote(quoteId : FavoriteId) : async (Text, [FavoriteId]) {
    verifyUser(caller);
    var favorites = getOrCreateFavorites(caller);
    if (favorites.quotes.contains(quoteId)) {
      Runtime.trap("Quote is already in favorites");
    };
    favorites.quotes.add(quoteId);
    (quoteId, favorites.quotes.values().toArray());
  };

  public shared ({ caller }) func removeFavoriteQuote(quoteId : FavoriteId) : async [FavoriteId] {
    verifyUser(caller);
    var favorites = getOrCreateFavorites(caller);
    if (not favorites.quotes.contains(quoteId)) {
      Runtime.trap("Quote is not in your favorites");
    };
    favorites.quotes.remove(quoteId);
    favorites.quotes.values().toArray();
  };

  public shared ({ caller }) func addFavoritePrayer(prayerId : FavoriteId) : async (Text, [FavoriteId]) {
    verifyUser(caller);
    var favorites = getOrCreateFavorites(caller);
    if (favorites.prayers.contains(prayerId)) {
      Runtime.trap("Prayer is already in favorites");
    };
    favorites.prayers.add(prayerId);
    (prayerId, favorites.prayers.values().toArray());
  };

  public shared ({ caller }) func removeFavoritePrayer(prayerId : FavoriteId) : async [FavoriteId] {
    verifyUser(caller);
    var favorites = getOrCreateFavorites(caller);
    if (not favorites.prayers.contains(prayerId)) {
      Runtime.trap("Prayer is not in your favorites");
    };
    favorites.prayers.remove(prayerId);
    favorites.prayers.values().toArray();
  };

  public shared ({ caller }) func clearFavorites() : async () {
    verifyUser(caller);
    userFavorites.remove(caller);
  };

  public query ({ caller }) func getFavorites() : async {
    quotes : [FavoriteId];
    prayers : [FavoriteId];
  } {
    verifyUser(caller);
    let favorites = getOrCreateFavorites(caller);
    {
      quotes = favorites.quotes.values().toArray();
      prayers = favorites.prayers.values().toArray();
    };
  };
};
