import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}

const MOBILE_BANNER = {
  key: 'cbe194c13b440b2ede04b4b9983bcc57',
  scriptUrl: 'https://bauval.org/22/cbe194c13b440b2ede04b4b9983bcc57',
  width: 320,
  height: 50,
};

const DESKTOP_BANNER = {
  key: '400941ab9076304138442978c3eba315',
  scriptUrl: 'https://bauval.org/22/400941ab9076304138442978c3eba315',
  width: 300,
  height: 250,
};

export const AdsterraBanner: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const nativeRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : true
  );

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const defaultUnit = isMobile ? MOBILE_BANNER : DESKTOP_BANNER;

  const bannerKey = import.meta.env.VITE_ADSTERRA_BANNER_KEY?.trim() || defaultUnit.key;
  const bannerScriptUrl =
    import.meta.env.VITE_ADSTERRA_BANNER_SCRIPT_URL?.trim() || defaultUnit.scriptUrl;
  const bannerWidth = Number(import.meta.env.VITE_ADSTERRA_BANNER_WIDTH) || defaultUnit.width;
  const bannerHeight = Number(import.meta.env.VITE_ADSTERRA_BANNER_HEIGHT) || defaultUnit.height;

  const nativeScriptUrl = import.meta.env.VITE_ADSTERRA_NATIVE_SCRIPT_URL?.trim() || '';
  const nativeContainerId = import.meta.env.VITE_ADSTERRA_NATIVE_CONTAINER_ID?.trim() || '';

  useEffect(() => {
    const container = bannerRef.current;
    if (!container || !bannerKey || !bannerScriptUrl) return;

    const timer = window.setTimeout(() => {
      container.innerHTML = '';

      window.atOptions = {
        key: bannerKey,
        format: 'iframe',
        height: bannerHeight,
        width: bannerWidth,
        params: {},
      };

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = bannerScriptUrl;
      script.async = false;
      container.appendChild(script);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      container.innerHTML = '';
    };
  }, [bannerKey, bannerScriptUrl, bannerWidth, bannerHeight]);

  useEffect(() => {
    const container = nativeRef.current;
    if (!container || !nativeScriptUrl || !nativeContainerId) return;

    const timer = window.setTimeout(() => {
      container.innerHTML = '';

      const adHolder = document.createElement('div');
      adHolder.id = nativeContainerId;
      container.appendChild(adHolder);

      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = nativeScriptUrl;
      container.appendChild(script);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      container.innerHTML = '';
    };
  }, [nativeScriptUrl, nativeContainerId]);

  if (!bannerKey && !(nativeScriptUrl && nativeContainerId)) {
    return null;
  }

  return (
    <aside
      aria-label="مساحة إعلانية"
      className="mt-8 mb-2 flex flex-col items-center justify-center gap-4"
    >
      {bannerKey && bannerScriptUrl && (
        <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center rounded-2xl bg-[#091126] border border-[#17254d] p-3 overflow-hidden">
          <span className="text-[10px] text-slate-500 mb-2 select-none">إعلان ممول</span>
          <div
            ref={bannerRef}
            style={{ width: `${bannerWidth}px`, minHeight: `${bannerHeight}px` }}
            className="flex items-center justify-center mx-auto max-w-full overflow-hidden"
          />
        </div>
      )}

      {nativeScriptUrl && nativeContainerId && (
        <div className="w-full rounded-2xl bg-[#091126] border border-[#17254d] p-3 overflow-hidden">
          <span className="block text-center text-[10px] text-slate-500 mb-1.5 select-none">
            محتوى إعلاني
          </span>
          <div ref={nativeRef} className="w-full" />
        </div>
      )}
    </aside>
  );
};
