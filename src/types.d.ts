declare module 'virtual:pwa-info' {
  export interface PWAInfo {
    webManifest: {
      linkTag: string;
    };
  }

  export const pwaInfo: PWAInfo | undefined;
}