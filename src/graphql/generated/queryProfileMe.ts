/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: queryProfileMe
// ====================================================

export interface queryProfileMe_me {
  __typename: "UsersPermissionsMe";
  id: string;
  username: string;
  email: string;
}

export interface queryProfileMe {
  me: queryProfileMe_me | null;
}
