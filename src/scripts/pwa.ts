if (typeof window !== 'undefined') {
  import('virtual:pwa-register')
    .then(({ registerSW }) => {
      registerSW({ immediate: true });
    })
    .catch((e) => console.error('Error importing virtual:pwa-register', e));
}
