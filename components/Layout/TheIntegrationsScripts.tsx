/* eslint-disable @next/next/no-before-interactive-script-outside-document */ 
// Этот компонент должен подключаться только в Layout, поэтому здесь eslint-disable + beforeInteractive
import Script from 'next/script';

export default function TheIntegrationsScripts() {
  return <>
    <Script strategy='beforeInteractive' src='https://vk.com/js/api/openapi.js?169' type='text/javascript' />
  </>;
}