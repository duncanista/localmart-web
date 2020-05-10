export namespace LM {
  type Url = string;

  export interface idd { uid: string; }

  export interface StringSet { [key: string]: boolean; }

  export interface TimeSpan { from: firebase.firestore.Timestamp; to: firebase.firestore.Timestamp; }

  export interface Attachment { name: string, url: Url; }

  export interface Images {
    attatchments: Attachment[];
  }

  export interface Product {
    seller: string; // autofill from collection
    name?: string;
    company: string;
    description?: string;
    images: Images[];
  }

  export interface Company {
    name: string;
  }

  export interface Community {
    name: string;
    shortname: string;
  }

  export interface UserCommunities {
    [communityName: string] : StringSet;
  }

  export interface StoreUser {
    email: string;
    name?: string;
    lastname?: string;
    admin: boolean;
    communities?: string[];
  }
  export type UserCreationData = StoreUser & { password?: string };
  export type UserUpdateData = idd & Partial<UserCreationData>;
}
