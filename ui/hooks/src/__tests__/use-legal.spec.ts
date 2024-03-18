import { renderHook } from '@testing-library/react-hooks';
import { useLegalDoc } from '../use-legal';
import { LEGAL_DOCS } from '@akashaorg/typings/lib/ui';

describe('useLegal', () => {
  it('should check if legal docs are returned', async () => {
    const { result, waitFor } = renderHook(() => useLegalDoc(LEGAL_DOCS.TERMS_OF_USE));
    await waitFor(() => result.current.isFetched, { timeout: 5000 });
    expect(result.current.data).toBe('This is illegal text doc');
  });
});
