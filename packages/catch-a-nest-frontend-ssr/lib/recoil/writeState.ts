import { useCallback, useState } from 'react';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

const syncLoadedState = atom<boolean>({
  key: 'syncLoadedState',
  default: false,
});

const postTitleState = atom<string | null>({
  key: 'postTitleState',
  default: null,
});

const postMarkdownState = atom<string | null>({
  key: 'postMarkdownState',
  default: null,
});

const postShortDescriptionState = atom<string | null>({
  key: 'postShortDescriptionState',
  default: null,
});

const postThumbnailUrlState = atom<string | null>({
  key: 'postThumbnailUrlState',
  default: null,
});

export type PostAllContentType = {
  title: string | null;
  markdown: string | null;
  shortDescription: string | null;
  thumbnailUrl: string | null;
};

const postAllContent = selector<PostAllContentType>({
  key: '',
  get: ({ get }) => {
    const title = get(postTitleState);
    const markdown = get(postMarkdownState);
    const shortDescription = get(postShortDescriptionState);
    const thumbnailUrl = get(postThumbnailUrlState);

    return {
      title,
      markdown,
      shortDescription,
      thumbnailUrl,
    };
  },
});

export function usePostAllContentValue() {
  return useRecoilValue(postAllContent);
}

export function useSyncLoadedValue() {
  return useRecoilValue(syncLoadedState);
}

export function usePostTitleState() {
  return useRecoilState(postTitleState);
}

export function usePostMarkdownValue() {
  return useRecoilValue(postMarkdownState);
}

export function useResetAllState() {
  const resetPostTitle = useResetRecoilState(postTitleState);
  const resetPostMarkdown = useResetRecoilState(postMarkdownState);
  const resetPostShortDescription = useResetRecoilState(
    postShortDescriptionState
  );
  const resetPostThumbnailUrl = useResetRecoilState(postThumbnailUrlState);
  const resetSyncLoaded = useResetRecoilState(syncLoadedState);

  const reset = useCallback(() => {
    resetPostTitle();
    resetPostMarkdown();
    resetPostShortDescription();
    resetPostThumbnailUrl();
    resetSyncLoaded();
  }, [
    resetPostTitle,
    resetPostMarkdown,
    resetPostShortDescription,
    resetPostThumbnailUrl,
    resetSyncLoaded,
  ]);

  return reset;
}

export function useSetPostAllContent() {
  const setPostTitle = useSetRecoilState(postTitleState);
  const setPostMarkdown = useSetRecoilState(postMarkdownState);
  const setPostShortDescription = useSetRecoilState(postShortDescriptionState);
  const setPostThumbnailUrl = useSetRecoilState(postThumbnailUrlState);

  const setSyncLoaded = useSetRecoilState(syncLoadedState);

  const set = useCallback(
    (post: PostAllContentType) => {
      setPostTitle(post.title);
      setPostMarkdown(post.markdown);
      setPostShortDescription(post.shortDescription);
      setPostThumbnailUrl(post.thumbnailUrl);

      setSyncLoaded(true);
    },
    [
      setPostTitle,
      setPostMarkdown,
      setPostShortDescription,
      setPostThumbnailUrl,
      setSyncLoaded,
    ]
  );
  return set;
}
