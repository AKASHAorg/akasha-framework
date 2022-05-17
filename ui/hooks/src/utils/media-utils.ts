import getSDK from '@akashaorg/awf-sdk';
import { UserProfile_Response } from '@akashaorg/sdk-typings/lib/interfaces/responses';
import { lastValueFrom } from 'rxjs';

export interface IConfig {
  quality?: number;
  maxWidth: number;
  maxHeight: number;
  autoRotate?: boolean;
  mimeType?: string;
}

/**
 * Utility to build gateway links to ipfs content
 * @returns originLink: textile subdomain gateway
 * fallbackLink: infura subdomain gateway
 * pathLink: textile path gateway
 */
export const getMediaUrl = (hash?: string) => {
  const sdk = getSDK();
  let ipfsLinks:
    | {
        originLink: string;
        fallbackLink: string;
        pathLink: string;
      }
    | undefined;
  if (hash) {
    ipfsLinks = sdk.services.common.ipfs.buildIpfsLinks(hash);
  }
  return ipfsLinks;
};

export const buildProfileMediaLinks = (profile: UserProfile_Response) => {
  const { avatar, coverImage, ...other } = profile;
  const images: {
    avatar: { url: string; fallbackUrl: string };
    coverImage: { url: string; fallbackUrl: string };
  } = {
    avatar: { url: '', fallbackUrl: '' },
    coverImage: { url: '', fallbackUrl: '' },
  };
  if (avatar) {
    images.avatar = {
      url: getMediaUrl(avatar)?.originLink,
      fallbackUrl: getMediaUrl(avatar)?.fallbackLink,
    };
  }
  if (coverImage) {
    images.coverImage = {
      url: getMediaUrl(coverImage)?.originLink,
      fallbackUrl: getMediaUrl(coverImage)?.fallbackLink,
    };
  }
  return { ...images, ...other };
};

export const uploadMediaToTextile = async (data: File, isUrl = false) => {
  const sdk = getSDK();
  const uploadData: {
    isUrl: boolean;
    content: File;
    name?: string;
    config: IConfig;
  } = {
    isUrl,
    content: data,
    config: {
      quality: 0.8,
      maxWidth: 640,
      maxHeight: 640,
      autoRotate: true,
    },
  };

  if (data.type) {
    uploadData.config.mimeType = data.type;
  }

  if (data.name) {
    uploadData.name = data.name;
  }

  try {
    const res = await sdk.api.profile.saveMediaFile(uploadData);
    const ipfsLinks = getMediaUrl(res?.CID);
    return {
      data: {
        src: { url: ipfsLinks?.originLink, fallbackUrl: ipfsLinks?.fallbackLink },
        size: res?.size,
      },
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const getLinkPreview = async (url: string) => {
  const sdk = getSDK();
  const linkPreview = await lastValueFrom(sdk.api.entries.getLinkPreview(url));
  return linkPreview.data.getLinkPreview;
};
