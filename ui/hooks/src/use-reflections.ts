import * as React from 'react';
import { ApolloError } from '@apollo/client';
import { useGetReflectionsFromBeamLazyQuery, useGetReflectReflectionsLazyQuery } from './generated/apollo';
import {
  AkashaReflectEdge,
  AkashaReflectFiltersInput,
  AkashaReflectSortingInput,
  PageInfo,
  SortOrder,
} from '@akashaorg/typings/lib/sdk/graphql-types-new';
import { EntityTypes } from '@akashaorg/typings/lib/ui';
import {
  GetReflectionsFromBeamQuery,
  GetReflectionsFromBeamQueryVariables,
  GetReflectReflectionsQuery,
} from '@akashaorg/typings/lib/sdk/graphql-operation-types-new';
import { hasOwn } from './utils/has-own';

export type UseReflectionProps = {
  entityId: string;
  entityType: EntityTypes;
  filters?: AkashaReflectFiltersInput;
  sorting?: AkashaReflectSortingInput;
  overscan?: number;
};
const defaultSorting: AkashaReflectSortingInput = {
  createdAt: SortOrder.Asc,
};

export const useReflections = (props: UseReflectionProps) => {
  const { overscan = 10, entityId, entityType, sorting, filters } = props;
  const [state, setState] = React.useState<{
    reflections: AkashaReflectEdge[];
    pageInfo?: PageInfo
  }>({
    reflections: [],
  });

  const [errors, setErrors] = React.useState<(ApolloError | Error)[]>([]);

  const getterHook =
    entityType === EntityTypes.BEAM
      ? useGetReflectionsFromBeamLazyQuery
      : useGetReflectReflectionsLazyQuery;

  const mergedVars: GetReflectionsFromBeamQueryVariables = React.useMemo(() => {
    const vars: GetReflectionsFromBeamQueryVariables = {
      id: entityId,
      sorting: { ...defaultSorting, ...(sorting ?? {}) },
    };
    if (filters) {
      vars.filters = filters;
    }
    return vars;
  }, [entityId, sorting, filters]);

  const [fetchReflections, reflectionsQuery] = getterHook({
    variables: {
      ...mergedVars,
      first: overscan,
    },
    onError: error => {
      setErrors(prev => [...prev, error]);
    },
  });
  const extractEdges = (data: GetReflectionsFromBeamQuery | GetReflectReflectionsQuery) => {
    if (entityType === EntityTypes.BEAM && hasOwn(data, 'node')) {
      const result = data as GetReflectionsFromBeamQuery;
      if (hasOwn(result.node, 'reflections')) {
        return result.node.reflections.edges;
      }
      return [] as AkashaReflectEdge[];
    } else {
      const result = data as GetReflectReflectionsQuery;
      return result.akashaReflectIndex.edges;
    }
  };
  const extractPageInfo = (data: GetReflectionsFromBeamQuery | GetReflectReflectionsQuery): PageInfo => {
    if (entityType === EntityTypes.BEAM && hasOwn(data, 'node')) {
      const result = data.node;
      if (result && hasOwn(result, 'reflections')) {
        return result.reflections.pageInfo;
      }
    } else if (entityType === EntityTypes.REFLECT && hasOwn(data, 'akashaReflectIndex')){
      return data.akashaReflectIndex?.pageInfo;
    }
  }
  const fetchInitialData = async (restoreItem: { key: string; offsetTop: number }) => {
    if (restoreItem && !reflectionsQuery.called) {
      try {
        const results = await fetchReflections({
          variables: {
            ...mergedVars,
            after: restoreItem.key,
          },
        });
        if (results.error) {
          setErrors(prev => [...prev, results.error]);
          return;
        }

        if (!results.data) return;

        const newReflections = [];
        const edges = extractEdges(results.data);
        edges.forEach(e => {
          if (state.reflections.some(b => b.cursor === e.cursor)) {
            return;
          }
          newReflections.push(e);
        });
        setState({
          reflections: newReflections.reverse(),
          pageInfo: extractPageInfo(results.data),
        });
      } catch (err) {
        setErrors(prev => prev.concat(err));
      }
    } else if (!reflectionsQuery.called) {
      try {
        const results = await fetchReflections({
          variables: {
            ...mergedVars,
            sorting: { createdAt: SortOrder.Desc },
          },
        });
        if (results.error) {
          setErrors(prev => [...prev, results.error]);
          return;
        }
        if (!results.data) return;
        const newReflections = [];
        const edges = extractEdges(results.data);
        edges.forEach(e => {
          if (state.reflections.some(b => b.cursor === e.cursor)) {
            return;
          }
          newReflections.push(e);
        });
        setState({ reflections: newReflections, pageInfo: extractPageInfo(results.data) });
      } catch (err) {
        setErrors(prev => prev.concat(err));
      }
    }
  };
  const fetchNextPage = async (lastCursor: string) => {
    if (reflectionsQuery.loading || reflectionsQuery.error || !lastCursor) return;
    try {
      const results = await reflectionsQuery.fetchMore<GetReflectionsFromBeamQuery | GetReflectReflectionsQuery>({
        variables: {
          after: lastCursor,
          sorting: { createdAt: SortOrder.Desc },
        },
      });
      if (results.error) {
        setErrors(prev => [...prev, results.error]);
        return;
      }
      if (!results.data) return;
      const newReflections = [];
      const edges = extractEdges(results.data);
      edges.forEach(e => {
        if (state.reflections.some(b => b.cursor === e.cursor)) {
          return;
        }
        newReflections.push(e);
      });
      setState(prev => ({
        reflections: [...prev.reflections, ...newReflections],
        pageInfo: { ...extractPageInfo(results.data),  },
      }));
    } catch (err) {
      setErrors(prev => prev.concat(err));
    }
  };
  const fetchPreviousPage = async (firstCursor: string) => {
    if (reflectionsQuery.loading || reflectionsQuery.error || !firstCursor) return;
    try {
      const results = await reflectionsQuery.fetchMore<GetReflectionsFromBeamQuery | GetReflectReflectionsQuery>({
        variables: {
          sorting: { createdAt: SortOrder.Asc },
          after: firstCursor,
        },
      });
      if (results.error) {
        setErrors(prev => [...prev, results.error]);
        return;
      }
      if (!results.data) return;
      const newReflections = [];
      const edges = extractEdges(results.data);
      edges.forEach(e => {
        if (state.reflections.some(b => b.cursor === e.cursor)) {
          return;
        }
        newReflections.push(e);
      });
      setState(prev => ({
        reflections: [...newReflections.reverse(), ...prev.reflections],
        pageInfo: extractPageInfo(results.data)
      }));
    } catch (err) {
      setErrors(prev => prev.concat(err));
    }
  };
  const handleReset = () => {
    //@TODO:
  };
  return {
    reflections: state.reflections,
    fetchInitialData,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage: state.pageInfo?.hasNextPage,
    hasPreviousPage: state.pageInfo?.hasPreviousPage,
    onReset: handleReset,
    hasErrors: errors.length > 0,
    errors: errors.map(err => {
      if (err instanceof ApolloError) {
        console.log('Apollo error:', JSON.stringify(err));
        return err.message;
      } else {
        console.log('Error:', err);
        return err.message;
      }
    }),
  };
};