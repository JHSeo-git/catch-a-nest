import { useCallback } from 'react';
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

const isEditPost = atom<boolean>({
  key: 'isEditPost',
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

const visiblePublishScreen = atom<boolean>({
  key: 'visibleWriteScreen',
  default: false,
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

export function useIsEditPostValue() {
  return useRecoilValue(isEditPost);
}

export function useSetIsEditPost() {
  return useSetRecoilState(isEditPost);
}

export function usePostTitleValue() {
  return useRecoilValue(postTitleState);
}

export function usePostTitleState() {
  return useRecoilState(postTitleState);
}

export function usePostMarkdownValue() {
  return useRecoilValue(postMarkdownState);
}

export function usePostThumbnailUrlState() {
  return useRecoilState(postThumbnailUrlState);
}

export function usePostShortDescriptionState() {
  return useRecoilState(postShortDescriptionState);
}

export function useVisiblePublishScreen() {
  return useRecoilValue(visiblePublishScreen);
}

export function useSetVisiblePublishScreen() {
  return useSetRecoilState(visiblePublishScreen);
}

export function useVisiblePublishScreenState() {
  return useRecoilState(visiblePublishScreen);
}

export function useResetAllState() {
  const resetPostTitle = useResetRecoilState(postTitleState);
  const resetPostMarkdown = useResetRecoilState(postMarkdownState);
  const resetPostShortDescription = useResetRecoilState(
    postShortDescriptionState
  );
  const resetPostThumbnailUrl = useResetRecoilState(postThumbnailUrlState);
  const resetSyncLoaded = useResetRecoilState(syncLoadedState);
  const resetVisiblePublishScreen = useResetRecoilState(visiblePublishScreen);
  const resetIsEditPost = useResetRecoilState(isEditPost);

  const reset = useCallback(() => {
    resetPostTitle();
    resetPostMarkdown();
    resetPostShortDescription();
    resetPostThumbnailUrl();
    resetSyncLoaded();
    resetVisiblePublishScreen();
    resetIsEditPost();
  }, [
    resetPostTitle,
    resetPostMarkdown,
    resetPostShortDescription,
    resetPostThumbnailUrl,
    resetSyncLoaded,
    resetVisiblePublishScreen,
    resetIsEditPost,
  ]);

  return reset;
}

export function useSetPostAllContent() {
  const setPostTitle = useSetRecoilState(postTitleState);
  const setPostMarkdown = useSetRecoilState(postMarkdownState);
  const setPostShortDescription = useSetRecoilState(postShortDescriptionState);
  const setPostThumbnailUrl = useSetRecoilState(postThumbnailUrlState);
  const setIsEditPost = useSetRecoilState(isEditPost);

  const setSyncLoaded = useSetRecoilState(syncLoadedState);

  const set = useCallback(
    (post: PostAllContentType) => {
      setPostTitle(post.title);
      setPostMarkdown(post.markdown);
      setPostShortDescription(post.shortDescription);
      setPostThumbnailUrl(post.thumbnailUrl);
      setIsEditPost(true);

      setSyncLoaded(true);
    },
    [
      setPostTitle,
      setPostMarkdown,
      setPostShortDescription,
      setPostThumbnailUrl,
      setIsEditPost,
      setSyncLoaded,
    ]
  );
  return set;
}
