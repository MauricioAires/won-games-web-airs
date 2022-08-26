/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: queryProfileMe
// ====================================================

export interface queryProfileMe_user {
  __typename: "UsersPermissionsUser";
  id: string;
  username: string;
  email: string;
}

export interface queryProfileMe {
  user: queryProfileMe_user | null;
}

export interface queryProfileMeVariables {
  identifier: string;
}
