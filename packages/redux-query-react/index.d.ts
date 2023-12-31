declare module 'redux-query-react' {
  import React from 'react';
  import {
    ActionPromiseValue,
    Entities,
    QueriesState,
    QueryConfig,
    QueryState,
    QueriesSelector,
  } from 'redux-query';

  export type QueryConfigFactory<TEntities = Entities, TArgs = never> = (
    ...args: TArgs
  ) => QueryConfig<TEntities>;
  export type QueryConfigsFactory<TEntities = Entities, TArgs = never> = (
    ...args: TArgs
  ) => QueryConfig<TEntities> | QueryConfig<TEntities>[];

  export interface ConnectRequestOptions {
    forwardRef?: boolean;
    pure?: boolean;
  }
  export type ForceRequestCallback<TEntities = Entities> = () => Promise<
    ActionPromiseValue<TEntities>
  > | void;

  export type ForceRequestsCallback = () => void;

  export interface WithForceRequest<TEntities = Entities> {
    forceRequest: ForceRequestCallback<TEntities>;
  }

  export type ConnectRequestWrapper<TProps extends WithForceRequest> = (
    WrappedComponent: React.ComponentType<TProps>,
  ) => React.ComponentType<Omit<TProps, 'forceRequest'>>;

  export type RequestConnector<
    TEntities = Entities,
    TProps extends WithForceRequest<TEntities> = WithForceRequest<TEntities>
  > = (
    mapPropsToConfigs: QueryConfigsFactory<TEntities>,
    options?: ConnectRequestOptions,
  ) => ConnectRequestWrapper<TProps>;

  export interface ProviderProps {
    queriesSelector: QueriesSelector;
    children?: React.ReactNode;
  }
  export type ReduxQueryProvider = React.ComponentType<ProviderProps>;

  export type ActionPromise<TEntities = Entities> = Promise<ActionPromiseValue<TEntities>>;
  type RunMutation<TEntities = Entities, TArgs = never> = (
    ...args: TArgs
  ) => ActionPromise<TEntities>;

  type RunRequest<TEntities = Entities, TArgs = never> = (
    ...args: TArgs
  ) => ActionPromise<TEntities>;

  export type UseRequestHook = <TEntities = Entities>(
    queryConfig: QueryConfig<TEntities> | null | undefined,
  ) => [QueryState, ForceRequestCallback<TEntities>];

  export type UseRequestsHook = <TEntities = Entities>(
    queryConfigs: Array<QueryConfig<TEntities> | null | undefined> | null | undefined,
  ) => [QueryState, ForceRequestsCallback];

  export type UseRequestOnDemandHook = <TEntities = Entities, TArgs = never>(
    createQueryConfig: QueryConfigFactory<TEntities, TArgs>,
  ) => [QueryState, RunRequest<TEntities, TArgs>];

  export type UseMutationHook = <TEntities = Entities, TArgs = never>(
    createQueryConfig: QueryConfigFactory<TEntities, TArgs>,
  ) => [QueryState, RunMutation<TEntities, TArgs>];

  export const connectRequest: RequestConnector;
  export const Provider: ReduxQueryProvider;
  export const useRequest: UseRequestHook;
  export const useRequestOnDemand: UseRequestOnDemandHook;
  export const useRequests: UseRequestsHook;
  export const useMutation: UseMutationHook;
}
