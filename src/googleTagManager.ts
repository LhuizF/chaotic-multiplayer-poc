//@ts-nocheck
export function googleTagManager() {
  console.log('tracking', !!import.meta.env.VITE_GOOGLE_TAG_MANAGER_ID);
  if (import.meta.env.VITE_GOOGLE_TAG_MANAGER_ID) {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GOOGLE_TAG_MANAGER_ID}`;
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {

      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments) }
      gtag('js', new Date());
      gtag('config', import.meta.env.VITE_GOOGLE_TAG_MANAGER_ID);
    };
  }
}
